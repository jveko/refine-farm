import { IResourceItem } from "@refinedev/core";
import {
  DashboardFilled,
  FolderAddFilled,
  OrderedListOutlined,
} from "@ant-design/icons";

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
];
