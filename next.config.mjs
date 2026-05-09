/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The repository still contains legacy CRA routes under src/pages/*.js.
  // Restricting Next page discovery to TypeScript files keeps the new app/ router
  // and prevents Next from mixing root app/ with src/pages during deployment.
  pageExtensions: ["ts", "tsx"],
  experimental: {
    optimizePackageImports: ["@react-three/drei", "framer-motion"]
  }
};

export default nextConfig;
