/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // <-- Добавьте эту строку
  },// здесь могут быть другие ваши настройки
};

module.exports = nextConfig;