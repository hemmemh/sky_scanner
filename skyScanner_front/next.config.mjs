/** @type {import('next').NextConfig} */
import path from 'path';
const nextConfig = {
    reactStrictMode: false,
    images:{
        domains: ['localhost'],
    },
    i18n:{
        locales:['ru','en','de'],
        defaultLocale: 'en',
    },
    webpack:(config)=>{
        config.resolve.alias['@'] = path.resolve('./');
        return config;
    }
};

export default nextConfig;
