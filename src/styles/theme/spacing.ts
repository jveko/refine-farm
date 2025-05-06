/**
 * Tob Insurance Spacing System
 *
 * This file defines the spacing and layout guidelines for Tob Insurance web applications
 * according to the comprehensive style guide.
 */

// Base spacing unit (in pixels)
export const SPACING_UNIT = 8

// Spacing scale
export const SPACING = {
  NONE: "0px",
  XXXS: `${SPACING_UNIT / 4}px`, // 2px
  XXS: `${SPACING_UNIT / 2}px`, // 4px
  XS: `${SPACING_UNIT}px`, // 8px
  SM: `${SPACING_UNIT * 2}px`, // 16px
  MD: `${SPACING_UNIT * 3}px`, // 24px
  LG: `${SPACING_UNIT * 4}px`, // 32px
  XL: `${SPACING_UNIT * 5}px`, // 40px
  XXL: `${SPACING_UNIT * 6}px`, // 48px
  XXXL: `${SPACING_UNIT * 8}px`, // 64px
}

// Layout constants
export const LAYOUT = {
  // Maximum content width
  MAX_CONTENT_WIDTH: "1200px",

  // Container padding
  CONTAINER_PADDING: {
    MOBILE: SPACING.SM,
    TABLET: SPACING.MD,
    DESKTOP: SPACING.LG,
  },

  // Breakpoints
  BREAKPOINTS: {
    XS: "480px", // Extra small devices (phones)
    SM: "576px", // Small devices (large phones)
    MD: "768px", // Medium devices (tablets)
    LG: "992px", // Large devices (desktops)
    XL: "1200px", // Extra large devices (large desktops)
    XXL: "1600px", // Extra extra large devices
  },

  // Z-index scale
  Z_INDEX: {
    BACKGROUND: -1,
    DEFAULT: 1,
    STICKY: 100,
    DROPDOWN: 200,
    OVERLAY: 300,
    MODAL: 400,
    POPOVER: 500,
    TOOLTIP: 600,
    TOAST: 700,
  },

  // Border radius
  BORDER_RADIUS: {
    NONE: "0px",
    SM: "4px",
    MD: "8px",
    LG: "12px",
    XL: "16px",
    CIRCLE: "50%",
    PILL: "9999px",
  },
}

// Common spacing utilities
export const SPACING_UTILS = {
  // Margin utilities
  MARGIN: {
    NONE: { margin: SPACING.NONE },
    XS: { margin: SPACING.XS },
    SM: { margin: SPACING.SM },
    MD: { margin: SPACING.MD },
    LG: { margin: SPACING.LG },
    XL: { margin: SPACING.XL },
  },

  // Padding utilities
  PADDING: {
    NONE: { padding: SPACING.NONE },
    XS: { padding: SPACING.XS },
    SM: { padding: SPACING.SM },
    MD: { padding: SPACING.MD },
    LG: { padding: SPACING.LG },
    XL: { padding: SPACING.XL },
  },

  // Gap utilities (for flex and grid)
  GAP: {
    NONE: { gap: SPACING.NONE },
    XS: { gap: SPACING.XS },
    SM: { gap: SPACING.SM },
    MD: { gap: SPACING.MD },
    LG: { gap: SPACING.LG },
    XL: { gap: SPACING.XL },
  },
}

// Export all spacing and layout constants
export default {
  SPACING_UNIT,
  SPACING,
  LAYOUT,
  SPACING_UTILS,
}
