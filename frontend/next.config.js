/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER_URL: "http://localhost:4000/api",
        APP_URL: "http://localhost:3000",
      },
      images: {
        domains: ["localhost", "files.smashing.media"],
      },
    async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: "http://localhost:4000/api/:path*",
          },
          {
            source: "/upload/:path*",
            destination: "http://localhost:4000/upload/:path*",
          },
        ];
      },
}

module.exports = nextConfig
