import type { CSSProperties } from "react";

export const layoutStyles: CSSProperties = {};

export const containerStyles: CSSProperties = {
  maxWidth: "400px",
  margin: "auto",
  padding: "50px",
  backgroundColor: "black",
  boxShadow:
    "0px 2px 4px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 1px 2px rgba(0, 0, 0, 0.03)",
};

export const headStyles: CSSProperties = {
  borderBottom: 0,
  padding: 0,
};

export const bodyStyles: CSSProperties = { padding: 0, marginTop: "32px" };

export const titleStyles: CSSProperties = {
  textAlign: "center",
  marginBottom: 0,
  lineHeight: "32px",
  fontWeight: 700,
  overflowWrap: "break-word",
  hyphens: "manual",
  textOverflow: "unset",
  whiteSpace: "pre-wrap",

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
};