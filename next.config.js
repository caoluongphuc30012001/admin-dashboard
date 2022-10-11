/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    env: {
        BACK_END_URL: 'https://sleepy-scrubland-61892.herokuapp.com',
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/order',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
