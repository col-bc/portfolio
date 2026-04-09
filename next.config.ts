import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                // GA4 campaign parameters for tracking clicks from GitHub profile
                source: "/gh",
                destination:
                    "/?utm_source=github&utm_medium=profile_bio&utm_campaign=job_search",
                permanent: false,
            },
            {
                // GA4 campaign parameters for tracking clicks from Indeed
                source: "/in",
                destination:
                    "/?utm_source=indeed&utm_medium=profile&utm_campaign=job_search",
                permanent: false,
            },
            {
                // GA4 campaign parameters for tracking clicks from LinkedIn
                source: "/li",
                destination:
                    "/?utm_source=linkedin&utm_medium=profile&utm_campaign=job_search",
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
