/** @type {import('next').NextConfig} */
const defaultApiBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://expense-backend-latest-ze9i.onrender.com";

const backendApiBaseUrl = (
  process.env.NEXT_PUBLIC_API_BASE_URL || defaultApiBaseUrl
).replace(/\/+$/, "");

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: `${backendApiBaseUrl}/api/:path*`
      }
    ];
  }
};

export default nextConfig;
