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

async function fetchPodcastFeed(): Promise<PodcastEpisode[]> {
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`
  );
  if (!res.ok) throw new Error("Failed to fetch podcast feed");
  const data = await res.json();
  if (data.status !== "ok") throw new Error("RSS feed error");

  return (data.items ?? []).slice(0, 5).map((item: any) => ({
    title: item.title ?? "",
    description: item.description ?? "",
    pubDate: item.pubDate ?? "",
    audioUrl: item.enclosure?.link ?? "",
    duration: "",
    link: item.link ?? "",
  }));
}

export function usePodcastFeed() {
  return useQuery({
    queryKey: ["podcast-feed"],
    queryFn: fetchPodcastFeed,
    staleTime: 1000 * 60 * 30,
  });
}
