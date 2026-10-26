import Image from "next/image";
import { Link } from "@/i18n/navigation";

type ServicesHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
};

export default function ServicesHero({
  eyebrow,
  title,
  description,
  primaryLabel,
  secondaryLabel,
}: ServicesHeroProps) {
  return (
    <section className="relative flex min-h-[560px] max-h-[760px] items-end overflow-hidden bg-primary-dark md:min-h-[620px]">
      <Image
        src="/images/news/ai-native-enterprise-conference-shanghai-2026-cover1.jpg"
        alt="MindsLeap AI Native Enterprise Conference"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[36%_center] md:object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,47,84,0.94)_0%,rgba(21,47,84,0.78)_42%,rgba(21,47,84,0.18)_78%)]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-28 sm:px-8 md:pb-20 lg:px-12">
        <div className="max-w-3xl text-white">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-white">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-gray-100 sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#service-paths"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-gray-100"
            >
              {primaryLabel}
              <span aria-hidden="true" className="ml-2">↓</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
