import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { useNotificationProvider } from "@refinedev/antd";

import "@refinedev/antd/dist/reset.css";

import { App as AntdApp } from "antd";
import { createBrowserRouter, Outlet } from "react-router";
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier, } from "@refinedev/react-router";
import { useMsal } from "@azure/msal-react";
import { queryClient } from "@/config";
import { dataProvider, accessControlProvider, authProvider } from "@/providers";
import { FullScreenLoading } from "@/components/ui";
import { resources } from "./resources";
import { router } from "./routes";

export const RootRouter = createBrowserRouter([
  {
    element: <App />,
    children: [
      ...router
    ],
  },
]);


function App() {
  return (
    <AntdApp>
      <DevtoolsProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={{
            default: dataProvider,
          }}
          authProvider={authProvider}
          notificationProvider={useNotificationProvider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
            projectId: "JFHu8f-DJOMPr-NRMnXP",
            reactQuery: {
              clientConfig: queryClient,
            },
          }}
          resources={resources}
          accessControlProvider={accessControlProvider}
        >
          <BaseLayout>
            <Outlet />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </BaseLayout>
        </Refine>
        <DevtoolsPanel />
      </DevtoolsProvider>
    </AntdApp>
  );
}

function BaseLayout({ children }: React.PropsWithChildren) {
  const { inProgress } = useMsal();

  if (inProgress === "login" || inProgress === "handleRedirect") {
    return <FullScreenLoading />;
  }

  return children;
}

