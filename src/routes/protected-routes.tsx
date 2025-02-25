import { themeConfig, GlobalStyle } from "@/config";
import { ContentLayout } from "@/components/layout";
import { DashboardPage } from "@/pages/dashboard";
import { Authenticated } from "@refinedev/core";
import { CatchAllNavigate } from "@refinedev/react-router";
import { ConfigProvider } from "antd";
import { Outlet, RouteObject } from "react-router";
import { cooperationAgreementTypeRouter } from "@/pages/cooperation-agreement-type";
import { FullScreenLoading } from "@/components/ui/loading";
import { useEffect, useState } from "react";

// Component to handle authenticated routes with loading state
const AuthenticatedLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate a short loading time for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <FullScreenLoading message="Loading your dashboard..." />;
  }
  
  return (
    <ConfigProvider theme={themeConfig}>
      <GlobalStyle />
      <ContentLayout>
        <Outlet />
      </ContentLayout>
    </ConfigProvider>
  );
};

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
      ...cooperationAgreementTypeRouter,
    ],
  }
];
