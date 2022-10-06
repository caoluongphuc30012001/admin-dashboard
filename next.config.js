/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    env: {
        BACK_END_URL: 'http://localhost:3000'
    }
};

module.exports = nextConfig;
