import { Layout as AntdLayout, Grid, Typography, theme } from "antd"
import type React from "react"

import { type RefineThemedLayoutV2Props, ThemedLayoutContextProvider } from "@refinedev/antd"

import { HeaderContent } from "./header"
import { SiderContent } from "./sider"

const { Text } = Typography
const { useToken } = theme

export const ContentLayout: React.FC<RefineThemedLayoutV2Props> = ({
  children,
  Title,
  Footer,
  OffLayoutArea,
  initialSiderCollapsed,
}) => {
  const breakpoint = Grid.useBreakpoint()
  const SiderToRender = SiderContent
  const HeaderToRender = HeaderContent
  const isSmall = typeof breakpoint.sm === "undefined" ? true : breakpoint.sm
  const hasSider = !!SiderToRender({ Title })
  const { token } = useToken()

  const DefaultFooter = () => (
    <AntdLayout.Footer
      style={{
        textAlign: "center",
        backgroundColor: token.colorBgContainer,
        borderTop: `1px solid ${token.colorBorderSecondary}`,
        padding: "12px 24px",
        fontSize: "14px",
        color: token.colorTextSecondary,
      }}
    >
      <Text type="secondary">© {new Date().getFullYear()} Tob Insurance. All rights reserved.</Text>
    </AntdLayout.Footer>
  )

  return (
    <ThemedLayoutContextProvider initialSiderCollapsed={initialSiderCollapsed}>
      <AntdLayout style={{ minHeight: "100vh", background: token.colorBgLayout }} hasSider={hasSider}>
        <SiderToRender Title={Title} />
        <AntdLayout>
          <HeaderToRender />
          <AntdLayout.Content
            style={{
              position: "relative",
              background: token.colorBgContainer,
              margin: isSmall ? "16px" : "24px",
              borderRadius: token.borderRadiusLG,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                minHeight: 360,
                height: isSmall ? "calc(100vh - 145px)" : "calc(100vh - 136px)",
                overflowY: "auto",
              }}
            >
              {children}
            </div>
            {OffLayoutArea && <OffLayoutArea />}
          </AntdLayout.Content>
          {isSmall && (Footer ? <Footer /> : <DefaultFooter />)}
        </AntdLayout>
      </AntdLayout>
    </ThemedLayoutContextProvider>
  )
}
