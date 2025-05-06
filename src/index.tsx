import { msalInstance } from "@/config"
import React from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { RootRouter } from "./App"

await msalInstance.initialize()
const container = document.querySelector("#root")
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <React.Suspense>
      <RouterProvider router={RootRouter} />
    </React.Suspense>
  </React.StrictMode>,
)
