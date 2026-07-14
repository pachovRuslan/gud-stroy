// src/app/page.tsx
import Container from '@/components/Container';
import ServiceCarousel from '@/components/ServiceCarousel';
import AboutSnippet from '@/components/AboutSnippet';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import BenefitCard from '@/components/BenefitCard';
import MaterialsBanner from '@/components/MaterialsBanner';
import StatCard from '@/components/StatCard';
import ContactForm from '@/components/ContactForm';
import { getServices } from '@/sanity/data';
import { BENEFITS } from '@/constants/benefits';
import { STATS } from '@/constants/stats';
import { COMPANY } from '@/constants/company';
import { getProjects } from '@/sanity/data';
import { ShieldCheck, Wallet, Truck, FileCheck, Clock, Handshake, Award } from 'lucide-react';
const BENEFIT_ICONS: Record<string, typeof Award> = {
  'free-estimate': ShieldCheck,
  'direct-contracts': Handshake,
  'financing': Wallet,
  'full-docs': FileCheck,
  'own-fleet': Truck,
  'experience': Award,
};
export default async function Home() {
  const services = await getServices();
  const projects = await getProjects();
  return (
    <>
      <ServiceCarousel services={services} />

      {/* Возвращённая секция "О компании" */}
      <section className="py-20">
        <Container>
          <AboutSnippet />
        </Container>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <Container>
          <h2 className="text-xl md:text-2xl font-bold text-secondary mb-8">Наши услуги</h2>
          <ProjectsShowcase projects={projects} />
        </Container>
      </section>

<section className="py-20">
  <Container>
    <div className="inline-block bg-primary text-white text-lg md:text-xl font-bold tracking-wide px-6 py-3 rounded mb-4">
      6 ПРОСТЫХ ПРИЧИН
    </div>
    <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-10">
      Почему выбирают нас
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {BENEFITS.map((benefit, i) => (
        <BenefitCard
          key={benefit.id}
          benefit={benefit}
          Icon={BENEFIT_ICONS[benefit.id] ?? Award}
          shaded={i % 2 === 1}
        />
      ))}
    </div>
  </Container>
</section>
      <section className="py-20 bg-gray-50">
        <Container>
          <MaterialsBanner />
        </Container>
      </section>

      <section className="py-20 bg-secondary">
        <Container>
          <h2 className="text-2xl font-bold text-white mb-8">{COMPANY.name} в цифрах</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </Container>
      </section>

      <section id="zayavka" className="py-16 scroll-mt-24">
        <Container>
          <h2 className="text-2xl font-bold text-secondary mb-8">Оставить заявку</h2>
          <div className="max-w-md">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}