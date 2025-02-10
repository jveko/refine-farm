import { type AuthProps } from "@refinedev/antd";
import React, { useEffect } from "react";
import { WindowsFilled } from "@ant-design/icons";
import { createStyles } from "antd-style";
import { LoginPage } from "@/components";
import LogoCompany from "@/assets/logo-tob.png";
import BackgroundLogin from "@/assets/background-login.jpg";
import { LoginFormTypes, useLogin } from "@refinedev/core";
import { useSearchParams } from "react-router";

const authWrapperProps = {
  style: {
    background: `url(${BackgroundLogin}) center`,
    backgroundSize: "cover",
  },
};

const renderAuthContent = (content: React.ReactNode) => {
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center horizontally
        justifyContent: "center", // Center vertically
        paddingTop: "15px",
      }}
    >
      <img
        src={LogoCompany}
        style={{
          width: "25%",
          height: "auto",
          paddingTop: "15px",
        }}
      />
      {content}
    </div>
  );
};

export const AuthPage: React.FC<AuthProps> = ({ }) => {
  const { styles } = useStyles();

  const { mutate: login } = useLogin<LoginFormTypes>();
  var [params, setParams] = useSearchParams();

  useEffect(() => {
    if (params.has("isLoggedOut") && params.get("isLoggedOut") == "true") return;
    // login({
    //   providerName: "microsoft",
    // });
  }, [login, params]);

  return (
    <LoginPage
      wrapperProps={authWrapperProps}
      renderContent={renderAuthContent}
      contentProps={{
        style: {
          backgroundColor: "#0A5D9A",
          border: "#0A5D9A",
          borderRadius: "32px",
          padding: "30px",
          marginTop: "30px",
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
          label: "Microsoft",
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
        "&:hover": {
          color: "black",
        },
      },
    },
  };
});