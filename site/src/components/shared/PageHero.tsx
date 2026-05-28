"use client";

import { useState, useEffect, useCallback } from "react";

export type HeroSlide = {
  title: string;
  heading: string;
  subtitle: string;
  image: string;
  bgPosition?: string;
};

type Props = {
  slides: HeroSlide[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default function PageHero({ slides }: Props) {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden" style={{ height: "60vh" }}>
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
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundPosition: slide.bgPosition ?? "center",
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className={`${i === current ? "animate-fade-in" : ""}`}>
              <h2 className="text-white text-2xl md:text-4xl font-medium tracking-widest uppercase mb-4">
                {slide.title}
              </h2>
              <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 leading-tight whitespace-pre-line">
                {slide.heading}
              </h1>
              <p className="text-gray-200 text-xl max-w-2xl mx-auto">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-3">
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
      )}
    </section>
  );
}
