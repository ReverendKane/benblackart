import LasercutDetailPage from "@/components/pageAssembly/LasercutDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ laserId: number }>;
}) {
  const { laserId } = await params;

  return (
    <main>
      <LasercutDetailPage exampleId={laserId - 1} />
    </main>
  );
}
