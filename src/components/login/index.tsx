import React, { useState, useEffect } from "react";
import {
  type LoginPageProps,
  type LoginFormTypes,
  useLink,
  useRouterType,
  useActiveAuthProvider,
  HttpError,
} from "@refinedev/core";
import {
  Row,
  Col,
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  type CardProps,
  type LayoutProps,
  Divider,
  type FormProps,
  theme,
  Spin,
  Alert,
  Space,
} from "antd";
import { useLogin, useTranslate, useRouterContext } from "@refinedev/core";
import { LoadingOutlined } from "@ant-design/icons";

import {
  BigtitleStyles,
  bodyStyles,
  containerStyles,
  headStyles,
  layoutStyles,
  titleStyles,
  logoContainerStyles,
  providerButtonStyles,
  loadingOverlayStyles,
} from "./styles";

type LoginProps = LoginPageProps<LayoutProps, CardProps, FormProps>;

/**
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#login} for more details.
 */
export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
  hideForm,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm<LoginFormTypes>();
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading: isLoginLoading } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  // Update loading state based on login mutation
  useEffect(() => {
    setIsLoading(isLoginLoading);
  }, [isLoginLoading]);

  // Handle login errors
  const handleLoginError = (error: Error | HttpError) => {
    setLoginError(error?.message || "An error occurred during login");
    setIsLoading(false);
  };

  const handleLogin = (providerName?: string, values?: LoginFormTypes) => {
    setIsLoading(true);
    setLoginError(null);
    
    if (providerName) {
      login(
        { providerName },
        {
          onError: (error) => handleLoginError(error),
        }
      );
    } else if (values) {
      login(
        values,
        {
          onError: (error) => handleLoginError(error),
        }
      );
    }
  };

  const PageTitle = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "32px",
        fontSize: "20px",
        color: "black",
      }}
    ></div>
  );

  const CardTitle = (
    <Row justify="center">
      <Typography.Title
        style={{
          color: "#fff",
          ...BigtitleStyles,
        }}
      >
        {translate("pages.login.title", "Welcome")}
      </Typography.Title>
      <Typography.Title
        level={4}
        style={{
          color: "#fff",
          marginTop: "2px",
          ...titleStyles,
        }}
      >
        {translate("pages.login.title", "Please sign in to your account")}
      </Typography.Title>
    </Row>
  );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          {providers.map((provider, i) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
                key={i}
              >
                <Button
                  key={provider.name}
                  type="default"
                  block
                  icon={provider.icon}
                  style={providerButtonStyles}
                  onClick={() => handleLogin(provider.name)}
                  disabled={isLoading}
                >
                  {provider.label}
                </Button>
              </div>
            );
          })}
          {!hideForm && (
            <Divider>
              <Typography.Text
                style={{
                  color: "rgba(255, 255, 255, 0.85)",
                }}
              >
                {translate("pages.login.divider", "or")}
              </Typography.Text>
            </Divider>
          )}
        </>
      );
    }
    return null;
  };

  const CardContent = (
    <Card
      title={CardTitle}
      styles={{
        header: headStyles,
        body: bodyStyles
      }}
      style={containerStyles}
      {...(contentProps ?? {})}
    >
      {loginError && (
        <Alert
          message="Login Error"
          description={loginError}
          type="error"
          showIcon
          style={{ marginBottom: "16px" }}
          closable
          onClose={() => setLoginError(null)}
        />
      )}
      
      {renderProviders()}
      
      {!hideForm && (
        <Form<LoginFormTypes>
          layout="vertical"
          form={form}
          onFinish={(values) => handleLogin(undefined, values)}
          requiredMark={false}
          initialValues={{
            remember: false,
          }}
          {...formProps}
        >
          <Form.Item
            name="email"
            label={
              <Typography.Text style={{ color: "white" }}>
                {translate("pages.login.fields.email", "Email")}
              </Typography.Text>
            }
            rules={[
              {
                required: true,
                message: translate(
                  "pages.login.errors.requiredEmail",
                  "Email is required"
                ),
              },
              {
                type: "email",
                message: translate(
                  "pages.login.errors.validEmail",
                  "Invalid email address"
                ),
              },
            ]}
          >
            <Input
              size="large"
              placeholder={translate("pages.login.fields.email", "Email")}
              disabled={isLoading}
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={
              <Typography.Text style={{ color: "white" }}>
                {translate("pages.login.fields.password", "Password")}
              </Typography.Text>
            }
            rules={[
              {
                required: true,
                message: translate(
                  "pages.login.errors.requiredPassword",
                  "Password is required"
                ),
              },
            ]}
          >
            <Input
              type="password"
              autoComplete="current-password"
              placeholder="●●●●●●●●"
              size="large"
              disabled={isLoading}
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            {rememberMe ?? (
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox
                  style={{
                    fontSize: "12px",
                    color: "white",
                  }}
                  disabled={isLoading}
                >
                  {translate("pages.login.buttons.rememberMe", "Remember me")}
                </Checkbox>
              </Form.Item>
            )}
            {forgotPasswordLink ?? (
              <ActiveLink
                style={{
                  color: "#F07522",
                  fontSize: "12px",
                  marginLeft: "auto",
                }}
                to="/forgot-password"
              >
                {translate(
                  "pages.login.buttons.forgotPassword",
                  "Forgot password?"
                )}
              </ActiveLink>
            )}
          </div>
          {!hideForm && (
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={isLoading}
                block
                style={{ 
                  borderRadius: "8px",
                  height: "48px",
                  backgroundColor: "#F07522",
                  borderColor: "#F07522"
                }}
              >
                {translate("pages.login.signin", "Sign in")}
              </Button>
            </Form.Item>
          )}
        </Form>
      )}

      {registerLink ?? (
        <div
          style={{
            marginTop: hideForm ? 16 : 8,
            textAlign: "center",
          }}
        >
          <Typography.Text style={{ fontSize: 12, color: "white" }}>
            {translate(
              "pages.login.buttons.noAccount",
              "Don't have an account?"
            )}{" "}
            <ActiveLink
              to="/register"
              style={{
                fontWeight: "bold",
                color: "#F07522",
              }}
            >
              {translate("pages.login.signup", "Sign up")}
            </ActiveLink>
          </Typography.Text>
        </div>
      )}
    </Card>
  );

  return (
    <>
      {isLoading && (
        <div style={loadingOverlayStyles}>
          <Space direction="vertical" align="center">
            <Spin 
              indicator={<LoadingOutlined style={{ fontSize: 40, color: "#F07522" }} spin />} 
              size="large"
            />
            <Typography.Text style={{ color: "white", marginTop: 16 }}>
              Signing you in...
            </Typography.Text>
          </Space>
        </div>
      )}
      
      <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
        <Row
          justify="center"
          align={hideForm ? "top" : "middle"}
          style={{
            padding: "16px 0",
            minHeight: "100dvh",
            paddingTop: hideForm ? "15dvh" : "16px",
          }}
        >
          <Col xs={22} sm={20} md={16} lg={12} xl={10}>
            {renderContent ? (
              renderContent(CardContent, PageTitle)
            ) : (
              <>
                {PageTitle}
                {CardContent}
              </>
            )}
          </Col>
        </Row>
      </Layout>
    </>
  );
};