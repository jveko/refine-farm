import BackgroundLogin from "@/assets/background-login.jpg"
import LogoCompany from "@/assets/logo-tob.png"
import { LoginPage } from "@/components"
import { WindowsFilled } from "@ant-design/icons"
import { useMsal } from "@azure/msal-react"
import type { AuthProps } from "@refinedev/antd"
import { LoginFormTypes, useLogin, useNotification } from "@refinedev/core"
import { createStyles } from "antd-style"
import type React from "react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"

const authWrapperProps = {
  style: {
    background: `url(${BackgroundLogin}) center`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    transition: "all 0.3s ease",
  },
}

const renderAuthContent = (content: React.ReactNode) => {
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "15px",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          width: "45%",
          transition: "transform 0.3s ease",
          transform: "scale(1)",
        }}
      >
        <img
          src={LogoCompany}
          style={{
            width: "100%",
            height: "auto",
            paddingTop: "15px",
          }}
          alt="Company Logo"
        />
      </div>
      {content}
    </div>
  )
}

export const AuthPage: React.FC<AuthProps> = ({}) => {
  const { styles } = useStyles()
  return (
    <LoginPage
      wrapperProps={authWrapperProps}
      renderContent={(content) => renderAuthContent(content)}
      contentProps={{
        style: {
          backgroundColor: "rgba(10, 93, 154, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          padding: "30px",
          marginTop: "30px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
        },
        className: styles.card,
      }}
      hideForm={true}
      rememberMe={true}
      registerLink={false}
      forgotPasswordLink={false}
      providers={[
        {
          name: "microsoft",
          label: "Sign in with Microsoft",
          icon: <WindowsFilled />,
        },
      ]}
    />
  )
}

const useStyles = createStyles(({}) => {
  return {
    card: {
      ".ant-btn": {
        color: "#ffff",
        transition: "all 0.3s ease",
        "&:hover": {
          color: "black",
          transform: "translateY(-2px)",
          boxShadow: "0 5px 15px rgba(240, 117, 34, 0.4)",
        },
      },
    },
  }
})
