/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: 'export',
    basePath: isProd ? '/nutribyte-166386' : '',
    assetPrefix: isProd ? '/nutribyte-166386/' : '',
    trailingSlash: true,
    images: {
    unoptimized: true,
    },
};

export default nextConfig;