import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:locale/services/training",
        destination: "/:locale/services/ai-transformation",
        permanent: true,
      },
      {
        source: "/:locale/services/incubation",
        destination: "/:locale/services/accelerator",
        permanent: true,
      },
      {
        source: "/:locale/services/study-tours",
        destination: "/:locale/services/global-growth",
        permanent: true,
      },
      {
        source: "/services/training",
        destination: "/services/ai-transformation",
        permanent: true,
      },
      {
        source: "/services/incubation",
        destination: "/services/accelerator",
        permanent: true,
      },
      {
        source: "/services/study-tours",
        destination: "/services/global-growth",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/design-system", destination: "/design-system/index.html" },
        { source: "/design-system/", destination: "/design-system/index.html" },
        { source: "/product", destination: "/product/index.html" },
        { source: "/product/", destination: "/product/index.html" },
        { source: "/proposal", destination: "/proposal/index.html" },
        { source: "/proposal/", destination: "/proposal/index.html" },
        {
          source: "/proposal/ENTERPRISE-AI-GROWTH-ACCELERATOR",
          destination: "/proposal/ENTERPRISE-AI-GROWTH-ACCELERATOR/index.html",
        },
        {
          source: "/proposal/ENTERPRISE-AI-GROWTH-ACCELERATOR/",
          destination: "/proposal/ENTERPRISE-AI-GROWTH-ACCELERATOR/index.html",
        },
        {
          source: "/proposal/client-full/:path*",
          destination: "/proposal/ENTERPRISE-AI-GROWTH-ACCELERATOR/:path*",
        },
        { source: "/decks", destination: "/decks/index.html" },
        { source: "/decks/", destination: "/decks/index.html" },
        { source: "/decks/Lincoln", destination: "/decks/Lincoln/index.html" },
        { source: "/decks/Lincoln/", destination: "/decks/Lincoln/index.html" },
        { source: "/decks/Yusi", destination: "/decks/Yusi/index.html" },
        { source: "/decks/Yusi/", destination: "/decks/Yusi/index.html" },
        {
          source: "/decks/Lincoln/ai-native-enterprise-conference-lincoln-talk",
          destination: "/decks/Lincoln/ai-native-enterprise-conference-lincoln-talk/index.html",
        },
        {
          source: "/decks/Lincoln/ai-native-enterprise-conference-lincoln-talk/",
          destination: "/decks/Lincoln/ai-native-enterprise-conference-lincoln-talk/index.html",
        },
        {
          source: "/decks/Lincoln/ceibs-ai-agent-marketing-training",
          destination: "/decks/Lincoln/ceibs-ai-agent-marketing-training/index.html",
        },
        {
          source: "/decks/Lincoln/ceibs-ai-agent-marketing-training/",
          destination: "/decks/Lincoln/ceibs-ai-agent-marketing-training/index.html",
        },
        {
          source: "/decks/Yusi/ai-education-teachers-deck",
          destination: "/decks/Yusi/ai-education-teachers-deck/index.html",
        },
        {
          source: "/decks/Yusi/ai-education-teachers-deck/",
          destination: "/decks/Yusi/ai-education-teachers-deck/index.html",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default withNextIntl(nextConfig);
