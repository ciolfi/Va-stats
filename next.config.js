/** @type {import('next').NextConfig} */
const nextConfig = {
  // ADDED BELOW
  swcMinify: false,

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
