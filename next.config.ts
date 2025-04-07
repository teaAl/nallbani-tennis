import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// /** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'al'], // Add your supported locales
        localeDetection: false, // Disable automatic locale detection
    },
    webpack: (config) => {
        // This is to handle the node-pre-gyp HTML file issue and provide fallbacks for Node.js modules
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            tls: false,
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            path: require.resolve('path-browserify'),
            constants: require.resolve('constants-browserify'),
        };

        // Ignore .html files to prevent the "Unknown module type" error
        config.module.rules.push({
            test: /\.html$/,
            use: 'ignore-loader',
        });

        return config;
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
