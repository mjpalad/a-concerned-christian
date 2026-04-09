import { Rss } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t py-10">
      <div className="container mx-auto px-4 text-center space-y-4">
        <p
          className="text-lg font-semibold text-primary"
          style={{ fontFamily: "'Lora', serif" }}
        >
          A Concerned Christian
        </p>

        <div className="flex items-center justify-center gap-6 text-muted-foreground">
          <a href="#podcast" className="text-sm hover:text-primary transition-colors">
            Listen
          </a>
          <a href="#about" className="text-sm hover:text-primary transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm hover:text-primary transition-colors">
            Contact
          </a>
          <a
            href="https://api.riverside.fm/hosting/wWERn1AV.rss"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="RSS Feed"
          >
            <Rss className="w-4 h-4" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} A Concerned Christian. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
