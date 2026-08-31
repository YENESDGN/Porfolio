import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-hosted dağıtım: Docker imajı standalone çıktıyı kopyalar.
  output: "standalone",
};

export default nextConfig;
