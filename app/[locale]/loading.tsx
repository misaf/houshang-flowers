import { PageShell } from "@/components/layout/page-shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <PageShell>
      <section className="bg-background pb-16 pt-28 sm:pt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-4 h-10 w-2/3" />
          <Skeleton className="mt-3 h-5 w-full max-w-md" />
          <div className="mt-10 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-10/12" />
            <Skeleton className="h-4 w-9/12" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
