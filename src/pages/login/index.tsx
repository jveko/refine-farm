import { AuthPage, type AuthProps } from "@refinedev/antd";
import React from "react";
import { WindowsFilled } from "@ant-design/icons";
import { createStyles } from "antd-style";
import LogoCompany from "@/assets/logo-tob.png";
import BackgroundLogin from "@/assets/background-login.jpg";

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
        alignItems: "center",
        justifyContent: "center",
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

export const LoginPage: React.FC<AuthProps> = () => {
  const { styles } = useStyles();
  return (
    <AuthPage
      type="login"
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

const useStyles = createStyles(({ token }) => {
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
