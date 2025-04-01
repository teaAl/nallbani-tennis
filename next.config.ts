import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// /** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'al'], // Add your supported locales
        localeDetection: false, // Disable automatic locale detection
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
