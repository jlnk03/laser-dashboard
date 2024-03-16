/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
        {
            source: '/back/:path*',
            destination:
            process.env.NODE_ENV === 'development'
                ? 'http://127.0.0.1:5000/back/:path*'
                : '/back/',
        },
        ]
  },
}

export default nextConfig;
