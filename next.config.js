const { withStoreConfig } = require("./store-config")
const nextIntl = require("next-intl/plugin")

const withNextIntl = nextIntl("./src/lib/i18n/request-config.js")
const store = require("./store.config.json")

/**
 * @type {import('next').NextConfig}
 */
const configOpts = {
  features: store.features,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
    ],
  },
}

const nextConfig = withNextIntl(withStoreConfig(configOpts))

console.log("next.config.js", JSON.stringify(module.exports, null, 2))

module.exports = nextConfig
