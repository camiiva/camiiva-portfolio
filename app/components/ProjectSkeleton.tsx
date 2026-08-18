// Decorative placeholder shown (blurred) behind the password modal for
// restricted projects. Contains no real project content.
export default function ProjectSkeleton() {
  return (
    <main className="container-page py-12 md:py-16 xl:py-20">
      <div className="mb-6 h-6 w-3/4 rounded bg-content-placeholder md:mb-8 md:h-7" />
      <div className="mb-3 h-4 w-full rounded bg-content-placeholder" />
      <div className="mb-3 h-4 w-full rounded bg-content-placeholder" />
      <div className="mb-10 h-4 w-2/3 rounded bg-content-placeholder md:mb-14" />
      <div className="mb-10 h-64 w-full rounded-card bg-content-placeholder md:h-96" />
      <div className="mb-3 h-4 w-full rounded bg-content-placeholder" />
      <div className="mb-3 h-4 w-5/6 rounded bg-content-placeholder" />
      <div className="h-4 w-1/2 rounded bg-content-placeholder" />
    </main>
  );
}
