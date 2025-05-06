import { themeConfig } from "@/config/antd"
import { Authenticated, ErrorComponent } from "@refinedev/core"
import { ConfigProvider } from "antd"
import { Outlet, type RouteObject } from "react-router"
import { ContentLayout } from "../components/layout"

export const ErrorRoutes: RouteObject[] = [
  {
    element: (
      <Authenticated key="catch-all" v3LegacyAuthProviderCompatible={false}>
        <ConfigProvider theme={themeConfig}>
          <ContentLayout>
            <Outlet />
          </ContentLayout>
        </ConfigProvider>
      </Authenticated>
    ),
    children: [
      {
        path: "*",
        element: <ErrorComponent />,
      },
    ],
  },
]
