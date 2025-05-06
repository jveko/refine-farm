/**
 * Tob Insurance Typography System
 *
 * This file defines the typography styles for Tob Insurance web applications
 * according to the comprehensive style guide.
 */

import type { CSSProperties } from "react"

// Font families
export const FONT_FAMILIES = {
  PRIMARY: 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  SECONDARY:
    '"VAG Rounded Std", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}

// Font weights
export const FONT_WEIGHTS = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  BOLD: 700,
}

// Font sizes
export const FONT_SIZES = {
  H1: "32px",
  H2: "28px",
  H3: "24px",
  H4: "20px",
  H5: "18px",
  H6: "16px",
  BODY: "16px",
  SMALL: "14px",
  CAPTION: "12px",
}

// Line heights
export const LINE_HEIGHTS = {
  H1: "40px",
  H2: "36px",
  H3: "32px",
  H4: "28px",
  H5: "24px",
  H6: "22px",
  BODY: "24px",
  SMALL: "20px",
  CAPTION: "16px",
}

// Letter spacing
export const LETTER_SPACING = {
  H1: "-0.5px",
  H2: "-0.25px",
  H3: "normal",
  H4: "normal",
  H5: "normal",
  H6: "normal",
  BODY: "normal",
  SMALL: "normal",
  CAPTION: "normal",
}

// Heading styles
export const HEADING_STYLES = {
  H1: {
    fontFamily: FONT_FAMILIES.PRIMARY,
    fontSize: FONT_SIZES.H1,
    lineHeight: LINE_HEIGHTS.H1,
    fontWeight: FONT_WEIGHTS.BOLD,
    letterSpacing: LETTER_SPACING.H1,
  } as CSSProperties,

  H2: {
    fontFamily: FONT_FAMILIES.PRIMARY,
    fontSize: FONT_SIZES.H2,
    lineHeight: LINE_HEIGHTS.H2,
    fontWeight: FONT_WEIGHTS.BOLD,
    letterSpacing: LETTER_SPACING.H2,
  } as CSSProperties,

  H3: {
    fontFamily: FONT_FAMILIES.PRIMARY,
    fontSize: FONT_SIZES.H3,
    lineHeight: LINE_HEIGHTS.H3,
    fontWeight: FONT_WEIGHTS.BOLD,
  } as CSSProperties,

  H4: {
    fontFamily: FONT_FAMILIES.PRIMARY,
    fontSize: FONT_SIZES.H4,
    lineHeight: LINE_HEIGHTS.H4,
    fontWeight: FONT_WEIGHTS.BOLD,
  } as CSSProperties,

  H5: {
    fontFamily: FONT_FAMILIES.PRIMARY,
    fontSize: FONT_SIZES.H5,
    lineHeight: LINE_HEIGHTS.H5,
    fontWeight: FONT_WEIGHTS.BOLD,
  } as CSSProperties,

  H6: {
    fontFamily: FONT_FAMILIES.PRIMARY,
    fontSize: FONT_SIZES.H6,
    lineHeight: LINE_HEIGHTS.H6,
    fontWeight: FONT_WEIGHTS.BOLD,
  } as CSSProperties,
}

// Text styles
export const TEXT_STYLES = {
  BODY: {
    fontFamily: FONT_FAMILIES.PRIMARY,
    fontSize: FONT_SIZES.BODY,
    lineHeight: LINE_HEIGHTS.BODY,
    fontWeight: FONT_WEIGHTS.REGULAR,
  } as CSSProperties,

  BODY_BOLD: {
    fontFamily: FONT_FAMILIES.PRIMARY,
    fontSize: FONT_SIZES.BODY,
    lineHeight: LINE_HEIGHTS.BODY,
    fontWeight: FONT_WEIGHTS.BOLD,
  } as CSSProperties,

  SMALL: {
    fontFamily: FONT_FAMILIES.PRIMARY,
    fontSize: FONT_SIZES.SMALL,
    lineHeight: LINE_HEIGHTS.SMALL,
    fontWeight: FONT_WEIGHTS.LIGHT,
  } as CSSProperties,

  CAPTION: {
    fontFamily: FONT_FAMILIES.PRIMARY,
    fontSize: FONT_SIZES.CAPTION,
    lineHeight: LINE_HEIGHTS.CAPTION,
    fontWeight: FONT_WEIGHTS.LIGHT,
  } as CSSProperties,

  FEATURED: {
    fontFamily: FONT_FAMILIES.SECONDARY,
    fontSize: FONT_SIZES.H3,
    lineHeight: LINE_HEIGHTS.H3,
    fontWeight: FONT_WEIGHTS.BOLD,
  } as CSSProperties,
}

// Export all typography styles as a single object for easy import
export const TYPOGRAPHY = {
  FONT_FAMILIES,
  FONT_WEIGHTS,
  FONT_SIZES,
  LINE_HEIGHTS,
  LETTER_SPACING,
  HEADING_STYLES,
  TEXT_STYLES,
}

export default TYPOGRAPHY
