import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
/* eslint-disable @next/next/no-img-element */

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="bg-[#1e477c] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="mb-8">
              <img src="/images/logo-white.png" alt="MindsLeap" className="h-10 w-auto" />
            </div>
            <p className="text-blue-200 max-w-sm text-lg italic">
              &ldquo;Upgrade AI Mindsets for Global Success&rdquo;
            </p>
            <p className="text-blue-300/60 mt-4 text-sm">
              {t("rights")}
            </p>
          </div>

          {/* Services & Pages */}
          <div>
            <h4 className="font-bold text-white mb-6">{t("services")}</h4>
            <ul className="space-y-4 text-blue-200">
              <li>
                <Link href="/services/ai-club" className="hover:text-white transition">
                  {nav("aiClub")}
                </Link>
              </li>
              <li>
                <Link href="/services/ai-transformation" className="hover:text-white transition">
                  {nav("training")}
                </Link>
              </li>
              <li>
                <Link href="/services/accelerator" className="hover:text-white transition">
                  {nav("incubation")}
                </Link>
              </li>
              <li>
                <Link href="/services/global-growth" className="hover:text-white transition">
                  {nav("studyTours")}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition">
                  {nav("news")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  {nav("about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-6">{t("contactTitle")}</h4>
            <ul className="space-y-4 text-blue-200">
              <li>Email: mindsleap@gmail.com</li>
              <li>Office: Silicon Valley / Shanghai</li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 text-blue-200 hover:text-white transition"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-blue-300/60">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
          <p>Managed by Founders Space Partners</p>
        </div>
      </div>
    </footer>
  );
}
