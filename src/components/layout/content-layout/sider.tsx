import React from "react";
import { Button, Drawer, Grid, Layout, Menu, theme, Divider, Typography } from "antd";
import {
  BarsOutlined,
  DashboardOutlined,
  LeftOutlined,
  LogoutOutlined,
  RightOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  SettingOutlined,
  TeamOutlined,
  FileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  CanAccess,
  type ITreeMenu,
  pickNotDeprecated,
  useActiveAuthProvider,
  useIsExistAuthentication,
  useLink,
  useLogout,
  useMenu,
  useRefineContext,
  useRouterContext,
  useRouterType,
  useTitle,
  useTranslate,
  useWarnAboutChange,
} from "@refinedev/core";
import { RefineThemedLayoutV2SiderProps, useThemedLayoutContext } from "@refinedev/antd";
import { createStyles } from "antd-style";
import { TitleContent } from "./title";

const { Text } = Typography;

export const SiderContent: React.FC<RefineThemedLayoutV2SiderProps> = (props) => {
  const {
    meta,
    render,
    fixed,
    activeItemDisabled,
  } = props;
  const { token } = theme.useToken();
  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();
  const { styles } = useStyles()

  const isExistAuthentication = useIsExistAuthentication();
  const routerType = useRouterType();
  const NewLink = useLink();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const { Link: LegacyLink } = useRouterContext();
  const Link = routerType === "legacy" ? LegacyLink : NewLink;
  const TitleFromContext = useTitle();
  const translate = useTranslate();
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu({ meta });
  const breakpoint = Grid.useBreakpoint();
  const { hasDashboard } = useRefineContext();
  const authProvider = useActiveAuthProvider();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const desktopSize = 250;
  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  const RenderToTitle = TitleContent;

  const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
    return tree.map((item: ITreeMenu) => {
      const {
        route,
        key,
        name,
        children,
        parentName,
        meta,
        options,
      } = item;
      const authorization = meta?.authorization == undefined ? false : meta.authorization;
      if (children.length > 0) {
        const component = (
          <Menu.SubMenu
            key={key}
            icon={meta?.icon ?? <UnorderedListOutlined />}
            title={meta?.label}
            style={{
              fontWeight: 'bold',
              margin: '4px 0',
            }}
          >
            {renderTreeView(children, selectedKey)}
          </Menu.SubMenu>
        )
        if (!authorization) return component;
        return (
          <CanAccess
            key={key}
            resource={authorization.resource}
            action={authorization.action}
            params={{
              resource: item,
            }}
          >
            {component}
          </CanAccess>
        );
      }
      const isSelected = key === selectedKey;
      const isRoute = !(
        pickNotDeprecated(meta?.parent, options?.parent, parentName) !==
        undefined && children.length === 0
      );

      const linkStyle: React.CSSProperties =
        activeItemDisabled && isSelected ? { pointerEvents: "none" } : {};
      const component = (
        <Menu.Item
          key={key}
          icon={meta?.icon ?? (isRoute && <UnorderedListOutlined />)}
          style={{
            ...linkStyle,
            margin: '4px 0',
            borderRadius: '6px',
            ...(isSelected ? {
              backgroundColor: token.colorPrimaryBg,
              color: token.colorPrimary,
              fontWeight: 'bold',
            } : {})
          }}
        >
          <Link to={route ?? ""} style={linkStyle}>
            {meta?.label}
          </Link>
          {!siderCollapsed && isSelected && (
            <div className="ant-menu-tree-arrow" />
          )}
        </Menu.Item>
      )
      if (!authorization) return component;
      return (
        <CanAccess
          key={key}
          resource={authorization.resource}
          action={authorization.action}
          params={{
            resource: item,
          }}
        >
          {component}
        </CanAccess>)
    });
  };

  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(
        translate(
          "warnWhenUnsavedChanges",
          "Are you sure you want to leave? You have unsaved changes.",
        ),
      );

      if (confirm) {
        setWarnWhen(false);
        mutateLogout();
      }
    } else {
      mutateLogout();
    }
  };

  // Enhanced logout item with better styling
  const logout = isExistAuthentication && (
    <>
      {!siderCollapsed && <Divider style={{ margin: '8px 0' }} />}
      <Menu.Item
        key="logout"
        onClick={() => handleLogout()}
        icon={<LogoutOutlined />}
        style={{ marginTop: siderCollapsed ? '8px' : '0' }}
      >
        <React.Fragment>
          {translate("buttons.logout", "Logout")}
        </React.Fragment>
      </Menu.Item>
    </>
  );

  // Enhanced dashboard item with better styling
  const dashboard = hasDashboard ? (
    <Menu.Item
      key="dashboard"
      icon={<DashboardOutlined />}
      style={{
        marginBottom: '4px',
        fontWeight: selectedKey === "/" ? 'bold' : 'normal',
      }}
    >
      <Link to="/">{translate("dashboard.title", "Dashboard")}</Link>
      {!siderCollapsed && selectedKey === "/" && (
        <div className="ant-menu-tree-arrow" />
      )}
    </Menu.Item>
  ) : null;

  // No user profile section at the bottom
  const userProfile = null;

  const items = renderTreeView(menuItems, selectedKey);

  // Group menu items by category for better organization
  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        items,
        logout,
        collapsed: siderCollapsed,
      });
    }
    
    // Add category headers for better organization
    return (
      <>
        {dashboard}
        
        {!siderCollapsed && (
          <Menu.ItemGroup key="main-group" title="MAIN MENU">
            {items.map((item, i) => (<React.Fragment key={i}>{item}</React.Fragment>))}
          </Menu.ItemGroup>
        )}
        
        {siderCollapsed && items.map((item, i) => (<React.Fragment key={i}>{item}</React.Fragment>))}
        
        {logout}
      </>
    );
  };

  const renderMenu = () => {
    return (
      <Menu
        selectedKeys={selectedKey ? [selectedKey] : []}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        style={{
          paddingTop: "8px",
          paddingLeft: "8px",
          paddingRight: "8px",
          border: "none",
          overflow: "auto",
          height: `calc(100% - 72px)`,
          backgroundColor: token.colorBgContainer,
        }}
        onClick={() => {
          setMobileSiderOpen(false);
        }}
        theme="dark"
      >
        {renderSider()}
      </Menu>
    );
  };

  const renderDrawerSider = () => {
    return (
      <>
        <Drawer
          open={mobileSiderOpen}
          onClose={() => setMobileSiderOpen(false)}
          placement="left"
          closable={false}
          width={desktopSize}
          style={{
            padding: 0,
          }}
          maskClosable={true}
        >
          <Layout>
            <Layout.Sider
              style={{
                height: "100vh",
                backgroundColor: token.colorBgContainer,
                borderRight: `1px solid ${token.colorBgElevated}`,
              }}
            >
              <div
                style={{
                  width: `${desktopSize}px`,
                  padding: "0 16px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  height: "64px",
                  backgroundColor: token.colorPrimary,
                  color: token.colorTextLightSolid,
                }}
              >
                <RenderToTitle collapsed={false} />
              </div>
              {renderMenu()}
              {userProfile}
            </Layout.Sider>
          </Layout>
        </Drawer>
        <Button
          className={styles.drawerButton}
          size="large"
          onClick={() => setMobileSiderOpen(true)}
          icon={<BarsOutlined />}
          type="primary"
        />
      </>
    );
  };

  if (isMobile) {
    return renderDrawerSider();
  }

  const siderStyles: React.CSSProperties = {
    backgroundColor: token.colorBgContainer,
    borderRight: `1px solid ${token.colorBorderSecondary}`,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    background: token.colorBgLayout,
  };

  if (fixed) {
    siderStyles.position = "fixed";
    siderStyles.top = 0;
    siderStyles.height = "100vh";
    siderStyles.zIndex = 999;
  }

  return (
    <>
      {fixed && (
        <div
          style={{
            width: siderCollapsed ? "80px" : `${desktopSize}px`,
            transition: "all 0.2s",
          }}
        />
      )}
      <Layout.Sider
        style={siderStyles}
        collapsible
        collapsed={siderCollapsed}
        onCollapse={(collapsed, type) => {
          if (type === "clickTrigger") {
            setSiderCollapsed(collapsed);
          }
        }}
        collapsedWidth={80}
        width={desktopSize}
        breakpoint="lg"
        trigger={
          <Button
            type="text"
            style={{
              borderRadius: 0,
              height: "100%",
              width: "100%",
              backgroundColor: token.colorBgElevated,
            }}
          >
            {siderCollapsed ? (
              <RightOutlined
                style={{
                  color: token.colorPrimary,
                }}
              />
            ) : (
              <LeftOutlined
                style={{
                  color: token.colorPrimary,
                }}
              />
            )}
          </Button>
        }
      >
        <div
          style={{
            width: siderCollapsed ? "80px" : `${desktopSize}px`,
            padding: siderCollapsed ? "0" : "0 16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "64px",
            backgroundColor: token.colorPrimary,
            color: token.colorTextLightSolid,
            fontSize: "14px",
          }}
        >
          <RenderToTitle collapsed={siderCollapsed} />
        </div>
        {renderMenu()}
        {userProfile}
      </Layout.Sider>
    </>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    drawerButton: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      position: "fixed",
      top: 64,
      zIndex: 999,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    },
  };
});
