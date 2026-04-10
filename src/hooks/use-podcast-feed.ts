import { useQuery } from "@tanstack/react-query";

export interface PodcastEpisode {
  title: string;
  description: string;
  pubDate: string;
  audioUrl: string;
  duration: string;
  link: string;
}

const FEED_URL = "https://feeds.simplecast.com/V2lHo6VQ";
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

async function fetchPodcastFeed(): Promise<PodcastEpisode[]> {
  const res = await fetch(`${CORS_PROXY}${encodeURIComponent(FEED_URL)}`);
  if (!res.ok) throw new Error("Failed to fetch podcast feed");
  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "text/xml");
  const items = xml.querySelectorAll("item");

  const episodes: PodcastEpisode[] = [];
  items.forEach((item, i) => {
    if (i >= 5) return; // Latest 5 episodes
    const enclosure = item.querySelector("enclosure");
    episodes.push({
      title: item.querySelector("title")?.textContent ?? "",
      description: item.querySelector("description")?.textContent ?? "",
      pubDate: item.querySelector("pubDate")?.textContent ?? "",
      audioUrl: enclosure?.getAttribute("url") ?? "",
      duration: item.querySelector("itunes\\:duration, duration")?.textContent ?? "",
      link: item.querySelector("link")?.textContent ?? "",
    });
  });
  return episodes;
}

export function usePodcastFeed() {
  return useQuery({
    queryKey: ["podcast-feed"],
    queryFn: fetchPodcastFeed,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
