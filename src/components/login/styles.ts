import type { CSSProperties } from "react"
import { COLORS, SPACING, TYPOGRAPHY } from "../../styles/theme"

// Access spacing values
const spacingValues = SPACING.SPACING

export const layoutStyles: CSSProperties = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  transition: "all 0.3s ease",
}

export const containerStyles: CSSProperties = {
  maxWidth: "420px",
  margin: "auto",
  padding: `${spacingValues.LG} ${spacingValues.XL}`,
  backgroundColor: `rgba(${Number.parseInt(COLORS.TOB_BLUE.slice(1, 3), 16)}, ${Number.parseInt(COLORS.TOB_BLUE.slice(3, 5), 16)}, ${Number.parseInt(COLORS.TOB_BLUE.slice(5, 7), 16)}, 0.9)`, // Slightly transparent Tob Blue
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
  borderRadius: SPACING.LAYOUT.BORDER_RADIUS.LG,
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
  border: "1px solid rgba(255, 255, 255, 0.1)",
}

export const headStyles: CSSProperties = {
  borderBottom: 0,
  padding: 0,
}

export const bodyStyles: CSSProperties = {
  padding: 0,
  marginTop: spacingValues.LG,
}

export const titleStyles: CSSProperties = {
  ...TYPOGRAPHY.TEXT_STYLES.BODY,
  textAlign: "center",
  marginBottom: 0,
  lineHeight: "32px",
  fontWeight: TYPOGRAPHY.FONT_WEIGHTS.BOLD,
  overflowWrap: "break-word",
  hyphens: "manual",
  textOverflow: "unset",
  whiteSpace: "pre-wrap",
  color: COLORS.PURE_WHITE,
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
}

export const BigtitleStyles: CSSProperties = {
  ...TYPOGRAPHY.HEADING_STYLES.H1,
  textAlign: "center",
  marginBottom: 0,
  lineHeight: "50px",
  fontWeight: TYPOGRAPHY.FONT_WEIGHTS.BOLD,
  overflowWrap: "break-word",
  hyphens: "manual",
  textOverflow: "unset",
  whiteSpace: "pre-wrap",
  WebkitTextStroke: `2px ${COLORS.TOB_ORANGE}`,
  fontSize: "3rem",
  color: COLORS.PURE_WHITE,
  textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
}

export const logoContainerStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: spacingValues.MD,
  transition: "transform 0.3s ease",
}

export const providerButtonStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: COLORS.TOB_ORANGE,
  color: COLORS.PURE_WHITE,
  border: "none",
  borderRadius: SPACING.LAYOUT.BORDER_RADIUS.MD,
  height: "48px",
  fontSize: TYPOGRAPHY.FONT_SIZES.BODY,
  fontWeight: TYPOGRAPHY.FONT_WEIGHTS.BOLD,
  // boxShadow: `0 4px 12px ${COLORS.createOpacityVariant(COLORS.TOB_ORANGE, 0.3)}`,
  transition: "all 0.3s ease",
}

export const loadingOverlayStyles: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  backdropFilter: "blur(5px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: SPACING.LAYOUT.Z_INDEX.OVERLAY,
  transition: "opacity 0.3s ease",
}

// Form-related styles
export const formItemStyles: CSSProperties = {
  marginBottom: spacingValues.MD,
}

export const inputStyles: CSSProperties = {
  borderRadius: SPACING.LAYOUT.BORDER_RADIUS.MD,
  height: "48px",
  fontSize: TYPOGRAPHY.FONT_SIZES.BODY,
}

export const buttonPrimaryStyles: CSSProperties = {
  backgroundColor: COLORS.TOB_ORANGE,
  borderColor: COLORS.TOB_ORANGE,
  borderRadius: SPACING.LAYOUT.BORDER_RADIUS.MD,
  height: "48px",
  fontSize: TYPOGRAPHY.FONT_SIZES.BODY,
  fontWeight: TYPOGRAPHY.FONT_WEIGHTS.BOLD,
  // boxShadow: `0 4px 12px ${COLORS.createOpacityVariant(COLORS.TOB_ORANGE, 0.3)}`,
}

export const linkStyles: CSSProperties = {
  color: COLORS.TOB_ORANGE,
  fontSize: TYPOGRAPHY.FONT_SIZES.SMALL,
  fontWeight: TYPOGRAPHY.FONT_WEIGHTS.MEDIUM,
}
