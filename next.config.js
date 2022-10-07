/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    env: {
        BACK_END_URL: 'http://http://13.250.111.36:3000'
    }
};

module.exports = nextConfig;
