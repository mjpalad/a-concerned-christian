import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
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
        <PodcastSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
