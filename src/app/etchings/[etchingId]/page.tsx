import EtchingDetailPage from "@/components/pageAssembly/EtchingDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ etchingId: number }>;
}) {
  const { etchingId } = await params;

  return (
    <main>
      <EtchingDetailPage exampleId={etchingId - 1} />
    </main>
  );
}
