import { LayoutDashboard, Hourglass, ChartArea, Handshake, Settings, Headset, MessageSquareWarning } from "lucide-react"
import { ReactElement } from "react"

type Route = {
  name: string
  path: string
  icon: ReactElement
}

const appRoutes: Route[] = [
  { name: "Basic Config", path: "/dashboard", icon: <LayoutDashboard /> },
  { name: "RAG", path: "/rag", icon: <Hourglass /> },
  { name: "Workflows", path: "/workflows", icon: <ChartArea /> }, // Updated path
  { name: "Security Overview", path: "/security-overview", icon: <Handshake /> }, // Updated path
  { name: "Overview", path: "/overview", icon: <Settings /> },
];

export default appRoutes 