/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments.topLevelAwait = true ;
    return config;
  }
}

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  nextConfig
})
