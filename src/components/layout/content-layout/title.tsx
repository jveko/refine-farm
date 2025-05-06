import { LogoIcon } from "@/components/ui/logo"
import { TITLE_APP } from "@/constants"
import type { RefineLayoutThemedTitleProps } from "@refinedev/antd"
import { useLink, useRouterContext, useRouterType } from "@refinedev/core"
import { Space, Typography, theme } from "antd"
import type React from "react"

const { Title } = Typography

export const TitleContent: React.FC<RefineLayoutThemedTitleProps> = ({ collapsed, wrapperStyles }) => {
  const { token } = theme.useToken()
  const Link = useLink()

  return (
    <Link
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
            borderRadius: "12px",
            background: collapsed ? "white" : "rgba(255, 255, 255, 0.25)",
            padding: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "all 0.3s",
          }}
        >
          <LogoIcon />
        </div>

        {!collapsed && (
          <Title
            level={4}
            style={{
              margin: 0,
              fontWeight: 700,
              marginLeft: "12px",
              color: "white",
              lineHeight: 1.2,
              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            {TITLE_APP}
          </Title>
        )}
      </Space>
    </Link>
  )
}
