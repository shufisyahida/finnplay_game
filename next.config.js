/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "1540257937.rsc.cdn77.org",
        port: "",
        pathname: "/desktop/images/games/**",
      },
    ],
  },
};

module.exports = nextConfig;
