import type {ThemeConfig} from "antd"
import {theme} from "antd"
import {createGlobalStyle} from "antd-style"

// Export the theme configuration from our style guide
export const themeConfig: ThemeConfig = {
    "token": {
        "colorWarning": "#ee7625",
        "colorSuccess": "#49ba4d",
        "colorPrimary": "#1160a1",
        "colorTextBase": "#1e1e1e",
        "colorBgBase": "#ffffff",
        "colorError": "#ea3a3a",
        "sizeStep": 4,
        "sizeUnit": 6,
        "borderRadius": 7.5,
        "colorInfo": "#3287ff"
    },
    "components": {
        // "Button": {
        //     "fontWeight": 600,
        //     "controlHeight": 42,
        //     "controlHeightLG": 48,
        //     "controlHeightSM": 32,
        //     "paddingInline": 20,
        //     "paddingInlineLG": 16,
        //     "paddingInlineSM": 8
        // },
        "Input": {
            "activeBorderColor": "rgb(0,101,153)",
            "controlHeight": 45,
            "controlHeightLG": 52,
            "controlHeightSM": 36,
            "paddingXS": 16,
            "paddingXXS": 10,
            "borderRadiusLG": 10
        },
        "Mentions": {
            "activeBorderColor": "rgb(0,101,153)",
            "hoverBorderColor": "rgb(0,101,153)",
            "controlHeight": 45,
            "paddingInline": 16,
            "paddingInlineLG": 16,
            "paddingInlineSM": 8
        },
        "Cascader": {
            "menuPadding": 16,
            "lineHeight": 1.5714285714285714,
            "marginXS": 12,
            "paddingXS": 16,
            "paddingXXS": 8,
            "borderRadiusSM": 7.5
        },
        "Checkbox": {
            "controlInteractiveSize": 20
        },
        "DatePicker": {
            "activeBorderColor": "rgb(0,101,153)",
            "controlHeight": 45
        },
        "InputNumber": {
            "paddingBlock": 10,
            "paddingBlockLG": 10,
            "paddingBlockSM": 7
        },
        "Carousel": {
            "dotHeight": 10,
            "dotWidth": 10,
            "dotActiveWidth": 24,
            "marginXXS": 6
        },
        "Upload": {
            "padding": 32,
            "paddingSM": 24,
            "paddingXS": 16
        },
        "Switch": {
            "handleSize": 18
        },
        "Anchor": {
            "linkPaddingBlock": 10,
            "linkPaddingInlineStart": 16
        },
        "Dropdown": {
            "paddingXS": 20,
            "paddingXXS": 16,
            "padding": 24,
            "borderRadiusLG": 10,
            "borderRadiusSM": 7.5,
            "borderRadiusXS": 5
        },
        "Slider": {
            "handleActiveColor": "rgb(17,96,161)",
            "dotActiveBorderColor": "rgb(17,96,161)",
            "trackBg": "rgb(17,96,161)",
            "handleColor": "rgb(17,96,161)",
            "trackHoverBg": "rgba(0,102,153,0.5)",
            "colorPrimaryBorderHover": "rgba(0,102,153,0.5)",
            "controlSize": 16,
            "handleSize": 16,
            "railSize": 6,
            "handleSizeHover": 18,
            "railHoverBg": "rgba(0,0,0,0.06)",
            "railBg": "rgba(0,0,0,0.06)",
            "controlHeight": 36,
            "borderRadiusXS": 10
        },
        "Rate": {
            "starColor": "rgb(255,183,0)",
            "starSize": 28
        },
        "Calendar": {
            "controlItemBgActive": "rgba(17,96,161,0.2)"
        },
        "Select": {
            "optionHeight": 36,
            "multipleItemHeightLG": 45,
            "multipleItemHeight": 45,
            "paddingXS": 16,
            "paddingSM": 24,
            "paddingXXS": 12,
            "controlHeight": 45,
            "fontSizeIcon": 16,
            "multipleItemHeightSM": 24,
            "controlHeightLG": 45,
            "activeBorderColor": "rgb(50,135,255)",
            "activeOutlineColor": "rgba(5,147,255,0.1)"
        },
        "Transfer": {
            "headerHeight": 48,
            "itemHeight": 42,
            "listHeight": 300,
            "listWidth": 300,
            "marginXS": 16,
            "marginXXS": 8,
            "paddingSM": 24,
            "paddingXS": 16,
            "colorLinkActive": "rgb(17,96,161)",
            "colorLinkHover": "rgba(0,102,153,0.3)",
            "controlItemBgActiveHover": "rgba(0,102,153,0.2)"
        },
        // "Badge": {
        //     "fontSize": 16,
        //     "textFontSize": 14,
        //     "statusSize": 8
        // },
        "Popover": {
            "borderRadiusLG": 10,
            "borderRadiusXS": 5
        },
        "Segmented": {
            "controlHeight": 45,
            "controlHeightLG": 45,
            "controlHeightSM": 32,
            "controlPaddingHorizontal": 24,
            "itemSelectedBg": "rgb(17,96,161)",
            "itemSelectedColor": "rgba(255,255,255,0.88)"
        },
        "Statistic": {
            "contentFontSize": 32,
            "titleFontSize": 16,
            "marginXXS": 4
        },
        "Steps": {
            "lineWidth": 2
        },
        "Table": {
            "colorLink": "rgb(17,96,161)",
            "colorLinkActive": "rgb(17,96,161)"
        },
        "Tree": {
            "marginXS": 16,
            "paddingXS": 16,
            "directoryNodeSelectedBg": "rgb(50,135,255)"
        },
        "Alert": {
            "defaultPadding": "16px 20px",
            "withDescriptionPadding": "16px 20px"
        },
        "Message": {
            "contentPadding": "16px 16px"
        },
        "Progress": {
            "defaultColor": "rgb(50,135,255)"
        },
        "Form": {
            "labelHeight": 45
        },
        "Layout": {
            "headerColor": "rgba(17,96,161,0.1)",
            "lightTriggerColor": "rgb(17,96,161)",
            "triggerBg": "rgb(17,96,161)"
        },
        "Radio": {
            "buttonSolidCheckedActiveBg": "rgb(17,96,161)",
            "buttonSolidCheckedBg": "rgb(17,96,161)"
        },
        "Skeleton": {
            "titleHeight": 32
        }
    },
    algorithm: [
        theme.compactAlgorithm
    ]
}

// Export the global styles from our style guide
// export const GlobalStyle = AntdGlobalStyles;

// Additional global styles specific to this application
export const AppGlobalStyle = createGlobalStyle(`
  // Add any application-specific global styles here

  // Steps component styles (preserved from original)
  // .ant-steps-item-icon {
  //   font-size: 120px;
  //   color: #007bff; // Updated to Tob Blue
  // }
  //
  // .ant-steps-item-process .ant-steps-item-icon {
  //   background: #ff7900; // Updated to Tob Orange
  //   color: #ffffff;
  // }
`)
