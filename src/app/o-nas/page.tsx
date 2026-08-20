// src/app/o-nas/page.tsx
import { PortableText } from '@portabletext/react';
import Container from '@/components/Container';
import AboutHero from '@/components/AboutHero';
import PhotoCarousel from '@/components/PhotoCarousel';
import StatCard from '@/components/StatCard';
import ClientsCarousel from '@/components/ClientsCarousel';
import { getAboutPage, getProjects } from '@/sanity/data';
import { STATS } from '@/constants/stats';
import { COMPANY } from '@/constants/company';

export default async function AboutPage() {
  const [about, projects] = await Promise.all([getAboutPage(), getProjects()]);

  return (
    <>
      <AboutHero />

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-3">
              <span className="w-1 h-3.5 bg-primary rounded-full" />
              О компании
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-8 tracking-tight">
              {about?.title || `О компании ${COMPANY.name}`}
            </h2>

            <div className="prose prose-lg text-gray-600 leading-relaxed">
              {about?.description && <PortableText value={about.description} />}
            </div>
          </div>

          <PhotoCarousel projects={projects} heightClass="h-64 md:h-96" />
        </Container>
      </section>

      <ClientsCarousel title="Наши клиенты" />

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-[32px] bg-secondary px-6 md:px-14 py-14 md:py-16">
            <div className="max-w-xl mb-10 md:mb-12">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-5">
                <span className="w-1 h-1 rounded-full bg-primary" />
                В цифрах
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {COMPANY.name} в цифрах
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((stat) => (
                <StatCard key={stat.id} stat={stat} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}