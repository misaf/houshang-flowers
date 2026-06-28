import { PageShell } from "@/shared/components/layout/page-shell";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <PageShell>
      <section className="bg-background pb-16 pt-24 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="mb-3 h-3 w-24" />
          <Skeleton className="h-10 w-64" />

          <div className="mt-8 grid min-w-0 gap-4 sm:gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
            {/* Category rail */}
            <aside className="hidden rounded-lg border border-border bg-card p-3 lg:block">
              <Skeleton className="h-7 w-full" />
              <div className="mt-3 space-y-2">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            </aside>

            {/* Product grid */}
            <div className="grid grid-cols-2 items-stretch gap-px bg-border sm:grid-cols-2 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex h-full flex-col bg-card">
                  <div className="aspect-square sm:aspect-[4/5]">
                    <Skeleton className="h-full w-full rounded-none" />
                  </div>
                  <div className="flex min-h-24 flex-1 flex-col gap-2 px-3 pb-2 pt-3 sm:px-4 sm:pt-4">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="mt-1 h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="flex justify-end px-3 pb-3 pt-2 sm:px-4 sm:pb-4">
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
