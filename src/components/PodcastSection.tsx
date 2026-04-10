import { Headphones, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";
import EpisodeList from "@/components/EpisodeList";

const platforms = [
  {
    name: "Spotify",
    href: "#",
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    name: "Apple Podcasts",
    href: "#",
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.6-.12 1.2-.6 1.5-.48.3-1.08.3-1.56-.12-.36-.3-.6-.72-.48-1.2-.24-1.2-.72-2.22-1.56-3.06-1.2-1.2-2.76-1.86-4.44-1.86-3.36 0-6.12 2.76-6.12 6.12 0 1.68.66 3.24 1.86 4.44.84.84 1.86 1.32 3.06 1.56.48.12.84.48.96.96.12.48-.06.96-.42 1.26-.24.24-.54.36-.84.36h-.24c-1.68-.36-3.12-1.08-4.32-2.28C3.876 15.468 3 13.356 3 11.028c0-4.884 3.984-8.46 8.865-8.46zm.135 4.26c2.16 0 3.96 1.74 4.14 3.96 0 .48-.36.96-.84.96-.48.06-.9-.3-.96-.78-.12-1.32-1.08-2.34-2.4-2.34-1.32 0-2.4 1.08-2.4 2.4 0 .66.24 1.26.72 1.74.3.3.36.78.18 1.14-.24.42-.66.6-1.08.48-.12 0-.24-.06-.36-.18-.78-.78-1.2-1.8-1.2-2.94 0-2.28 1.92-4.44 4.2-4.44zm-.12 5.4c.78 0 1.44.66 1.44 1.44 0 .42-.18.84-.48 1.08l-.42 3.66c-.06.42-.42.72-.84.72-.42 0-.78-.3-.84-.72l-.42-3.66c-.3-.24-.48-.66-.48-1.08 0-.78.66-1.44 1.44-1.44h.12z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "RSS Feed",
    href: "https://api.riverside.fm/hosting/wWERn1AV.rss",
    icon: () => <Rss className="w-5 h-5" />,
  },
];

const PodcastSection = () => {
  return (
    <section id="podcast" className="py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Headphones className="w-8 h-8 text-accent" />
          <h2
            className="text-3xl md:text-4xl font-bold text-primary"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Listen to the Podcast
          </h2>
        </div>

        <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          New episodes explore the intersection of faith and culture — honest conversations about what it means to follow Christ with conviction and compassion. Subscribe on your favorite platform.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {platforms.map((platform) => (
            <Button
              key={platform.name}
              variant="outline"
              size="lg"
              className="gap-2 rounded-full px-6 border-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
              asChild
            >
              <a href={platform.href} target="_blank" rel="noopener noreferrer">
                <platform.icon />
                {platform.name}
              </a>
            </Button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <h3
            className="text-xl font-semibold text-primary mb-6"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Latest Episodes
          </h3>
          <EpisodeList />
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
