import { themeConfig, GlobalStyle } from "@/config/antd";
import { ContentLayout } from "../components/layout";
import { Authenticated, ErrorComponent } from "@refinedev/core";
import { ConfigProvider } from "antd";
import { Outlet, RouteObject } from "react-router-dom";

export const ErrorRoutes: RouteObject[] = [
  {
    element: (
      <Authenticated key="catch-all" v3LegacyAuthProviderCompatible={false}>
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
        path: "*",
        element: <ErrorComponent />,
      },
    ],
  }
];