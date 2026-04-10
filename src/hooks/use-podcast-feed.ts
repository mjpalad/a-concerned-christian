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
  // First attempt: try rss2json as it's cleaner
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}&t=${Date.now()}`
    );
    if (res.ok) {
      const data = await res.json();
      if (data.status === "ok" && data.items && data.items.length > 0) {
        return data.items.map((item: any) => ({
          title: item.title ?? "",
          description: item.description ?? "",
          pubDate: item.pubDate ?? "",
          audioUrl: item.enclosure?.link ?? "",
          duration: item.enclosure?.duration ? Math.floor(item.enclosure.duration / 60) + " min" : "",
          link: item.link ?? "",
        }));
      }
    }
  } catch (e) {
    console.warn("rss2json failed, attempting raw fetch:", e);
  }

  // Second attempt: Fetch raw RSS through a CORS proxy and parse manually
  // Using allorigins.win to bypass CORS
  try {
    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(FEED_URL)}&t=${Date.now()}`);
    if (res.ok) {
      const data = await res.json();
      if (data.contents) {
        return parseRSS(data.contents);
      }
    }
  } catch (e) {
    console.error("Raw RSS fetch failed:", e);
  }

  throw new Error("Failed to fetch podcast feed from all sources");
}

export function usePodcastFeed() {
  return useQuery({
    queryKey: ["podcast-feed"],
    queryFn: fetchPodcastFeed,
    staleTime: 1000 * 60 * 15, // 15 mins
  });
}
