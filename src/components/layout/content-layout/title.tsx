import React from "react";
import {
  useRouterContext,
  useRouterType,
  useLink,
} from "@refinedev/core";
import { Typography, theme, Space } from "antd";
import { RefineLayoutThemedTitleProps } from "@refinedev/antd";
import { LogoIcon } from "@/components/ui/logo";
import { TITLE_APP } from "@/constants";

const { Title } = Typography;

export const TitleContent: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
}) => {
  const { token } = theme.useToken();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ActiveLink
      to="/"
      style={{
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "inherit",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "40px",
            width: "40px",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            background: collapsed ? "white" : "rgba(255, 255, 255, 0.2)",
            padding: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <LogoIcon />
        </div>

        {!collapsed && (
          <Title
            level={4}
            style={{
              margin: 0,
              fontWeight: 600,
              marginLeft: "12px",
              color: "white",
              lineHeight: 1.2,
            }}
          >
            {TITLE_APP}
          </Title>
        )}
      </Space>
    </ActiveLink>
  );
};
