import { Play, Clock, Calendar } from "lucide-react";
import { usePodcastFeed, type PodcastEpisode } from "@/hooks/use-podcast-feed";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function stripHtml(html: string) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent?.slice(0, 150) ?? "";
}

function EpisodeCard({ episode }: { episode: PodcastEpisode }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="bg-card border rounded-xl p-5 text-left hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <button
          onClick={() => setPlaying(!playing)}
          className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label={playing ? "Pause" : "Play"}
        >
          <Play className="w-4 h-4 ml-0.5" />
        </button>
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-primary text-base leading-snug mb-1"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {episode.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {stripHtml(episode.description)}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(episode.pubDate)}
            </span>
            {episode.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {episode.duration}
              </span>
            )}
          </div>
        </div>
      </div>
      {playing && episode.audioUrl && (
        <audio
          src={episode.audioUrl}
          controls
          autoPlay
          className="w-full mt-3"
          onEnded={() => setPlaying(false)}
        />
      )}
    </div>
  );
}

export default function EpisodeList() {
  const { data: episodes, isLoading, error } = usePodcastFeed();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error || !episodes?.length) {
    return (
      <p className="text-sm text-muted-foreground">
        Unable to load episodes. Please check back later or subscribe via RSS.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {episodes.map((ep, i) => (
        <EpisodeCard key={i} episode={ep} />
      ))}
    </div>
  );
}
