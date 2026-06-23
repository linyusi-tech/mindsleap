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
        { source: "/poster", destination: "/poster/index.html" },
        { source: "/poster/", destination: "/poster/index.html" },
        {
          source: "/poster/ai-hermes-workshop",
          destination: "/poster/ai-hermes-workshop/index.html",
        },
        {
          source: "/poster/ai-hermes-workshop/",
          destination: "/poster/ai-hermes-workshop/index.html",
        },
        {
          source: "/poster/arctic-expedition",
          destination: "/poster/arctic-expedition/index.html",
        },
        {
          source: "/poster/arctic-expedition/",
          destination: "/poster/arctic-expedition/index.html",
        },
        {
          source: "/poster/hoffman-china-availability",
          destination: "/poster/hoffman-china-availability/index.html",
        },
        {
          source: "/poster/hoffman-china-availability/",
          destination: "/poster/hoffman-china-availability/index.html",
        },
        {
          source: "/poster/lobster-share-shanghai",
          destination: "/poster/lobster-share-shanghai/index.html",
        },
        {
          source: "/poster/lobster-share-shanghai/",
          destination: "/poster/lobster-share-shanghai/index.html",
        },
        {
          source: "/poster/member-directory",
          destination: "/poster/member-directory/index.html",
        },
        {
          source: "/poster/member-directory/",
          destination: "/poster/member-directory/index.html",
        },
        {
          source: "/poster/suzhou-ai-growth-salon",
          destination: "/poster/suzhou-ai-growth-salon/index.html",
        },
        {
          source: "/poster/suzhou-ai-growth-salon/",
          destination: "/poster/suzhou-ai-growth-salon/index.html",
        },
        {
          source: "/proposal/ENTERPRISE-AI-GROWTH-ACCELERATOR",
          destination: "/proposal/ENTERPRISE-AI-GROWTH-ACCELERATOR/index.html",
        },
        {
          source: "/proposal/ENTERPRISE-AI-GROWTH-ACCELERATOR/",
          destination: "/proposal/ENTERPRISE-AI-GROWTH-ACCELERATOR/index.html",
        },
        {
          source: "/proposal/client-full",
          destination: "/proposal/ENTERPRISE-AI-GROWTH-ACCELERATOR/index.html",
        },
        {
          source: "/proposal/client-full/",
          destination: "/proposal/ENTERPRISE-AI-GROWTH-ACCELERATOR/index.html",
        },
        {
          source: "/proposal/client-full/:path*",
          destination: "/proposal/ENTERPRISE-AI-GROWTH-ACCELERATOR/:path*",
        },
        {
          source: "/proposal/ai-fde-investor-bp",
          destination: "/proposal/ai-fde-investor-bp/index.html",
        },
        {
          source: "/proposal/ai-fde-investor-bp/",
          destination: "/proposal/ai-fde-investor-bp/index.html",
        },
        {
          source: "/proposal/university-ai-capability-proposal",
          destination: "/proposal/university-ai-capability-proposal/index.html",
        },
        {
          source: "/proposal/university-ai-capability-proposal/",
          destination: "/proposal/university-ai-capability-proposal/index.html",
        },
        {
          source: "/proposal/qingpu-mindsleap-ai-native-accelerator",
          destination: "/proposal/qingpu-mindsleap-ai-native-accelerator/index.html",
        },
        {
          source: "/proposal/qingpu-mindsleap-ai-native-accelerator/",
          destination: "/proposal/qingpu-mindsleap-ai-native-accelerator/index.html",
        },
        {
          source: "/proposal/mindsleap-fde-bp",
          destination: "/proposal/mindsleap-fde-bp/index.html",
        },
        {
          source: "/proposal/mindsleap-fde-bp/",
          destination: "/proposal/mindsleap-fde-bp/index.html",
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
          source: "/decks/Lincoln/xiyouji-ai-agent-kickoff-training",
          destination: "/decks/Lincoln/xiyouji-ai-agent-kickoff-training/index.html",
        },
        {
          source: "/decks/Lincoln/xiyouji-ai-agent-kickoff-training/",
          destination: "/decks/Lincoln/xiyouji-ai-agent-kickoff-training/index.html",
        },
        {
          source: "/decks/Lincoln/opc-chongqing-10min",
          destination: "/decks/Lincoln/opc-chongqing-10min/index.html",
        },
        {
          source: "/decks/Lincoln/opc-chongqing-10min/",
          destination: "/decks/Lincoln/opc-chongqing-10min/index.html",
        },
        {
          source: "/decks/Lincoln/pudong-ecommerce-ai-native-enterprise",
          destination: "/decks/Lincoln/pudong-ecommerce-ai-native-enterprise/index.html",
        },
        {
          source: "/decks/Lincoln/pudong-ecommerce-ai-native-enterprise/",
          destination: "/decks/Lincoln/pudong-ecommerce-ai-native-enterprise/index.html",
        },
        {
          source: "/decks/Yusi/ai-education-teachers-deck",
          destination: "/decks/Yusi/ai-education-teachers-deck/index.html",
        },
        {
          source: "/decks/Yusi/ai-education-teachers-deck/",
          destination: "/decks/Yusi/ai-education-teachers-deck/index.html",
        },
        {
          source: "/decks/Yusi/ai-practice-training-deck",
          destination: "/decks/Yusi/ai-practice-training-deck/index.html",
        },
        {
          source: "/decks/Yusi/ai-practice-training-deck/",
          destination: "/decks/Yusi/ai-practice-training-deck/index.html",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default withNextIntl(nextConfig);
