"use strict";

/** @type {import('next').NextConfig} */
var nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  transpilePackages: ["lucide-react"] // add this

};
module.exports = nextConfig;