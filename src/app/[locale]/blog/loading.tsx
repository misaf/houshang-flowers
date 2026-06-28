import { PageShell } from "@/shared/components/layout/page-shell";
import { Card, CardHeader } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <PageShell>
      <section className="bg-background pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-3 h-12 w-56" />
          <Skeleton className="mt-4 h-5 w-full max-w-md" />

          {/* Featured lead */}
          <div className="mt-12 grid gap-6 border-b border-border pb-12 lg:grid-cols-12 lg:items-center lg:gap-10">
            <Skeleton className="aspect-[16/10] w-full rounded-2xl lg:col-span-7" />
            <div className="lg:col-span-5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="mt-4 h-10 w-full" />
              <Skeleton className="mt-3 h-10 w-3/4" />
              <Skeleton className="mt-5 h-4 w-40" />
            </div>
          </div>

          {/* Grid */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardHeader>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="mt-2 h-6 w-full" />
                  <Skeleton className="mt-2 h-4 w-3/4" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
