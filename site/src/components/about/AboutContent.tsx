"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/shared/SectionTitle";
import PageHero from "@/components/shared/PageHero";

const acceleratorIcons = [
  (
    <svg key="ai-club" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  ),
  (
    <svg key="ai-transformation" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  ),
  (
    <svg key="accelerator" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  ),
  (
    <svg key="global-growth" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeWidth="2" />
      <path d="M3.5 12h17M12 3c2.3 2.4 3.5 5.4 3.5 9s-1.2 6.6-3.5 9M12 3c-2.3 2.4-3.5 5.4-3.5 9s1.2 6.6 3.5 9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M7 16.5c2.8-3.9 5.8-6.3 10-7.5M17 9l-.8 4.1M17 9l-4.1-.8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  ),
];

export default function AboutContent() {
  const t = useTranslations("about");
  const h = useTranslations("aboutHero");
  const missionSubText = t("missionSubText");
  const acceleratorItems = t.raw("acceleratorItems") as Array<{
    title: string;
    description: string;
  }>;

  const heroSlides = [
    {
      title: h("slide1Title"),
      heading: h("slide1Heading"),
      subtitle: h("slide1Subtitle"),
      image: "/images/hero/AI-Native-Conference-team.jpg",
    },
    {
      title: h("slide2Title"),
      heading: h("slide2Heading"),
      subtitle: h("slide2Subtitle"),
      image: "/images/hero/slide-2.jpg",
    },
  ];

  return (
    <>
      <PageHero slides={heroSlides} />

      {/* Mission & Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-brand-display text-3xl md:text-4xl font-bold text-primary mb-3 leading-tight tracking-normal">
                {t("missionBrand")}
              </p>
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                {t("mission")}
              </h2>
              <p className="font-brand-display text-xl md:text-2xl font-semibold text-gray-700 mb-3 leading-tight tracking-normal">
                {t("missionText")}
              </p>
              {missionSubText && (
                <p className="text-lg font-medium text-gray-700 mb-8 leading-relaxed">
                  {missionSubText}
                </p>
              )}

              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                {t("story")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("naming")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden bg-gray-200"
            >
              <Image
                src="/images/MindsLeap-team.jpg"
                alt="MindsLeap Team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t("acceleratorTitle")} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {acceleratorItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {acceleratorIcons[index]}
                </div>
                <h3 className="text-center text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-left text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t("founders")} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            {/* Lincoln */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-6 mb-6">
                <img
                  src="/images/about/lincoln.jpg"
                  alt="Lincoln"
                  className="w-24 h-24 rounded-full object-cover shrink-0"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{t("lincolnName")}</h3>
                  <p className="text-primary font-medium">{t("lincolnRole")}</p>
                  <p className="text-gray-500 text-sm">{t("lincolnRole2")}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                {t("lincolnBio")}
              </p>
            </motion.div>

            {/* Yusi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-6 mb-6">
                <img
                  src="/images/about/yusi.jpg"
                  alt="Yusi"
                  className="w-24 h-24 rounded-full object-cover shrink-0"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{t("yusiName")}</h3>
                  <p className="text-primary font-medium">{t("yusiRole")}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                {t("yusiBio")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founders Space Partnership */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 rounded-full mb-8">
              <span className="font-semibold text-primary">{t("partnership")}</span>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t("partnershipText")}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
