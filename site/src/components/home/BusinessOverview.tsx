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
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
  {
    key: "incubation",
    href: "/services/accelerator",
    icon: (
      <svg className="w-8 h-8 text-[#1e477c] group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  },
  {
    key: "studyTours",
    href: "/services/global-growth",
    icon: (
      <svg className="w-8 h-8 text-[#1e477c] group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" strokeWidth="2" />
        <path d="M3.5 12h17M12 3c2.3 2.4 3.5 5.4 3.5 9s-1.2 6.6-3.5 9M12 3c-2.3 2.4-3.5 5.4-3.5 9s1.2 6.6 3.5 9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="M7 16.5c2.8-3.9 5.8-6.3 10-7.5M17 9l-.8 4.1M17 9l-4.1-.8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
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
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{t("subtitle")}</p>
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
