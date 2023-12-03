/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments.topLevelAwait = true ;
    return config;
  }
}

// const withPWA = require('next-pwa')({
//   dest: 'public'
// })

const withPWA = require("next-pwa");
    module.exports = withPWA({
      pwa: {
        dest: "public",
        
      },
      pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts', 'svg'],
    });

// module.exports = withPWA({
//   pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts', 'svg'],
// })

// For bfcache Lighthouse error
module.exports = {
  headers: () => [
    {
      source: '/:studentregistration*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
}
