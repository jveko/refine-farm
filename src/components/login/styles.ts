import type { CSSProperties } from "react";

export const layoutStyles: CSSProperties = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  transition: "all 0.3s ease",
};

export const containerStyles: CSSProperties = {
  maxWidth: "420px",
  margin: "auto",
  padding: "40px 50px",
  backgroundColor: "rgba(10, 93, 154, 0.9)", // Slightly transparent
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
  borderRadius: "16px",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
  border: "1px solid rgba(255, 255, 255, 0.1)",
};

export const headStyles: CSSProperties = {
  borderBottom: 0,
  padding: 0,
};

export const bodyStyles: CSSProperties = {
  padding: 0,
  marginTop: "32px",
};

export const titleStyles: CSSProperties = {
  textAlign: "center",
  marginBottom: 0,
  lineHeight: "32px",
  fontWeight: 700,
  overflowWrap: "break-word",
  hyphens: "manual",
  textOverflow: "unset",
  whiteSpace: "pre-wrap",
  color: "white",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
};

export const BigtitleStyles: CSSProperties = {
  textAlign: "center",
  marginBottom: 0,
  lineHeight: "50px",
  fontWeight: "bolder",
  overflowWrap: "break-word",
  hyphens: "manual",
  textOverflow: "unset",
  whiteSpace: "pre-wrap",
  WebkitTextStroke: "2px #F07522",
  fontSize: "3rem",
  color: "white",
  textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
};

export const logoContainerStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "24px",
  transition: "transform 0.3s ease",
};

export const providerButtonStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#F07522",
  color: "white",
  border: "none",
  borderRadius: "12px",
  height: "48px",
  fontSize: "16px",
  fontWeight: 600,
  boxShadow: "0 4px 12px rgba(240, 117, 34, 0.3)",
  transition: "all 0.3s ease",
};

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
  zIndex: 1000,
  transition: "opacity 0.3s ease",
};