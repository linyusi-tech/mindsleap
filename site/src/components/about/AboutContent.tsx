"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/shared/SectionTitle";
import PageHero from "@/components/shared/PageHero";

export default function AboutContent() {
  const t = useTranslations("about");
  const h = useTranslations("aboutHero");

  const heroSlides = [
    {
      title: h("slide1Title"),
      heading: h("slide1Heading"),
      subtitle: h("slide1Subtitle"),
      image: "/images/hero/slide-1.jpg",
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
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                {t("mission")}
              </h2>
              <p className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
                {t("missionText")}
              </p>

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
                src="/images/about/team.jpg"
                alt="MindsLeap Team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 bg-gray-50">
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
