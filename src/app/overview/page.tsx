import RagContent from "@/components/Overview"
// import RagContent from "@/components/RagContent"
import { getDashboardData } from "@/server/actions"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientConfig,
} from '@tanstack/react-query'

export default async function OverviewPage() {
  const queryClientConfig: QueryClientConfig = {
    defaultOptions:{ 
        queries: { staleTime: 1000 * 5 },
    }
  }
  const queryClient = new QueryClient(queryClientConfig)

  await queryClient.prefetchQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
  })
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RagContent />
      {/* <RagContent /> */}
    </HydrationBoundary>
  )
}