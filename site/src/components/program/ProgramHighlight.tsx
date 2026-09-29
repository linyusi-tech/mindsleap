import Image from "next/image";
import { Link } from "@/i18n/navigation";

type Props = {
  locale: string;
  compact?: boolean;
};

export default function ProgramHighlight({ locale, compact = false }: Props) {
  const isZh = locale !== "en";

  return (
    <section className={compact ? "bg-white py-16 md:py-20" : "bg-[#f4f7fb] py-16 md:py-24"}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#3b82f6]">
            {isZh ? "MindsLeap 旗舰项目" : "MindsLeap Flagship Program"}
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-normal text-[#1e477c] md:text-4xl">
            {isZh ? "AI 原生组织跃迁实战营" : "AI-Native Organization Acceleration Program"}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-700">
            {isZh
              ? "面向企业家与核心团队的三个月企业 AI 转型实战项目。10 天集中学习、4 次企业专属诊断，围绕一个真实业务项目把 AI 推进到组织里。"
              : "A three-month enterprise AI transformation program for founders and core teams, combining 10 days of intensive learning, four advisory sessions, and one real business project."}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-[#1e477c]">
            <span className="border-l-2 border-[#1e477c] pl-3">{isZh ? "3 个月" : "3 months"}</span>
            <span className="border-l-2 border-[#1e477c] pl-3">{isZh ? "10 天实战" : "10 days of practice"}</span>
            <span className="border-l-2 border-[#1e477c] pl-3">{isZh ? "4 次企业诊断" : "4 advisory sessions"}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/program/ai-native-organization"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#1e477c] px-6 py-3 font-semibold text-white transition hover:bg-[#16385f]"
            >
              {isZh ? "查看课程与参与方式" : "View the program"} <span aria-hidden="true" className="ml-2">→</span>
            </a>
            <Link
              href="/services/ai-transformation"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#1e477c]/30 px-6 py-3 font-semibold text-[#1e477c] transition hover:bg-white"
            >
              {isZh ? "了解企业 AI 转型服务" : "Explore AI transformation services"}
            </Link>
          </div>
        </div>
        <a href="/program/ai-native-organization" className="group block overflow-hidden rounded-md bg-[#10233f]">
          <Image
            src="/program/assets/ai-native-program/hero-ai-native-day.jpg"
            alt={isZh ? "AI 原生组织跃迁实战营课程主题视觉" : "AI-Native Organization Acceleration Program visual"}
            width={1672}
            height={941}
            className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        </a>
      </div>
    </section>
  );
}
