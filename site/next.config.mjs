/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Preparado para adicionar domínio de imagens externas futuramente
  // (ex.: CDN do CMS headless na Fase 2)
};

export default nextConfig;
