import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "Mood-Based-Music-Player";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? `/${repoName}` : undefined,
  assetPrefix: isGithubActions ? `/${repoName}/` : undefined,
};

export default nextConfig;
