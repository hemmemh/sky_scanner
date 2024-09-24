/** @type {import('next').NextConfig} */
import path from 'path';
const nextConfig = {
    reactStrictMode: false,
    async redirects() {
        return [
          {
            source: '/',
            destination: '/home',
            permanent: true,
          },
        ]
      },
    images:{
        domains: ['localhost'],
    },
    i18n:{
        locales:['ru','en','de'],
        defaultLocale: 'ru',

    },
    webpack:(config)=>{
        config.resolve.alias['@'] = path.resolve('./');
        return config;
    }
};

export default nextConfig;
