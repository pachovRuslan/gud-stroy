// src/components/ProjectsShowcase.tsx
import Link from 'next/link';
import Image from 'next/image';
import PhotoCarousel from './PhotoCarousel';
import { urlFor } from '@/sanity/image';
import type { SanityProject } from '@/sanity/types';

const TILES = [
  { label: 'Строительство', sublabel: 'домов под ключ', href: '/uslugi', image: '/images/1.jpg' },
  { label: 'Аренда техники', sublabel: 'в Витебске и области', href: '/uslugi/excavator-rental', image: '/images/5.jpg' },
  { label: 'Товары', sublabel: 'стройматериалы напрямую', href: '/tovary', image: '/images/2.jpg' },
];

type Props = {
  projects: SanityProject[];
};

const ProjectsShowcase = ({ projects }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 relative">
        <PhotoCarousel projects={projects} />
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
          <Link
            href="/o-nas"
            className="inline-block px-5 py-2 bg-white text-secondary text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors pointer-events-auto"
          >
            О компании ↗
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 h-64 md:h-[420px]">
        {TILES.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            className="relative rounded-lg overflow-hidden flex-1 min-h-0 group"
          >
            <Image
              src={tile.image}
              alt={tile.label}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-secondary/60 group-hover:bg-secondary/70 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <p className="text-white font-semibold text-sm">{tile.label}</p>
              <p className="text-gray-200 text-xs">{tile.sublabel}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectsShowcase;