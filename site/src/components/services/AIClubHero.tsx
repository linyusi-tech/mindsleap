"use client";

import { useTranslations } from "next-intl";
import PageHero from "@/components/shared/PageHero";

export default function AIClubHero() {
  const h = useTranslations("aiClubHero");

  const slides = [
    {
      title: h("slide1Title"),
      heading: h("slide1Heading"),
      subtitle: h("slide1Subtitle"),
      image: "/images/hero/slide-7.jpg",
    },
    {
      title: h("slide2Title"),
      heading: h("slide2Heading"),
      subtitle: h("slide2Subtitle"),
      image: "/images/hero/aiclub-workshop-april-2026.jpeg",
    },
    {
      title: h("slide3Title"),
      heading: h("slide3Heading"),
      subtitle: h("slide3Subtitle"),
      image: "/images/hero/slide-2.jpg",
    },
    {
      title: h("slide4Title"),
      heading: h("slide4Heading"),
      subtitle: h("slide4Subtitle"),
      image: "/images/hero/slide-1.jpg",
    },
  ];

  return <PageHero slides={slides} />;
}
