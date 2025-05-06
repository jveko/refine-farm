import { LoadingOutlined } from "@ant-design/icons"
import { Space, Spin, Typography } from "antd"
import type { CSSProperties } from "react"

type Props = {
  message?: string
  overlay?: boolean
}

const overlayStyles: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  backdropFilter: "blur(5px)",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 0.3s ease",
}

export const FullScreenLoading = ({ message, overlay = false }: Props) => {
  const containerStyles: CSSProperties = overlay
    ? overlayStyles
    : {
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }

  return (
    <div style={containerStyles}>
      <Space direction="vertical" align="center" size="large">
        <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 40, color: "#F07522" }} spin />} />
        <Typography.Text
          style={{
            fontSize: 20,
            color: overlay ? "white" : "inherit",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          {message || "Loading..."}
        </Typography.Text>
      </Space>
    </div>
  )
}
