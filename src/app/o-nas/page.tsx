// src/app/o-nas/page.tsx
import { PortableText } from '@portabletext/react';
import Container from '@/components/Container';
import AboutHero from '@/components/AboutHero';
import PhotoCarousel from '@/components/PhotoCarousel';
import StatCard from '@/components/StatCard';
import { getAboutPage, getProjects } from '@/sanity/data';
import { STATS } from '@/constants/stats';
import { COMPANY } from '@/constants/company';

export default async function AboutPage() {
  const [about, projects] = await Promise.all([getAboutPage(), getProjects()]);

  return (
    <>
      <AboutHero />

      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold text-secondary mb-6">
            {about?.title || `О компании ${COMPANY.name}`}
          </h2>
          <div className="prose prose-sm max-w-2xl text-gray-700 mb-12">
            {about?.description && <PortableText value={about.description} />}
          </div>

          <PhotoCarousel projects={projects} heightClass="h-64 md:h-96" />
        </Container>
      </section>

      <section className="py-16 bg-secondary">
        <Container>
          <h2 className="text-2xl font-bold text-white mb-8">{COMPANY.name} в цифрах</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}