"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
/* eslint-disable @next/next/no-img-element */

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const switchLocale = () => {
    const newLocale = locale === "zh" ? "en" : "zh";
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { href: "/services/ai-club", label: t("aiClub") },
    { href: "/services/ai-transformation", label: t("training") },
    { href: "/services/accelerator", label: t("incubation") },
    { href: "/services/global-growth", label: t("studyTours") },
    { href: "/news", label: t("news") },
    { href: "/about", label: t("about") },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img src="/images/logo-blue.png" alt="MindsLeap" className="h-10 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-[#1e477c] hover:text-blue-600 transition"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={switchLocale}
              className="text-sm font-medium text-gray-400 hover:text-[#1e477c] transition"
            >
              {locale === "zh" ? "EN" : "中文"}
            </button>
            <Link
              href="/contact"
              className="bg-[#1e477c] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-800 transition shadow-lg"
            >
              {locale === "zh" ? "加入俱乐部" : "Join the Club"}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-[2px] w-6 bg-[#1e477c] transition-all duration-300 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-6 bg-[#1e477c] transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-6 bg-[#1e477c] transition-all duration-300 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-lg font-semibold text-[#1e477c] py-2"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={() => { switchLocale(); setMobileOpen(false); }}
              className="text-sm text-gray-400"
            >
              {locale === "zh" ? "English" : "中文"}
            </button>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="bg-[#1e477c] text-white px-6 py-2 rounded-full text-sm font-bold"
            >
              {locale === "zh" ? "加入俱乐部" : "Join the Club"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
