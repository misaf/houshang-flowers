import { PageShell } from "@/shared/components/layout/page-shell";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ProductDetailLoading() {
  return (
    <PageShell>
      <section className="bg-background pb-12 pt-32 sm:pb-14 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="mb-6 h-4 w-40" />
          <div className="grid gap-0 overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-2">
            {/* Gallery */}
            <div className="p-3 sm:p-4">
              <Skeleton className="aspect-[4/3] w-full rounded-md" />
              <div className="mt-3 flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="size-16 rounded-md" />
                ))}
              </div>
            </div>
            {/* Detail */}
            <div className="grid gap-5 border-t border-border p-4 sm:p-6 lg:border-t-0">
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex gap-3">
                <Skeleton className="h-11 w-40 rounded-md" />
                <Skeleton className="h-11 w-32 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
