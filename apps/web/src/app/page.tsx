
type HealthResponse = {
  status: string;
  service: string;
};

async function getHealth(): Promise<HealthResponse> {
  const baseUrl = process.env.API_INTERNAL_URL;

  if (!baseUrl) {
    throw new Error("API_INTERNAL_URL is not configured");
  }

  const response = await fetch(`${baseUrl}/api/v1/health`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as HealthResponse;
}

export default async function HomePage() {
  const health = await getHealth();

  return (
    <main className="mx-auto max-w-2xl p-10">
      <h1 className="text-3xl font-bold">DevPath</h1>

      <p className="mt-2 text-gray-500">
        AI 驱动的开发者学习导航与成长平台
      </p>

      <section className="mt-8 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">系统服务状态</h2>

        <p className="mt-4">
          服务名称：{health.service}
        </p>

        <p className="mt-2">
          连接状态：
          {health.status === "ok" ? "正常" : "异常"}
        </p>
      </section>
    </main>
  );
}
