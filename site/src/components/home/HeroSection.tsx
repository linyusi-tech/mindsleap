"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const slides = [
  {
    titleKey: "slide5Title",
    subtitleKey: "slide5Subtitle",
    headingKey: "slide5Heading",
    ctaKey: "slide5Cta",
    href: "/news/ai-native-enterprise-conference-shanghai-2026",
    image: "/images/news/ai-native-enterprise-conference-shanghai-2026-cover1.jpg",
    bgPosition: "center",
  },
  {
    titleKey: "slide1Title",
    subtitleKey: "slide1Subtitle",
    headingKey: "slide1Heading",
    ctaKey: "slide1Cta",
    href: "/services/ai-club",
    image: "/images/hero/slide-1.jpg",
    bgPosition: "center",
  },
  {
    titleKey: "slide3Title",
    subtitleKey: "slide3Subtitle",
    headingKey: "slide3Heading",
    ctaKey: "slide3Cta",
    href: "/services/ai-transformation",
    image: "/images/hero/AI-Native-Conference.jpg",
    bgPosition: "center 35%",
  },
  {
    titleKey: "slide2Title",
    subtitleKey: "slide2Subtitle",
    headingKey: "slide2Heading",
    ctaKey: "slide2Cta",
    href: "/services/accelerator",
    image: "/images/hero/slide-5.jpg",
    bgPosition: "center",
  },
  {
    titleKey: "slide4Title",
    subtitleKey: "slide4Subtitle",
    headingKey: "slide4Heading",
    ctaKey: "slide4Cta",
    href: "/services/global-growth",
    image: "/images/hero/slide-3.jpg",
    bgPosition: "center",
  },
];

export default function HeroSection() {
  const t = useTranslations("hero");
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ height: "80vh" }}>
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover"
            style={{ backgroundImage: `url(${slide.image})`, backgroundPosition: slide.bgPosition }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className={`${i === current ? "animate-fade-in" : ""}`}>
              <h2 className="text-white text-2xl md:text-4xl font-medium tracking-widest uppercase mb-4">
                {t(slide.titleKey)}
              </h2>
              <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {t(slide.headingKey)}
              </h1>
              <p className="text-gray-200 text-xl max-w-2xl mx-auto mb-8">
                {t(slide.subtitleKey)}
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href={slide.href as "/services/ai-club"}
                  className="bg-white text-[#1e477c] px-8 py-4 rounded-md font-bold hover:bg-gray-100 transition inline-block"
                >
                  {t(slide.ctaKey)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel dots */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center space-x-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-white" : "bg-white/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
