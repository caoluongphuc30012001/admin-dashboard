/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    env: {
        BACK_END_URL: 'http://ec2-13-250-111-36.ap-southeast-1.compute.amazonaws.com:3000'
    }
};

module.exports = nextConfig;
