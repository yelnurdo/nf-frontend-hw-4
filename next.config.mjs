/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.cloudinary.com',
        },
        {
          protocol: 'https',
          hostname: 'fakestoreapi.com',
        },
      ],
    },
  };
  
  export default nextConfig;
  