import { BellOutlined, LogoutOutlined, QuestionCircleOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"
import type { IUser } from "@interfaces"
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd"
import { useThemedLayoutContext } from "@refinedev/antd"
import { useGetIdentity, useLogout, useRouterContext, useTitle } from "@refinedev/core"
import {
  Layout as AntdLayout,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Divider,
  Dropdown,
  type MenuProps,
  Space,
  Typography,
  theme,
} from "antd"
import type React from "react"

const { Text } = Typography
const { useToken } = theme
type MenuItem = Required<MenuProps>["items"][number]

export const HeaderContent: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky = true }) => {
  const { token } = useToken()
  const { siderCollapsed } = useThemedLayoutContext()
  const Title = useTitle()
  const { mutate: logout } = useLogout()
  const { data: user } = useGetIdentity<IUser>()

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgContainer,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    height: "64px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
  }

  if (sticky) {
    headerStyles.position = "sticky"
    headerStyles.top = 0
    headerStyles.zIndex = 1
  }

  // User dropdown menu items
  const userMenuItems: MenuItem[] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "My Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      key: "help",
      icon: <QuestionCircleOutlined />,
      label: "Help & Support",
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () =>
        logout({
          redirectPath: "/login?isLoggedOut=true",
        }),
    },
  ]

  return (
    <AntdLayout.Header style={headerStyles}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: token.colorPrimaryBg,
          padding: "6px 12px",
          borderRadius: token.borderRadiusLG,
        }}
      >
        <Text
          strong
          style={{
            fontSize: "16px",
            color: token.colorPrimary,
          }}
        >
          {typeof Title === "function" ? "Dashboard" : "Dashboard"}
        </Text>
      </div>

      <Space size="middle">
        <Badge count={5} size="small">
          <Button
            type="text"
            icon={<BellOutlined style={{ fontSize: "18px" }} />}
            size="large"
            shape="circle"
            style={{
              background: token.colorBgContainer,
              border: `1px solid ${token.colorBorderSecondary}`,
            }}
          />
        </Badge>

        <Divider type="vertical" style={{ height: "28px", margin: "0 4px" }} />

        <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
          <Space style={{ cursor: "pointer" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: token.colorBgContainer,
                padding: "4px 12px 4px 4px",
                borderRadius: "50px",
                border: `1px solid ${token.colorBorderSecondary}`,
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                transition: "all 0.2s",
              }}
            >
              <Avatar
                size="default"
                icon={<UserOutlined />}
                style={{
                  backgroundColor: token.colorPrimary,
                  marginRight: "8px",
                }}
              />
              <Text strong>{user?.name?.split(" ")[0] || "User"}</Text>
            </div>
          </Space>
        </Dropdown>
      </Space>
    </AntdLayout.Header>
  )
}
