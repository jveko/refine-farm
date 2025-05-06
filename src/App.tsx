import React from "react"
import {FullScreenLoading} from "@/components/ui"
import {msalInstance} from "@/config/msal"
import {accessControlProvider, authProvider, dataProvider} from "@/providers"
import {EventMessage, EventType, InteractionStatus} from "@azure/msal-browser"
import {MsalProvider, useMsal} from "@azure/msal-react"
import {useNotificationProvider} from "@refinedev/antd"
import {Refine} from "@refinedev/core"
import {DevtoolsPanel, DevtoolsProvider} from "@refinedev/devtools"
import routerProvider, {DocumentTitleHandler, UnsavedChangesNotifier} from "@refinedev/react-router"
import {App as AntdApp} from "antd"
import {Outlet, createBrowserRouter} from "react-router"
import {resources} from "./resources"
import {router} from "./routes"

import "@refinedev/antd/dist/reset.css"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            retryDelay: 500,
        },
    },
})

export const RootRouter = createBrowserRouter([
    {
        element: <App/>,
        children: [...router],
    },
])

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MsalProvider instance={msalInstance}>
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
                            <Outlet/>
                            <UnsavedChangesNotifier/>
                            <DocumentTitleHandler/>
                        </BaseLayout>
                    </Refine>
                    <DevtoolsPanel/>
                </DevtoolsProvider>
            </MsalProvider>
        </QueryClientProvider>
    )
}

function BaseLayout({children}: React.PropsWithChildren) {
    const {inProgress} = useMsal()

    if (inProgress !== InteractionStatus.None) {
        return <FullScreenLoading/>
    }

    return <AntdApp>{children}</AntdApp>
}
