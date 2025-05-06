/**
 * Tob Insurance Style Guide
 *
 * This file exports all style guide components for easy import throughout the application.
 */

export { default as COLORS, PRIMARY_COLORS, SUPPORTING_COLORS, SEMANTIC_COLORS, GRADIENTS } from "./colors"
export {
  default as TYPOGRAPHY,
  FONT_FAMILIES,
  FONT_WEIGHTS,
  FONT_SIZES,
  LINE_HEIGHTS,
  LETTER_SPACING,
  HEADING_STYLES,
  TEXT_STYLES,
} from "./typography"
export { default as SPACING, SPACING_UNIT, LAYOUT, SPACING_UTILS } from "./spacing"
export { default as LOGO, LOGO_SIZES, LOGO_CLEARANCE, LOGO_VARIATIONS, LOGO_PLACEMENT } from "./logo"

// Export a default object with all style guide components
export default {
  COLORS: (await import("./colors")).default,
  TYPOGRAPHY: (await import("./typography")).default,
  SPACING: (await import("./spacing")).default,
  LOGO: (await import("./logo")).default,
  // AntdGlobalStyles: (await import('./antd-overrides')).AntdGlobalStyles,
}
