"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const pillars = [
  {
    key: "aiClub",
    href: "/services/ai-club",
    icon: (
      <svg className="w-8 h-8 text-[#1e477c] group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
  {
    key: "training",
    href: "/services/ai-transformation",
    icon: (
      <svg className="w-8 h-8 text-[#1e477c] group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
  {
    key: "incubation",
    href: "/services/accelerator",
    icon: (
      <svg className="w-8 h-8 text-[#1e477c] group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
  {
    key: "studyTours",
    href: "/services/global-growth",
    icon: (
      <svg className="w-8 h-8 text-[#1e477c] group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 012.5 2.5V17m-5 1h1.5a1.5 1.5 0 011.5 1.5v1.5m-6 0h.5a1.5 1.5 0 001.5-1.5V19a2 2 0 00-2-2h-1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function BusinessOverview() {
  const t = useTranslations("business");

  return (
    <section className="py-24 bg-gray-50" id="business">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1e477c]">{t("title")}</h2>
          <div className="mt-4 w-20 h-1 bg-blue-500 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar) => (
            <Link key={pillar.key} href={pillar.href} className="block">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition group h-full">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#1e477c] transition duration-500">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold">{t(`${pillar.key}.title`)}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(`${pillar.key}.description`)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
