import { themeConfig, GlobalStyle } from "@/config";
import { ContentLayout } from "@/components/layout";
import { DashboardPage } from "@/pages/dashboard";
import { Authenticated } from "@refinedev/core";
import { CatchAllNavigate } from "@refinedev/react-router-v6";
import { ConfigProvider } from "antd";
import { Outlet, RouteObject } from "react-router-dom";
import { cooperationAgreementTypeRouter } from "@/pages/cooperation-agreement-type";

export const ProtectedRoutes: RouteObject[] = [
  {
    element: (
      <Authenticated
        key="authenticated-inner"
        fallback={<CatchAllNavigate to="/login" />}
        v3LegacyAuthProviderCompatible={false}
      >
        <ConfigProvider theme={themeConfig}>
          <GlobalStyle />
          <ContentLayout>
            <Outlet />
          </ContentLayout>
        </ConfigProvider>
      </Authenticated>
    ),
    children: [
      {
        path: "/",
        index: true,
        element: <DashboardPage />,
      },
      ...cooperationAgreementTypeRouter,
    ],
  }
];
