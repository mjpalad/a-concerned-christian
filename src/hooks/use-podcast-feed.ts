import { useQuery } from "@tanstack/react-query";

export interface PodcastEpisode {
  title: string;
  description: string;
  pubDate: string;
  audioUrl: string;
  duration: string;
  link: string;
  transcriptUrl?: string;
}

const FEED_URL = "https://api.riverside.fm/hosting/wWERn1AV.rss";

/**
 * Manual RSS parsing for when the proxy (rss2json) fails or is empty.
 * Riverside feed structure is predictable but needs careful parsing.
 */
function parseRSS(xmlText: string): PodcastEpisode[] {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "text/xml");
  const items = xml.querySelectorAll("item");

  return Array.from(items).slice(0, 10).map((item) => {
    const title = item.querySelector("title")?.textContent ?? "";
    const description = item.querySelector("description")?.textContent ?? 
                        item.querySelector("itunes\\:summary")?.textContent ?? "";
    const pubDate = item.querySelector("pubDate")?.textContent ?? "";
    const link = item.querySelector("link")?.textContent ?? "";
    const enclosure = item.querySelector("enclosure");
    const audioUrl = enclosure?.getAttribute("url") ?? "";
    
    // Find transcript in podcast namespace
    // Some browsers/parsers handle namespaces differently, so we try a few selectors
    const transcriptElement = item.getElementsByTagNameNS("https://podcastindex.org/namespace/1.0", "transcript")[0] ||
                             item.querySelector("podcast\\:transcript") ||
                             item.querySelector("transcript");
    const transcriptUrl = transcriptElement?.getAttribute("url") ?? undefined;
    
    // Duration parsing (could be HH:MM:SS or seconds)
    let duration = item.querySelector("itunes\\:duration")?.textContent ?? "";
    if (duration.includes(":")) {
      const parts = duration.split(":");
      if (parts.length === 2) {
        duration = `${parseInt(parts[0], 10)} min`;
      } else if (parts.length === 3) {
        const mins = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
        duration = `${mins} min`;
      }
    } else if (duration) {
      duration = `${Math.floor(parseInt(duration, 10) / 60)} min`;
    }

    return { title, description, pubDate, audioUrl, duration, link, transcriptUrl };
  });
}

interface Rss2JsonItem {
  title?: string;
  description?: string;
  pubDate?: string;
  enclosure?: {
    link?: string;
    duration?: number;
  };
  link?: string;
  transcriptUrl?: string; // rss2json might not support this, but added for completeness
}

async function fetchWithProxy(targetUrl: string): Promise<string> {
  const proxies = [
    (url: string) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
    (url: string) => `https://api.codetabs.com/v1/proxy?url=${encodeURIComponent(url)}`,
  ];

  for (const getProxyUrl of proxies) {
    try {
      const proxyUrl = getProxyUrl(targetUrl);
      const res = await fetch(proxyUrl);
      if (!res.ok) continue;

      // AllOrigins returns JSON with a 'contents' field
      if (proxyUrl.includes("allorigins")) {
        const data = await res.json();
        return data.contents;
      }
      
      // CodeTabs returns raw text
      return await res.text();
    } catch (e) {
      console.warn(`Proxy ${getProxyUrl(targetUrl)} failed, trying next...`);
      continue;
    }
  }
  throw new Error("All proxies failed to fetch the feed.");
}

async function fetchPodcastFeed(): Promise<PodcastEpisode[]> {
  const fetchWithRss2Json = async () => {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}&t=${Date.now()}`
    );
    if (!res.ok) throw new Error("rss2json failed");
    const data = await res.json();
    if (data.status !== "ok" || !data.items || data.items.length === 0) throw new Error("rss2json empty");
    
    return data.items.map((item: Rss2JsonItem) => ({
      title: item.title ?? "",
      description: item.description ?? "",
      pubDate: item.pubDate ?? "",
      audioUrl: item.enclosure?.link ?? "",
      duration: item.enclosure?.duration ? Math.floor(item.enclosure.duration / 60) + " min" : "",
      link: item.link ?? "",
      transcriptUrl: item.transcriptUrl,
    }));
  };

  const fetchRawAndParse = async () => {
    const targetUrl = `${FEED_URL}?t=${Date.now()}`;
    const xmlText = await fetchWithProxy(targetUrl);
    const episodes = parseRSS(xmlText);
    if (episodes.length === 0) throw new Error("Manual parse empty");
    return episodes;
  };

  // We prioritize the raw fetch and manual parse because it supports custom tags (transcripts)
  // that third-party services like rss2json often strip out.
  try {
    // Attempt the raw parse first
    return await fetchRawAndParse();
  } catch (rawError) {
    console.warn("Manual RSS parse failed, falling back to rss2json:", rawError);
    try {
      return await fetchWithRss2Json();
    } catch (rssError) {
      console.error("All fetch sources failed:", rssError);
      throw new Error("Failed to load episodes. Please try again later.");
    }
  }
}

export function usePodcastFeed() {
  return useQuery({
    queryKey: ["podcast-feed"],
    queryFn: fetchPodcastFeed,
    staleTime: 1000 * 60 * 15, // 15 mins
  });
}
