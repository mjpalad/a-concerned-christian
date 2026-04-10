import { useQuery } from "@tanstack/react-query";

export interface PodcastEpisode {
  title: string;
  description: string;
  pubDate: string;
  audioUrl: string;
  duration: string;
  link: string;
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

    return { title, description, pubDate, audioUrl, duration, link };
  });
}

async function fetchPodcastFeed(): Promise<PodcastEpisode[]> {
  const fetchWithRss2Json = async () => {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}&t=${Date.now()}`
    );
    if (!res.ok) throw new Error("rss2json failed");
    const data = await res.json();
    if (data.status !== "ok" || !data.items || data.items.length === 0) throw new Error("rss2json empty");
    
    return data.items.map((item: any) => ({
      title: item.title ?? "",
      description: item.description ?? "",
      pubDate: item.pubDate ?? "",
      audioUrl: item.enclosure?.link ?? "",
      duration: item.enclosure?.duration ? Math.floor(item.enclosure.duration / 60) + " min" : "",
      link: item.link ?? "",
    }));
  };

  const fetchRawAndParse = async () => {
    // Using corsproxy.io with the recommended ?url= format
    // Note: The cache buster 't' should be on the target URL, not the proxy URL
    const targetUrl = `${FEED_URL}?t=${Date.now()}`;
    const res = await fetch(`https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`);
    if (!res.ok) throw new Error("corsproxy failed");
    const xmlText = await res.text();
    if (!xmlText) throw new Error("corsproxy empty");
    const episodes = parseRSS(xmlText);
    if (episodes.length === 0) throw new Error("Manual parse empty");
    return episodes;
  };

  // Race both methods for speed, but catch errors to ensure we don't fail early
  try {
    return await Promise.any([fetchWithRss2Json(), fetchRawAndParse()]);
  } catch (e) {
    console.error("All fetch sources failed:", e);
    throw new Error("Failed to load episodes. Please try again later.");
  }
}

export function usePodcastFeed() {
  return useQuery({
    queryKey: ["podcast-feed"],
    queryFn: fetchPodcastFeed,
    staleTime: 1000 * 60 * 15, // 15 mins
  });
}
