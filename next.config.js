/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    env: {
        BACK_END_URL: 'https://back-end-dacnpm.vercel.app'
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/order',
                permanent: true,
            },
        ]
    },
};

module.exports = nextConfig;
