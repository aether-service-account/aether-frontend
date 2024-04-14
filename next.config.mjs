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
            },
            {
                protocol: "https",
                hostname: "aether-users-bucket-southeast.s3.amazonaws.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "aether-users-bucket-southeast.s3.ap-southeast-1.amazonaws.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "aether-collections-bucket-southeast.s3.amazonaws.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "aether-collection-preview-photos.s3.amazonaws.com",
                port: "",
            },
        ]
    }
};

export default nextConfig;
