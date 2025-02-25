"use client";
import React from "react";
import { Grid, Layout as AntdLayout, theme, Typography } from "antd";

import {
  RefineThemedLayoutV2Props,
  ThemedLayoutContextProvider,
} from "@refinedev/antd";

import { SiderContent } from "./sider";
import { HeaderContent } from "./header";

const { Text } = Typography;
const { useToken } = theme;

export const ContentLayout: React.FC<RefineThemedLayoutV2Props> = ({
  children,
  Title,
  Footer,
  OffLayoutArea,
  initialSiderCollapsed,
}) => {
  const breakpoint = Grid.useBreakpoint();
  const SiderToRender = SiderContent;
  const HeaderToRender = HeaderContent;
  const isSmall = typeof breakpoint.sm === "undefined" ? true : breakpoint.sm;
  const hasSider = !!SiderToRender({ Title });
  const { token } = useToken();

  // Custom footer component if none provided
  const DefaultFooter = () => (
    <AntdLayout.Footer
      style={{
        textAlign: "center",
        backgroundColor: token.colorBgContainer,
        borderTop: `1px solid ${token.colorBorderSecondary}`,
        padding: "12px 24px",
      }}
    >
      <Text type="secondary">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Text>
    </AntdLayout.Footer>
  );

  return (
    <ThemedLayoutContextProvider initialSiderCollapsed={initialSiderCollapsed}>
      <AntdLayout style={{ minHeight: "100vh" }} hasSider={hasSider}>
        <SiderToRender Title={Title} />
        <AntdLayout>
          <HeaderToRender />
          <AntdLayout.Content
            style={{
              backgroundColor: token.colorBgElevated,
              position: "relative",
            }}
          >
            <div
              style={{
                minHeight: 360,
                padding: isSmall ? 24 : 16,
                margin: 0,
                backgroundColor: token.colorBgContainer,
                borderRadius: 0,
                height: "calc(100vh - 128px)", // Subtract header and footer height
                overflowY: "auto",
              }}
            >
              {children}
            </div>
            {OffLayoutArea && <OffLayoutArea />}
          </AntdLayout.Content>
          {Footer ? <Footer /> : <DefaultFooter />}
        </AntdLayout>
      </AntdLayout>
    </ThemedLayoutContextProvider>
  );
};
