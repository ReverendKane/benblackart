import DrawingDetailPage from "@/components/pageAssembly/DrawingDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ drawingId: number }>;
}) {
  const { drawingId } = await params;

  return (
    <main>
      <DrawingDetailPage exampleId={drawingId - 1} />
    </main>
  );
}
