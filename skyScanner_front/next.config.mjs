/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        domains: ['localhost'],
    },
    i18n:{
        locales:['ru','en','de'],
        defaultLocale: 'en',
    }
};

export default nextConfig;
