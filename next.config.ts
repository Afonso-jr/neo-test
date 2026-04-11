import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/painel-financeiro',
        destination: '/dashboard',
      },
      {
        source: '/detalhes/:id',
        destination: '/dossier/:id',
      },
    ];
  },
};

export default nextConfig;
