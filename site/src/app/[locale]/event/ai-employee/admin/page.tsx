import type { Metadata } from "next";
import AdminPanel from "@/components/ai-employee/AdminPanel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "后台审核 | AI数字员工实战营",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ admin?: string }>;
};

export default async function AiEmployeeAdminPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="bg-[#f8fafc]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-[#1e477c]">AI数字员工实战营</p>
          <h1 className="mt-4 text-4xl font-extrabold text-slate-950 md:text-5xl">
            后台审核
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            审核通过后，作品才会进入公开广场。请不要把后台链接发到群里。
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <AdminPanel initialToken={params.admin} />
      </main>
    </div>
  );
}
