/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
