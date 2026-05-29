import Navbar from "../components/common/Navbar";

import Footer from "../components/common/Footer";

import HeroSection from "../components/home/HeroSection";

import FeaturesSection from "../components/home/FeaturesSection";

import HowItWorks from "../components/home/HowItWorks";

import CTASection from "../components/home/CTASection";

import useScrollToHash from "../hooks/useScrollToHash";

const Home = () => {
  useScrollToHash();

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <HeroSection />

      <FeaturesSection />

      <HowItWorks />

      <CTASection />

      <Footer />
    </div>
  );
};

export default Home;
