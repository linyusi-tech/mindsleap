"use client";

import { useTranslations } from "next-intl";
import PageHero from "@/components/shared/PageHero";

export default function TrainingHero() {
  const h = useTranslations("trainingHero");

  const slides = [
    {
      title: h("slide1Title"),
      heading: h("slide1Heading"),
      subtitle: h("slide1Subtitle"),
      image: "/images/hero/AI-Native-Conference.jpg",
      bgPosition: "center 35%",
    },
    {
      title: h("slide2Title"),
      heading: h("slide2Heading"),
      subtitle: h("slide2Subtitle"),
      image: "/images/hero/ai-training.jpg",
    },
  ];

  return <PageHero slides={slides} />;
}
