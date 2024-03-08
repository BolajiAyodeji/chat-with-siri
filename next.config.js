/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  disable: process.env.APP_MODE === "development",
  dest: "public",
  scope: "/chat",
  sw: "/sw.js",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = withPWA({
  // Next config
});

module.exports = nextConfig;
