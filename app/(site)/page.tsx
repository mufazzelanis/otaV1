import type { ComponentType } from "react";
import { getContent } from "@/lib/content";
import type { Content, SectionId } from "@/lib/types";
import {
  AboutSection, AnnouncementSection, BenefitsSection, CtaSection, FaqSection, HeroSection,
  PartnersSection, ProductsSection, ResourcesSection, StatsSection, StepsSection,
  TestimonialsSection, UseCasesSection, WhySection,
} from "@/components/site/sections";
import {
  AnalyticsSection, ChallengeSection, DashboardSection, EcosystemSection, IntegrationsSection, InventorySection,
  PricingSection, SyncSection,
} from "@/components/site/home-sections";

const SECTIONS: Record<SectionId, ComponentType<{ c: Content }>> = {
  hero: HeroSection,
  challenge: ChallengeSection,
  inventory: InventorySection,
  ecosystem: EcosystemSection,
  analytics: AnalyticsSection,
  dashboard: DashboardSection,
  integrations: IntegrationsSection,
  sync: SyncSection,
  pricing: PricingSection,
  stats: StatsSection,
  partners: PartnersSection,
  announcement: AnnouncementSection,
  about: AboutSection,
  benefits: BenefitsSection,
  products: ProductsSection,
  usecases: UseCasesSection,
  why: WhySection,
  steps: StepsSection,
  testimonials: TestimonialsSection,
  faq: FaqSection,
  resources: ResourcesSection,
  cta: CtaSection,
};

export default async function Home() {
  const c = await getContent();
  return (
    <>
      {c.sections
        .filter((s) => s.visible && SECTIONS[s.id])
        .map((s) => {
          const Section = SECTIONS[s.id];
          return <Section key={s.id} c={c} />;
        })}
    </>
  );
}
