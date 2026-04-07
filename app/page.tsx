import HeroSection from '@/components/home/HeroSection';
import FeaturedPackages from '@/components/home/FeaturedPackages';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="bg-[var(--cream)]">
      <HeroSection />
      <FeaturedPackages />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </div>
  );
}
