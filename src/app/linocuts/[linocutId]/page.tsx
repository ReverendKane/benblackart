import LinocutDetailPage from "@/components/pageAssembly/LinocutDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ linocutId: number }>;
}) {
  const { linocutId } = await params;

  return (
    <main>
      <LinocutDetailPage exampleId={linocutId - 1} />
    </main>
  );
}
