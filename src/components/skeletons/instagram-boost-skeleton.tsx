import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function InstagramBoostSkeleton() {
  return (
    <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        {/* Packages Skeleton */}
        <Card className="border-card-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="border-card-border bg-card/30 p-4 space-y-4">
                  <Skeleton className="h-6 w-2/3 mx-auto" />
                  <Skeleton className="h-8 w-1/2 mx-auto" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                  <div className="space-y-2 pt-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                  <Skeleton className="h-12 w-full mt-4" />
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar Skeleton */}
      <div className="space-y-4 sm:space-y-6">
        <Card className="border-card-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </CardContent>
        </Card>
        <Card className="border-card-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
