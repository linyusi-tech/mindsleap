import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WorkCard from "@/components/ai-employee/WorkCard";
import { listAiEmployeePublicWorks } from "@/lib/aiEmployeeStore";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI数字员工实战营 | MindsLeap 心智悦动",
  description: "会前安装攻略、数字员工计划提交、现场成果和 30 天团队成果展示平台。",
};

const installChecks = [
  {
    title: "基础环境",
    body: "准备 Chrome 或 Edge、稳定网络、Git、Node.js LTS，并确认终端可以正常执行命令。",
  },
  {
    title: "Codex",
    body: "Codex 支持 CLI、IDE extension 和 Codex app。会前先完成登录，现场可用 codex doctor 做本机诊断。",
  },
  {
    title: "Hermes",
    body: "按活动群最新入口完成账号登录，提前试一次新建任务，确认浏览器不会拦截弹窗。",
  },
  {
    title: "Windows 附录",
    body: "Windows 学员优先准备 Git、Node.js LTS、Python 和 GitHub CLI；现场以 macOS 流程为主。",
  },
];

const journey = [
  {
    title: "会前",
    heading: "先把环境装好，把目标讲清楚",
    body: "提交安装状态、单个数字员工设想和 30 天团队方向。现场少调试，多实操。",
  },
  {
    title: "现场",
    heading: "搭出第一个能跑的数字员工",
    body: "围绕一个真实岗位或流程，明确输入、输出、工具和验收标准，把雏形做出来。",
  },
  {
    title: "30 天",
    heading: "把单点员工扩成团队资产",
    body: "把多个数字员工串成业务链路，持续补成果链接，让彼此能看到、借鉴、复用。",
  },
];

const examples = [
  "市场部选题脚本员工",
  "客户跟进记录员工",
  "会议纪要行动员工",
  "投研资料整理员工",
  "销售线索到成交团队",
  "团队知识库与 SOP 团队",
];

export default async function AiEmployeeHomePage() {
  const works = await listAiEmployeePublicWorks(3);

  return (
    <div className="bg-[#f8fafc]">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <Image
            src="/poster/ai-hermes-workshop/background_ai_digital_employee_bootcamp_v1.png"
            alt="AI数字员工实战营视觉背景"
            fill
            priority
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061626] via-[#061626]/85 to-[#1e477c]/70" />
        </div>
        <div className="relative mx-auto grid min-h-[76dvh] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.1em] text-blue-200">
              MindsLeap Founders AI Club Bootcamp
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
              AI数字员工实战营
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">
              会前装好环境，现场搭出第一个数字员工，30 天把它扩成一支能服务业务的团队。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/event/ai-employee/submit"
                className="rounded-full bg-white px-7 py-4 text-center font-bold text-[#1e477c] shadow-lg transition hover:bg-blue-50"
              >
                提交我的计划
              </Link>
              <Link
                href="/event/ai-employee/gallery"
                className="rounded-full border border-white/30 px-7 py-4 text-center font-bold text-white transition hover:bg-white/10"
              >
                看作品广场
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
            <div className="rounded-2xl bg-white p-5 text-slate-950">
              <p className="text-sm font-bold text-[#1e477c]">现场目标</p>
              <h2 className="mt-2 text-2xl font-bold leading-tight">
                从一个岗位开始，让 AI 真正进入业务流程。
              </h2>
              <div className="mt-6 grid gap-3">
                {examples.slice(0, 4).map((item) => (
                  <div key={item} className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="install" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">会前安装攻略</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            这份清单只解决一件事：让大家在现场把时间花在定义岗位和搭建流程上，而不是卡在账号、命令行和浏览器权限。
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {installChecks.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1e477c]">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-[#1e477c]/15 bg-white p-6 text-sm leading-7 text-slate-600">
          Codex 安装和诊断以 OpenAI 官方 Codex 文档为准。页面实现时已按最新 Codex manual 校准：Codex 可通过 CLI、IDE extension、Codex app 使用，CLI 提供 <code className="rounded bg-slate-100 px-1.5 py-1">codex doctor</code> 诊断。
          <a
            href="https://developers.openai.com/codex/quickstart"
            className="ml-2 font-bold text-[#1e477c] underline underline-offset-4"
          >
            打开官方 quickstart
          </a>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">一条从设想到成果的路径</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              平台先收集设想，再沉淀成果。每个人都能看到其他人的业务问题、岗位设计和团队打法。
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {journey.map((item) => (
              <article key={item.title} className="rounded-3xl bg-slate-50 p-7">
                <p className="text-sm font-bold text-[#1e477c]">{item.title}</p>
                <h3 className="mt-3 text-2xl font-bold text-slate-950">{item.heading}</h3>
                <p className="mt-4 leading-7 text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">作品广场</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              审核通过后，学员的计划和成果会进入这里。联系方式不会公开。
            </p>
          </div>
          <Link href="/event/ai-employee/gallery" className="font-bold text-[#1e477c] underline underline-offset-4">
            查看全部作品
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} compact />
          ))}
          {!works.length && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-slate-600 lg:col-span-3">
              第一批作品审核后会出现在这里。现在可以先提交你的单个数字员工和 30 天团队计划。
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#1e477c] py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">带着问题来，带着数字员工走。</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
              先提交设想，现场我们一起把岗位、流程和验收标准做实。
            </p>
          </div>
          <Link
            href="/event/ai-employee/submit"
            className="rounded-full bg-white px-8 py-4 text-center font-bold text-[#1e477c] shadow-lg hover:bg-blue-50"
          >
            开始提交
          </Link>
        </div>
      </section>
    </div>
  );
}
