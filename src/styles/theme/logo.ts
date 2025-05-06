/**
 * Tob Insurance Logo Implementation Guidelines
 *
 * This file defines the logo usage guidelines for Tob Insurance web applications
 * according to the comprehensive style guide.
 */

import type { CSSProperties } from "react"
import { COLORS } from "./colors"

// Logo sizes
export const LOGO_SIZES = {
  SMALL: "32px", // For mobile or compact displays
  MEDIUM: "40px", // Standard size (minimum height for digital applications)
  LARGE: "56px", // For featured placements
  XLARGE: "72px", // For hero sections or prominent displays
}

// Logo clearance (protected space)
export const LOGO_CLEARANCE = {
  // Maintain clearance of 1x height around all sides
  getClearanceStyle: (size: string = LOGO_SIZES.MEDIUM): CSSProperties => {
    return {
      padding: size,
    }
  },
}

// Logo variations
export const LOGO_VARIATIONS = {
  // Primary logo with gradient
  PRIMARY: {
    background: COLORS.GRADIENTS.BLUE_TO_ORANGE,
    tagline: true,
  },

  // Monochrome blue version
  BLUE: {
    color: COLORS.TOB_BLUE,
    tagline: true,
  },

  // Monochrome orange version
  ORANGE: {
    color: COLORS.TOB_ORANGE,
    tagline: true,
  },

  // White version for dark backgrounds
  WHITE: {
    color: COLORS.PURE_WHITE,
    tagline: true,
  },

  // Icon only version (no tagline)
  ICON_ONLY: {
    background: COLORS.GRADIENTS.BLUE_TO_ORANGE,
    tagline: false,
  },
}

// Logo placement guidelines
export const LOGO_PLACEMENT = {
  // Header placement
  HEADER: {
    position: "relative",
    height: LOGO_SIZES.MEDIUM,
    margin: "16px 0",
  } as CSSProperties,

  // Footer placement
  FOOTER: {
    position: "relative",
    height: LOGO_SIZES.SMALL,
    margin: "24px 0",
  } as CSSProperties,

  // Hero section placement
  HERO: {
    position: "relative",
    height: LOGO_SIZES.XLARGE,
    margin: "32px 0",
  } as CSSProperties,
}

// Logo with tagline style
export const LOGO_WITH_TAGLINE_STYLE = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as CSSProperties,

  tagline: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: "12px",
    fontWeight: 500,
    marginTop: "4px",
    color: "inherit",
  } as CSSProperties,
}

// Export all logo guidelines
export const LOGO = {
  SIZES: LOGO_SIZES,
  CLEARANCE: LOGO_CLEARANCE,
  VARIATIONS: LOGO_VARIATIONS,
  PLACEMENT: LOGO_PLACEMENT,
  WITH_TAGLINE: LOGO_WITH_TAGLINE_STYLE,
}

export default LOGO
