import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { useNotificationProvider } from "@refinedev/antd";

import "@refinedev/antd/dist/reset.css";

import { App as AntdApp } from "antd";
import { createBrowserRouter, Outlet } from "react-router";
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier, } from "@refinedev/react-router";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { useEffect } from "react";
import { queryClient } from "@/config";
import { dataProvider, accessControlProvider, authProvider } from "@/providers";
import { FullScreenLoading } from "@/components/ui";
import { resources } from "./resources";
import { router } from "./routes";
import { TOKEN_KEY } from "./constants";
import { msalInstance, tokenRequest } from "./config/msal";

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
  const { inProgress, accounts } = useMsal();

  // Check for active account and token on component mount
  useEffect(() => {
    const checkAndRefreshToken = async () => {
      // Only proceed if we're not in the middle of a login or redirect
      if (inProgress !== InteractionStatus.None) {
        return;
      }

      // Check if we have an active account
      const activeAccount = msalInstance.getActiveAccount();
      
      // If we have accounts but no active account, set the first one as active
      if (!activeAccount && accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
      }
      
      // Get the current token from localStorage
      const token = localStorage.getItem(TOKEN_KEY);
      
      // If we have an active account
      if (activeAccount) {
        // If we don't have a token, try to get one silently
        if (!token) {
          try {
            const response = await msalInstance.acquireTokenSilent({
              ...tokenRequest,
              account: activeAccount,
            });
            
            localStorage.setItem(TOKEN_KEY, response.accessToken);
            
            // Trigger the auth provider check to start the token refresh timer
            await authProvider.check();
          } catch (error) {
            console.error("Error acquiring token silently:", error);
            // We don't need to handle this error here as the auth provider will handle it
          }
        } else {
          // If we already have a token, make sure the auth provider is aware of it
          // This will start the token refresh timer with the correct expiration
          await authProvider.check();
        }
      }
    };
    
    checkAndRefreshToken();
  }, [inProgress, accounts]);

  if (inProgress === "login" || inProgress === "handleRedirect" || inProgress === "acquireToken") {
    return <FullScreenLoading />;
  }

  return children;
}

