import { Studio } from './Studio';

// 1. Указываем статическую сборку
export const dynamic = 'force-static';

// 2. Генерируем маршрут для статического экспорта (БЕЗ 'use client' на этой странице!)
export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <Studio />;
}