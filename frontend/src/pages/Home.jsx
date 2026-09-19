import "../styles/Home.css";
import FeatureCards from "../components/Home/FeatureCards/FeatureCards";
import ProblemsTable from "../components/Home/ProblemsTable/ProblemsTable";
import HeroSection from "../components/Home/HeroSection/HeroSection";
import LeaderboardSection from "../components/Home/LeaderboardSection/LeaderboardSection";
import CallToAction from "../components/Home/CallToAction/CallToAction";
import Footer from "../components/Home/Footer/Footer";
import ScrollReveal from "../components/ScrollReveal/ScrollReveal";

function Home() {
  return (
    <div>
      <HeroSection />

      <ScrollReveal animation="up">
        <FeatureCards />
      </ScrollReveal>

      <ScrollReveal animation="left">
        <ProblemsTable />
      </ScrollReveal>

      <ScrollReveal animation="right">
        <LeaderboardSection />
      </ScrollReveal>

      <ScrollReveal animation="scale">
        <CallToAction />
      </ScrollReveal>

      <Footer />
    </div>
  );
}

export default Home
