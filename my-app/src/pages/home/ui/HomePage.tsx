import { 
  HeroSection, 
  FeaturesSection, 
  HowItWorksSection, 
  CTASection, 
  Footer 
} from '@/widgets/home';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
};
