import { type AuthProps } from "@refinedev/antd";
import React, { useEffect, useState } from "react";
import { WindowsFilled } from "@ant-design/icons";
import { createStyles } from "antd-style";
import { LoginPage } from "@/components";
import LogoCompany from "@/assets/logo-tob.png";
import BackgroundLogin from "@/assets/background-login.jpg";
import { LoginFormTypes, useLogin, useNotification } from "@refinedev/core";
import { useSearchParams } from "react-router";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { Alert, Typography, Space } from "antd";
import { FullScreenLoading } from "@/components/ui/loading";

const authWrapperProps = {
  style: {
    background: `url(${BackgroundLogin}) center`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    transition: "all 0.3s ease",
  },
};

const renderAuthContent = (content: React.ReactNode, errorMessage?: string) => {
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
          width: "25%",
          marginBottom: "20px",
          transition: "transform 0.3s ease",
          transform: "scale(1)",
          ":hover": {
            transform: "scale(1.05)",
          }
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
      {errorMessage && (
        <Alert
          message="Authentication Error"
          description={errorMessage}
          type="error"
          showIcon
          style={{ marginBottom: "20px", width: "100%" }}
          closable
        />
      )}
      {content}
    </div>
  );
};

export const AuthPage: React.FC<AuthProps> = ({ }) => {
  const { styles } = useStyles();
  const { open } = useNotification();
  const { mutate: login, isLoading: isLoginLoading } = useLogin<LoginFormTypes>();
  const [params, setParams] = useSearchParams();
  const { inProgress, accounts } = useMsal();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);
  const [showAutoLoginMessage, setShowAutoLoginMessage] = useState(false);

  // Check for error parameters in the URL
  useEffect(() => {
    if (params.has("error")) {
      const error = params.get("error");
      const errorDescription = params.get("error_description");
      
      if (error && errorDescription) {
        setErrorMessage(`${error}: ${errorDescription}`);
        
        open?.({
          type: "error",
          message: "Authentication Error",
          description: errorDescription,
        });
      }
    }
  }, [params, open]);

  // Auto-login if not logged out and not in the middle of an interaction
  useEffect(() => {
    // Don't auto-login if user just logged out
    if (params.has("isLoggedOut") && params.get("isLoggedOut") === "true") {
      setAutoLoginAttempted(true);
      return;
    }
    
    // Don't auto-login if we're in the middle of an interaction
    if (inProgress !== InteractionStatus.None) {
      return;
    }
    
    // Don't auto-login if we already have an error
    if (errorMessage) {
      setAutoLoginAttempted(true);
      return;
    }
    
    // Don't auto-login if we've already tried
    if (autoLoginAttempted) {
      return;
    }
    
    // Show auto-login message
    setShowAutoLoginMessage(true);
    
    // Auto-login with Microsoft
    const timer = setTimeout(() => {
      setAutoLoginAttempted(true);
      login({
        providerName: "microsoft",
      });
    }, 1500); // Short delay to allow the page to render and show the auto-login message
    
    return () => clearTimeout(timer);
  }, [login, params, inProgress, errorMessage, autoLoginAttempted]);

  // If we're showing the auto-login message or logging in, show the loading screen
  if (showAutoLoginMessage || isLoginLoading) {
    return (
      <FullScreenLoading
        message={showAutoLoginMessage ? "Signing you in automatically..." : "Authenticating..."}
        overlay={true}
      />
    );
  }

  return (
    <LoginPage
      wrapperProps={authWrapperProps}
      renderContent={(content) => renderAuthContent(content, errorMessage)}
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
  );
};

const useStyles = createStyles(({ }) => {
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
  };
});