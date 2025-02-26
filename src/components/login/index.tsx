import React from "react";
import {
  type LoginPageProps,
  type LoginFormTypes,
  useLink,
  useRouterType,
  useActiveAuthProvider,
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
} from "antd";
import { useLogin, useTranslate, useRouterContext } from "@refinedev/core";

import {
  BigtitleStyles,
  bodyStyles,
  containerStyles,
  headStyles,
  layoutStyles,
  titleStyles,
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

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const authProvider = useActiveAuthProvider();
  const { mutate: login } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

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
    <Row justify={"center"}>
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
                  marginBottom: "8px",
                }}
                key={i}
              >
                <Button
                  key={provider.name}
                  type="default"
                  block
                  icon={provider.icon}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "80%",
                    marginBottom: "8px",
                    backgroundColor: "#F07522",
                    border: "#F07522",
                    borderRadius: "20px",
                  }}
                  onClick={() =>
                    login({
                      providerName: provider.name,
                    })
                  }
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
                  color: token.colorTextLabel,
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
        header:headStyles,
        body:bodyStyles
      }}
      style={{
        ...containerStyles,
        backgroundColor: "black",
      }}
      {...(contentProps ?? {})}
    >
      {renderProviders()}
      {!hideForm && (
        <Form<LoginFormTypes>
          layout="vertical"
          form={form}
          onFinish={(values) => login(values)}
          requiredMark={false}
          initialValues={{
            remember: false,
          }}
          {...formProps}
        >
          <Form.Item
            name="email"
            label={translate("pages.login.fields.email", "Email")}
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
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={translate("pages.login.fields.password", "Password")}
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
                  }}
                >
                  {translate("pages.login.buttons.rememberMe", "Remember me")}
                </Checkbox>
              </Form.Item>
            )}
            {forgotPasswordLink ?? (
              <ActiveLink
                style={{
                  color: token.colorPrimaryTextHover,
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
                loading={true}
                block
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
          }}
        >
          <Typography.Text style={{ fontSize: 12 }}>
            {translate(
              "pages.login.buttons.noAccount",
              "Don’t have an account?"
            )}{" "}
            <ActiveLink
              to="/register"
              style={{
                fontWeight: "bold",
                color: token.colorPrimaryTextHover,
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
        <Col xs={22}>
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
  );
};