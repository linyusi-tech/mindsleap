"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";

export default function ContactContent() {
  const t = useTranslations("contact");
  const h = useTranslations("contactHero");
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      role: formData.get("role"),
      interest: formData.get("interest"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError(t("form.error"));
    } finally {
      setLoading(false);
    }
  };

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
      image: "/images/hero/slide-3.jpg",
    },
  ];

  return (
    <>
      <PageHero slides={heroSlides} />

      {/* Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 rounded-2xl p-12 text-center"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <p className="text-lg font-semibold text-green-800">
                    {t("form.success")}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("form.name")} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("form.email")} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("form.company")}
                      </label>
                      <input
                        type="text"
                        name="company"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("form.role")}
                      </label>
                      <input
                        type="text"
                        name="role"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("form.interest")}
                    </label>
                    <select name="interest" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white">
                      <option value="">--</option>
                      <option value="ai-club">{locale === "zh" ? "AI俱乐部" : "AI Club"}</option>
                      <option value="ai-transformation">{locale === "zh" ? "AI转型服务" : "AI Transformation Services"}</option>
                      <option value="accelerator">{locale === "zh" ? "创业加速" : "Startup Acceleration"}</option>
                      <option value="global-growth">{locale === "zh" ? "出海服务" : "Global Growth Services"}</option>
                      <option value="media-research">{locale === "zh" ? "动态 / 媒体 / 研究合作" : "News / Media / Research Partnership"}</option>
                      <option value="government-park">{locale === "zh" ? "政府 / 园区合作" : "Government / Park Partnership"}</option>
                      <option value="other">{locale === "zh" ? "其他合作" : "Other Partnership"}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("form.message")}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-colors text-base disabled:opacity-50"
                  >
                    {loading ? "..." : t("form.submit")}
                  </button>
                </motion.form>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">Email</h3>
                <a href="mailto:mindsleap@gmail.com" className="text-primary hover:underline">
                  mindsleap@gmail.com
                </a>
              </motion.div>

              {/* Locations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">🌍</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Silicon Valley, USA</p>
                  <p>Shanghai, China</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
