"use client";

import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Dropdown,
  Layout as AntdLayout,
  Space,
  theme,
  Typography,
  Divider,
  Button,
} from "antd";
import React from "react";
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useLogout, useRouterContext, useTitle } from "@refinedev/core";
import { useThemedLayoutContext } from "@refinedev/antd";

const { Text } = Typography;
const { useToken } = theme;

export const HeaderContent: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { token } = useToken();
  const { siderCollapsed } = useThemedLayoutContext();
  const Title = useTitle();
  const { Link } = useRouterContext();
  const { mutate: mutateLogout } = useLogout();

  // Mock user data - replace with actual user data in production
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: null,
  };

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "space-between", // Changed to space-between for better layout
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  // User dropdown menu items
  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => mutateLogout(),
    },
  ];

  return (
    <AntdLayout.Header style={headerStyles}>
      {/* Left side: Page title or empty space */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Text strong style={{ fontSize: '16px' }}>
          {typeof Title === 'function' ? "Dashboard" : "Dashboard"}
        </Text>
      </div>

      {/* Right side: Notifications, Help, and User Profile */}
      <Space size="middle">
        <Button
          type="text"
          icon={<QuestionCircleOutlined style={{ fontSize: '18px' }} />}
          aria-label="Help"
        />
        
        <Badge count={3} dot>
          <Button
            type="text"
            icon={<BellOutlined style={{ fontSize: '18px' }} />}
            aria-label="Notifications"
          />
        </Badge>
        
        <Divider type="vertical" style={{ height: '24px', margin: '0 8px' }} />
        
        <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
          <Space style={{ cursor: "pointer" }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: token.colorBgContainer,
              padding: '4px 12px 4px 4px',
              borderRadius: '50px',
              border: `1px solid ${token.colorBorderSecondary}`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <Avatar
                size="default"
                icon={<UserOutlined />}
                style={{
                  backgroundColor: token.colorPrimary,
                  marginRight: '8px'
                }}
              />
              <Text strong>{user.name}</Text>
            </div>
          </Space>
        </Dropdown>
      </Space>
    </AntdLayout.Header>
  );
};
