import { BarsOutlined, LeftOutlined, RightOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { type RefineThemedLayoutV2SiderProps, useThemedLayoutContext } from "@refinedev/antd"
import { CanAccess, type ITreeMenu, useLink, useMenu } from "@refinedev/core"
import type { ResourceRoutePath } from "@refinedev/core/src/contexts/resource/types"
import { Button, Drawer, Grid, Layout, Menu, type MenuProps } from "antd"
import { createStyles } from "antd-style"
import type { ItemType, SubMenuType } from "antd/es/menu/interface"
import type React from "react"
import { useCallback, useMemo } from "react"
import { TitleContent } from "./title"

type MenuItem = Required<MenuProps>["items"][number]

const useStyles = createStyles(({ token }) => ({
  siderBase: {
    backgroundColor: token.colorBgContainer,
    borderRight: `1px solid ${token.colorBorderSecondary}`,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    background: token.colorBgLayout,
    transition: "all 0.2s",
  },
  fixedSider: {
    position: "fixed",
    top: 0,
    height: "100vh",
    zIndex: 999,
  },
  drawerButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    position: "fixed",
    top: 64,
    left: 0,
    zIndex: 999,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
  titleContainerCollapsed: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "64px",
    backgroundColor: token.colorPrimary,
    color: token.colorTextLightSolid,
    padding: "0",
    width: "80px",
    fontSize: "14px",
    transition: "all 0.2s",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "64px",
    backgroundColor: token.colorPrimary,
    color: token.colorTextLightSolid,
    padding: "0 16px",
    width: "100%",
    fontSize: "14px",
    transition: "all 0.2s",
  },
  triggerButton: {
    borderRadius: 0,
    height: "100%",
    width: "100%",
    backgroundColor: token.colorBgElevated,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: token.colorPrimaryBg,
    },
  },
  triggerIcon: {
    color: token.colorPrimary,
  },
  spacer: {
    transition: "all 0.2s",
  },
}))

/**
 * Sidebar component for Refine themed layout
 */
export const SiderContent: React.FC<RefineThemedLayoutV2SiderProps> = ({
  meta,
  fixed = false,
  activeItemDisabled = false,
}) => {
  const { siderCollapsed, setSiderCollapsed, mobileSiderOpen, setMobileSiderOpen } = useThemedLayoutContext()

  const { styles, cx } = useStyles()
  const Link = useLink()
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu({ meta })
  const breakpoint = Grid.useBreakpoint()

  const DESKTOP_SIDER_WIDTH = 250
  const isMobile = typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg

  const handleMenuItemClick = useCallback(() => {
    if (isMobile) {
      setMobileSiderOpen(false)
    }
  }, [isMobile, setMobileSiderOpen])

  const transformTreeToAntdItems = useCallback(
    (items: ITreeMenu[], selectedKey?: string, level = 0): MenuItem[] => {
      return items.map((item) => {
        const { key, children, meta, list } = item
        const isSelected = key === selectedKey
        const isRoute = !(meta?.parent !== undefined && children.length === 0)
        const authorization = meta?.authorization

        const linkStyle = activeItemDisabled && isSelected ? { pointerEvents: "none" } : undefined
        // Create base menu item properties
        const baseMenuItem: MenuItem = {
          key: key!,
          icon: meta?.icon ?? (isRoute ? <UnorderedListOutlined /> : undefined),
          ...(level === 0 && { style: { fontWeight: "bold" } }),
        }

        // If it has children, return a submenu (type: 'submenu')
        if (children.length > 0) {
          const submenuItem: SubMenuType = {
            ...baseMenuItem,
            key: key!,
            label: meta?.label,
            type: "submenu",
            children: transformTreeToAntdItems(children, selectedKey, level + 1),
          }

          // Wrap with CanAccess if needed
          if (authorization) {
            return {
              ...submenuItem,
              label: (
                <CanAccess resource={authorization.resource} action={authorization.action} params={{ resource: item }}>
                  {meta?.label}
                </CanAccess>
              ),
            }
          }

          return submenuItem
        }

        // It's a leaf node, return a regular menu item (type: 'item')
        const menuItem: ItemType = {
          ...baseMenuItem,
          type: "item",
          label: (
            <Link to={(list as ResourceRoutePath) ?? ""} style={linkStyle}>
              {meta?.label}
            </Link>
          ),
          onClick: handleMenuItemClick,
        }

        // Wrap with CanAccess if needed
        if (authorization) {
          return {
            ...menuItem,
            label: (
              <CanAccess resource={authorization.resource} action={authorization.action} params={{ resource: item }}>
                {menuItem.label}
              </CanAccess>
            ),
          }
        }

        return menuItem
      })
    },
    [activeItemDisabled, handleMenuItemClick],
  )

  // Memoize the transformed menu items with proper grouping
  const antdMenuItems = useMemo(() => {
    const transformedItems = transformTreeToAntdItems(menuItems, selectedKey)

    // If not collapsed, wrap with ItemGroup and add dividers for visual separation
    if (!siderCollapsed && transformedItems.length > 0) {
      return [
        {
          type: "group",
          label: "MAIN MENU",
          key: "main-menu-group",
          children: transformedItems,
        },
        {
          type: "divider",
          key: "main-divider",
        },
      ] satisfies MenuItem[]
    }

    return transformedItems
  }, [menuItems, selectedKey, siderCollapsed, transformTreeToAntdItems])

  const renderMenu = () => (
    <Menu
      selectedKeys={selectedKey ? [selectedKey] : []}
      defaultOpenKeys={defaultOpenKeys}
      mode="inline"
      items={antdMenuItems}
    />
  )

  // Mobile drawer sider
  if (isMobile) {
    return (
      <>
        <Drawer
          open={mobileSiderOpen}
          onClose={() => setMobileSiderOpen(false)}
          placement="left"
          closable={false}
          width={DESKTOP_SIDER_WIDTH}
          styles={{ body: { padding: 0 } }}
          maskClosable={true}
        >
          <div className={styles.titleContainer}>
            <TitleContent collapsed={false} />
          </div>
          {renderMenu()}
        </Drawer>
        <Button
          className={styles.drawerButton}
          size="large"
          onClick={() => setMobileSiderOpen(true)}
          icon={<BarsOutlined />}
          type="primary"
          aria-label="Open menu"
        />
      </>
    )
  }

  // Desktop sider
  const siderClassNames = cx(styles.siderBase, fixed && styles.fixedSider)

  const spacerStyles = {
    width: siderCollapsed ? "80px" : `${DESKTOP_SIDER_WIDTH}px`,
  }

  return (
    <>
      {fixed && <div className={styles.spacer} style={spacerStyles} aria-hidden="true" />}
      <Layout.Sider
        className={siderClassNames}
        collapsible
        collapsed={siderCollapsed}
        onCollapse={(collapsed, type) => {
          if (type === "clickTrigger") {
            setSiderCollapsed(collapsed)
          }
        }}
        collapsedWidth={80}
        width={DESKTOP_SIDER_WIDTH}
        breakpoint="lg"
        trigger={
          <Button
            type="text"
            className={styles.triggerButton}
            aria-label={siderCollapsed ? "Expand menu" : "Collapse menu"}
          >
            {siderCollapsed ? (
              <RightOutlined className={styles.triggerIcon} />
            ) : (
              <LeftOutlined className={styles.triggerIcon} />
            )}
          </Button>
        }
      >
        <div className={siderCollapsed ? styles.titleContainerCollapsed : styles.titleContainer}>
          <TitleContent collapsed={siderCollapsed} />
        </div>
        {renderMenu()}
      </Layout.Sider>
    </>
  )
}
