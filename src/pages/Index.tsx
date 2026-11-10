import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BookSection from "@/components/BookSection";
import PodcastSection from "@/components/PodcastSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <BookSection />
        <PodcastSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
