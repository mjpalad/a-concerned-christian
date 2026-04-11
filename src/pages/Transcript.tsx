import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";

const Transcript = () => {
  const [searchParams] = useSearchParams();
  const transcriptUrl = searchParams.get("url");
  const title = searchParams.get("title") || "Episode Transcript";

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: transcript, isLoading, error } = useQuery({
    queryKey: ["transcript", transcriptUrl],
    queryFn: async () => {
      if (!transcriptUrl) throw new Error("No transcript URL provided");
      
      // Use corsproxy to fetch the plain text file
      const res = await fetch(`https://corsproxy.io/?url=${encodeURIComponent(transcriptUrl)}`);
      if (!res.ok) throw new Error("Failed to fetch transcript");
      return res.text();
    },
    enabled: !!transcriptUrl,
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pb-20" style={{ paddingTop: "6rem" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Episodes
          </Link>

          <h1 
            className="text-3xl md:text-4xl font-bold text-primary mt-5 mb-8 leading-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {title}
          </h1>

          <div className="prose prose-slate max-w-none">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ) : error ? (
              <div className="p-8 text-center bg-muted rounded-xl border">
                <p className="text-muted-foreground">
                  Unable to load the transcript. You can still view the raw file 
                  <a href={transcriptUrl!} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline ml-1">
                    here
                  </a>.
                </p>
              </div>
            ) : (
              <div className="whitespace-pre-wrap font-sans text-base md:text-lg leading-relaxed text-foreground/90">
                {transcript}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Transcript;
