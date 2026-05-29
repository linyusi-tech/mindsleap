"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function EcosystemSection() {
  const t = useTranslations("ecosystem");

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-bold text-[#1e477c] mb-6">{t("title")}</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {t("subtitle")}
            </p>
            <ul className="space-y-4">
              {["network1", "network2", "network3", "network4"].map((key) => (
                <li key={key} className="flex items-center space-x-3 text-[#1e477c] font-semibold">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                    &#10003;
                  </span>
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <Image
              src="/images/MindsLeapecosystem.png"
              alt="MindsLeap Global Eco-system"
              width={800}
              height={500}
              className="w-full h-auto rounded-2xl shadow-2xl border border-gray-100 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
