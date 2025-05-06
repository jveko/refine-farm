import { ContentLayout } from "@/components/layout"
import { FullScreenLoading } from "@/components/ui/loading"
import { themeConfig } from "@/config"
import { cooperationAgreementTypeRouter } from "@/pages/cooperation-agreement-type"
import { DashboardPage } from "@/pages/dashboard"
import { Authenticated } from "@refinedev/core"
import { CatchAllNavigate } from "@refinedev/react-router"
import { ConfigProvider } from "antd"
import { Outlet, type RouteObject } from "react-router"

const AuthenticatedLayout = () => {
  return (
    <ConfigProvider theme={themeConfig}>
      <ContentLayout>
        <Outlet />
      </ContentLayout>
    </ConfigProvider>
  )
}

export const ProtectedRoutes: RouteObject[] = [
  {
    element: (
      <Authenticated
        key="authenticated-inner"
        fallback={<CatchAllNavigate to="/login" />}
        v3LegacyAuthProviderCompatible={false}
        loading={<FullScreenLoading message="Checking authentication..." />}
      >
        <AuthenticatedLayout />
      </Authenticated>
    ),
    children: [
      {
        path: "/",
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/sadasd",
        index: true,
        element: <DashboardPage />,
      },
      ...cooperationAgreementTypeRouter,
    ],
  },
]
