import React, { FC, useState } from "react";
import { CanAccessProps } from "@refinedev/core";
import { CanAccess, useGo, useNavigation, useRouterType, useTranslate } from "@refinedev/core";
import { Button, Result, Space, Tooltip, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

type CanAccessRouteProps = CanAccessProps;
export const CanAccessRoute: FC<CanAccessRouteProps> = (props: CanAccessRouteProps) => {
  const { ...rest } = props;
  return (
    <CanAccess {...rest} fallback={<FallBack />}>
      {props.children}
    </CanAccess>
  );
}

const FallBack = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const translate = useTranslate();
  const { push } = useNavigation();
  const go = useGo();
  const routerType = useRouterType();
  return (
    <Result
      status="403"
      title="Forbidden"
      extra={
        <Space direction="vertical" size="large">
          <Space>
            <Typography.Text>
              {"Sorry, you don't have access to this page."}
            </Typography.Text>
            {errorMessage && (
              <Tooltip title={errorMessage}>
                <InfoCircleOutlined data-testid="error-component-tooltip" />
              </Tooltip>
            )}
          </Space>
          <Button
            type="primary"
            onClick={() => {
              if (routerType === "legacy") {
                push("/");
              } else {
                go({ to: "/" });
              }
            }}
          >
            {translate("pages.error.backHome", "Back Home")}
          </Button>
        </Space>
      }
    />
  );
}