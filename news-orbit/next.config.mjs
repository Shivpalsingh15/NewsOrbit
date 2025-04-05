/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**', // Allows all HTTPS images
          },
          {
            protocol: 'http',
            hostname: '**', // Allows all HTTP images (if needed)
          },
        ],
      },
};

export default nextConfig;
