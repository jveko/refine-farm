import { AuthNotificationProvider } from "@/components/ui/auth-notification"
import { LoadingOutlined, LockOutlined, UserOutlined, WindowsOutlined } from "@ant-design/icons"
import {
  type HttpError,
  type LoginFormTypes,
  type LoginPageProps,
  useActiveAuthProvider,
  useLink,
  useRouterType,
} from "@refinedev/core"
import { useLogin, useRouterContext, useTranslate } from "@refinedev/core"
import {
  Alert,
  Button,
  Card,
  type CardProps,
  Checkbox,
  Col,
  Divider,
  Form,
  type FormProps,
  Input,
  Layout,
  type LayoutProps,
  Progress,
  Row,
  Space,
  Spin,
  Typography,
  theme,
} from "antd"
import React, { useState, useEffect, useRef } from "react"

import {
  BigtitleStyles,
  bodyStyles,
  buttonPrimaryStyles,
  containerStyles,
  formItemStyles,
  headStyles,
  inputStyles,
  layoutStyles,
  linkStyles,
  loadingOverlayStyles,
  logoContainerStyles,
  providerButtonStyles,
  titleStyles,
} from "./styles"

type LoginProps = LoginPageProps<LayoutProps, CardProps, FormProps>

/**
 * Enhanced login page with improved user experience and authentication feedback
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
  const { token } = theme.useToken()
  const [form] = Form.useForm<LoginFormTypes>()
  const translate = useTranslate()
  const routerType = useRouterType()
  const Link = useLink()
  const { Link: LegacyLink } = useRouterContext()
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginProgress, setLoginProgress] = useState(0)
  const progressTimerRef = useRef<number | null>(null)

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link

  const authProvider = useActiveAuthProvider()
  const { mutate: login, isLoading: isLoginLoading } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  })

  // Check for isLoggedOut query parameter
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const isLoggedOut = urlParams.get('isLoggedOut');
  //
  //   if (isLoggedOut === 'true') {
  //     authNotification.info("You've been successfully signed out");
  //
  //     // Remove the query parameter without refreshing the page
  //     const newUrl = window.location.pathname;
  //     window.history.replaceState({}, document.title, newUrl);
  //   }
  // }, []);

  // Update loading state based on login mutation
  useEffect(() => {
    setIsLoading(isLoginLoading)

    // Start progress animation when loading starts
    if (isLoginLoading && !progressTimerRef.current) {
      setLoginProgress(0)
      startProgressAnimation()
    } else if (!isLoginLoading && progressTimerRef.current) {
      // Stop progress animation when loading stops
      stopProgressAnimation()
      setLoginProgress(100)

      // Reset progress after animation completes
      setTimeout(() => {
        setLoginProgress(0)
      }, 500)
    }
  }, [isLoginLoading])

  // Clean up progress timer on unmount
  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        window.clearInterval(progressTimerRef.current)
      }
    }
  }, [])

  // Start progress animation
  const startProgressAnimation = () => {
    if (progressTimerRef.current) {
      window.clearInterval(progressTimerRef.current)
    }

    progressTimerRef.current = window.setInterval(() => {
      setLoginProgress((prev) => {
        // Slow down progress as it approaches 90%
        const increment = prev < 30 ? 5 : prev < 60 ? 3 : prev < 80 ? 1 : 0.5
        const newProgress = Math.min(prev + increment, 90)
        return newProgress
      })
    }, 300)
  }

  // Stop progress animation
  const stopProgressAnimation = () => {
    if (progressTimerRef.current) {
      window.clearInterval(progressTimerRef.current)
      progressTimerRef.current = null
    }
  }

  // Handle login errors
  const handleLoginError = (error: Error | HttpError) => {
    setLoginError(error?.message || "An error occurred during login")
    setIsLoading(false)
  }

  const handleLogin = (providerName?: string, values?: LoginFormTypes) => {
    setIsLoading(true)
    setLoginError(null)
    if (providerName) {
      login({ providerName })
    } else if (values) {
      login(values)
    }
  }

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
  )

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
  )

  const renderProviders = () => {
    // Default to Microsoft provider if none provided
    const defaultProviders =
      providers && providers.length > 0
        ? providers
        : [
            {
              name: "microsoft",
              label: "Sign in with Microsoft",
              icon: <WindowsOutlined />,
            },
          ]

    return (
      <>
        {defaultProviders.map((provider, i) => {
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
          )
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
    )
  }

  const CardContent = (
    <Card
      title={CardTitle}
      styles={{
        header: headStyles,
        body: bodyStyles,
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
          requiredMark={false}
          initialValues={{
            remember: true, // Default to remember me
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
                message: translate("pages.login.errors.requiredEmail", "Email is required"),
              },
              {
                type: "email",
                message: translate("pages.login.errors.validEmail", "Invalid email address"),
              },
            ]}
          >
            <Input
              size="large"
              placeholder={translate("pages.login.fields.email", "Email")}
              disabled={isLoading}
              style={inputStyles}
              prefix={<UserOutlined style={{ color: "rgba(255, 255, 255, 0.5)" }} />}
              autoComplete="email"
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
                message: translate("pages.login.errors.requiredPassword", "Password is required"),
              },
            ]}
          >
            <Input
              type="password"
              autoComplete="current-password"
              placeholder="●●●●●●●●"
              size="large"
              disabled={isLoading}
              style={inputStyles}
              prefix={<LockOutlined style={{ color: "rgba(255, 255, 255, 0.5)" }} />}
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
                {translate("pages.login.buttons.forgotPassword", "Forgot password?")}
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
                style={buttonPrimaryStyles}
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
            {translate("pages.login.buttons.noAccount", "Don't have an account?")}{" "}
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
  )

  return (
    <React.Fragment>
      {isLoading && (
        <div style={loadingOverlayStyles}>
          <Space direction="vertical" align="center">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: "#F07522" }} spin />} size="large" />
            <Typography.Text style={{ color: "white", marginTop: 16 }}>Signing you in...</Typography.Text>
            {loginProgress > 0 && (
              <div style={{ width: 200, marginTop: 16 }}>
                <Progress
                  percent={loginProgress}
                  status={loginProgress === 100 ? "success" : "active"}
                  showInfo={false}
                  strokeColor="#F07522"
                />
              </div>
            )}
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
    </React.Fragment>
  )
}
