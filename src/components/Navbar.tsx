import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Podcast", href: "#podcast" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link 
          to="/" 
          className="text-lg font-semibold text-primary" 
          style={{ fontFamily: "'Lora', serif" }}
          onClick={() => isHomePage && window.scrollTo(0, 0)}
        >
          A Concerned Christian
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {isHomePage && navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          {!isHomePage && (
            <Link 
              to="/" 
              className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
            >
              Home
            </Link>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 pb-4">
          {isHomePage && navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {!isHomePage && (
            <Link 
              to="/" 
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
