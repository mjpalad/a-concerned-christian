import { BookOpen, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const BookSection = () => {
  const pdfUrl = `${import.meta.env.BASE_URL}DangerClose.pdf`;
  const epubUrl = `${import.meta.env.BASE_URL}DangerClose.epub`;
  const coverUrl = `${import.meta.env.BASE_URL}DangerClose-cover.jpg`;

  return (
    <section id="book" className="py-20 border-b">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14">
          {/* Book Cover */}
          <div className="shrink-0">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              aria-label="Read Danger Close! Can the Church Rescue America? (PDF)"
            >
              <img
                src={coverUrl}
                alt="Danger Close! Can the Church Rescue America? by Eric Wait — Book Cover"
                className="w-56 sm:w-64 md:w-72 rounded-lg shadow-xl border border-border transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </a>
          </div>

          {/* Book Details & Download Links */}
          <div className="text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Free Digital Book</span>
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold text-primary mb-2"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Danger Close!
            </h2>
            <p
              className="text-lg md:text-xl text-primary/85 italic mb-5"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Can the Church Rescue America?
            </p>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                In military terminology, <em>&ldquo;danger close&rdquo;</em> is radioed when friendly support is called in so close to troops that they risk being caught in the blast. In <em>Danger Close! Can the Church Rescue America?</em>, pastor and author Eric Wait sounds an urgent call: our nation has pushed God to the margins, yet the gravest crisis is the complacency and self-centeredness of the church.
              </p>
              <p>
                Drawing parallels between contemporary America and ancient Israel, Wait points to real, biblical hope—challenging believers to humble themselves in prayer, rediscover genuine Christian unity and servanthood, and stand boldly in the gap on behalf of the land.
              </p>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-3">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 rounded-full px-7 bg-accent text-accent-foreground hover:bg-accent/90 shadow-md"
                asChild
              >
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="w-5 h-5" />
                  Download PDF
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto gap-2 rounded-full px-7 border-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                asChild
              >
                <a href={epubUrl} download="DangerClose.epub">
                  <Download className="w-5 h-5" />
                  Download EPUB
                </a>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Free digital edition &bull; <strong>PDF</strong> for computers, tablets &amp; print &bull; <strong>EPUB</strong> for Apple Books, Kindle &amp; e-readers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSection;

