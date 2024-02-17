/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
                port: "",
            },            {
                protocol: "https",
                hostname: "aether-user-bucket-tokyo.s3.amazonaws.com",
                port: "",
            },
        ]
    }
};

export default nextConfig;
