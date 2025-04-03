/** @type {import('next').NextConfig} */
const nextConfig = async (phase) => {
    return {
        compiler: {
            styledComponents: true, // Enables SSR for styled-components
        },
        env: {
            NEXT_PUBLIC_API_URL: "https://efinas.api.aespinance.com",
            NEXT_PUBLIC_FRONT_URL: "http://localhost:3000",
        }
    }
};

export default nextConfig;
