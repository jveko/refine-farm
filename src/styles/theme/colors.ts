/**
 * Tob Insurance Color System
 *
 * This file defines the color palette for Tob Insurance web applications
 * according to the comprehensive style guide.
 */

// Primary Brand Colors
export const PRIMARY_COLORS = {
  TOB_BLUE: "#007bff", // Applied to primary navigation, CTAs, and key interactive elements
  TOB_ORANGE: "#ff7900", // Used for accent elements, highlights, and secondary interactions
}

// Supporting Palette
export const SUPPORTING_COLORS = {
  PURE_WHITE: "#FFFFFF", // Primary background color and text on dark surfaces
  LIGHT_GRAY: "#F0F0F0", // Secondary backgrounds, dividers, and subtle UI elements
  DARK_GRAY: "#333333", // Primary text color for optimal readability
  SUCCESS_GREEN: "#28a745", // Confirmation messages and positive indicators
  ALERT_RED: "#dc3545", // Error states and critical notifications
}

// Semantic Colors (derived from primary and supporting colors)
export const SEMANTIC_COLORS = {
  // Text colors
  TEXT_PRIMARY: SUPPORTING_COLORS.DARK_GRAY,
  TEXT_SECONDARY: PRIMARY_COLORS.TOB_BLUE,
  TEXT_LIGHT: SUPPORTING_COLORS.PURE_WHITE,

  // Background colors
  BACKGROUND_PRIMARY: SUPPORTING_COLORS.PURE_WHITE,
  BACKGROUND_SECONDARY: SUPPORTING_COLORS.LIGHT_GRAY,

  // Interactive element colors
  INTERACTIVE_PRIMARY: PRIMARY_COLORS.TOB_BLUE,
  INTERACTIVE_SECONDARY: PRIMARY_COLORS.TOB_ORANGE,
  INTERACTIVE_HOVER: "#0069d9", // Darker blue for hover states

  // Status colors
  STATUS_SUCCESS: SUPPORTING_COLORS.SUCCESS_GREEN,
  STATUS_ERROR: SUPPORTING_COLORS.ALERT_RED,
  STATUS_WARNING: "#ffc107", // Warning yellow
  STATUS_INFO: "#17a2b8", // Info blue
}

// Gradient definitions
export const GRADIENTS = {
  BLUE_TO_ORANGE: `linear-gradient(135deg, ${PRIMARY_COLORS.TOB_BLUE} 0%, ${PRIMARY_COLORS.TOB_ORANGE} 100%)`,
  BLUE_LIGHT: `linear-gradient(135deg, ${PRIMARY_COLORS.TOB_BLUE} 0%, #4da3ff 100%)`,
  ORANGE_LIGHT: `linear-gradient(135deg, ${PRIMARY_COLORS.TOB_ORANGE} 0%, #ffab66 100%)`,
}

// Opacity variants for overlay and transparency effects
export const createOpacityVariant = (color: string, opacity: number) => {
  // Convert hex to rgba
  const r = Number.parseInt(color.slice(1, 3), 16)
  const g = Number.parseInt(color.slice(3, 5), 16)
  const b = Number.parseInt(color.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

// Export all colors as a single object for easy import
export const COLORS = {
  ...PRIMARY_COLORS,
  ...SUPPORTING_COLORS,
  ...SEMANTIC_COLORS,
  GRADIENTS,
}

export default COLORS
