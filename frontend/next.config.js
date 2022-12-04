/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    scrollRestoration: true,
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
      {
        source: '/dashboard',
        destination: '/Dashboard',
      },
    ]
  },
}

module.exports = nextConfig
