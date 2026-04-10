import { Play, Pause, Clock, Calendar } from "lucide-react";
import { usePodcastFeed, type PodcastEpisode } from "@/hooks/use-podcast-feed";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
    <div className={cn(
      "bg-card border rounded-xl p-5 text-left transition-all duration-300",
      playing ? "shadow-md ring-1 ring-accent/20" : "hover:shadow-md"
    )}>
      <div className="flex items-start gap-4">
        <button
          onClick={() => setPlaying(!playing)}
          className={cn(
            "mt-1 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
            playing ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground hover:scale-105"
          )}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-1" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-primary text-base md:text-lg leading-snug mb-1"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {episode.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
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
      
      {/* Audio Player with smooth appearance */}
      <div className={cn(
        "overflow-hidden transition-all duration-500 ease-in-out",
        playing ? "max-h-20 mt-4 opacity-100" : "max-h-0 opacity-0"
      )}>
        {episode.audioUrl && (
          <audio
            src={episode.audioUrl}
            controls
            autoPlay={playing}
            className="w-full h-10"
            onEnded={() => setPlaying(false)}
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
          />
        )}
      </div>
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
