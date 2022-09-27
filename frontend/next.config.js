/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    scrollRestoration: true,
    outputStandalone: true,
  },
  async rewrites() {
    return [
      {
        source: '/sign-in',
        destination: '/SignIn',
      },
      {
        source: '/sign-up',
        destination: '/SignUp',
      },
    ]
  },
}

module.exports = nextConfig
