import { DashboardFilled, FolderAddFilled, OrderedListOutlined } from "@ant-design/icons"
import type { IResourceItem } from "@refinedev/core"

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardFilled />,
    },
  },
  {
    name: "dashboard2",
    list: "/sadasd",
    meta: {
      label: "Dashboard",
      icon: <DashboardFilled />,
      parent: "dashboard",
    },
  },
  {
    name: "cooperation-agreement-type",
    identifier: "cooperation-agreement-type",
    list: "/cooperation-agreement-type",
    create: "/cooperation-agreement-type/create",
    edit: "/cooperation-agreement-type/:id",
    meta: {
      label: "Type",
      icon: <FolderAddFilled />,
    },
  },
]
