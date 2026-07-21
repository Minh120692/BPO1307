import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SidebarFormArea from "../components/layout/SidebarFormArea";
import HeroSection from "../components/sections/HeroSection";
import ProblemsSection from "../components/sections/ProblemsSection";
import ScopeSection from "../components/sections/ScopeSection";
import ServicesSection from "../components/sections/ServicesSection";
import ComparisonSection from "../components/sections/ComparisonSection";
import BenefitsSection from "../components/sections/BenefitsSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import FaqSection from "../components/sections/FaqSection";
import MidPageCta from "../components/sections/MidPageCta";
import FinalCtaMobileForm from "../components/sections/FinalCtaMobileForm";
import FloatingCta from "../components/common/FloatingCta";
import CompanyModal from "../components/common/CompanyModal";
import RevealOnScroll from "../components/common/RevealOnScroll";

export default function HomePage() {
  return (
    <>
      {/* ===== ページ全体レイアウト（左コンテンツ + 右固定フォーム） ===== */}
      <div className="page-layout-wrapper">
        <div className="main-content-area">
          <Header />
          <HeroSection />
          <ProblemsSection />
          <ScopeSection />
          <ServicesSection />
          <MidPageCta />
          <ComparisonSection />
          <BenefitsSection />
          <HowItWorksSection />
          <FaqSection />
          <FinalCtaMobileForm />
          <Footer />
        </div>
        {/* ===== 右側固定フォームサイドバー ===== */}
        <SidebarFormArea />
      </div>
      <FloatingCta />
      <CompanyModal />
      <RevealOnScroll />
    </>
  );
}
