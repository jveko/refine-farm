"use client";

import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import {
  Layout as AntdLayout,
  Space,
  theme,
  Typography,
} from "antd";
import React from "react";
const { Text } = Typography;
const { useToken } = theme;
export const HeaderContent: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  // const { data: session, status } = useSession();
  const { token } = useToken();

  // const { data: photo, isLoading: isLoadingPhoto } = useOne<IUserPhoto>({

  // })

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  return (
    <AntdLayout.Header style={headerStyles}>
      <Space>
        {/* {(session?.user?.name) && (
          <Space style={{ marginLeft: "8px" }} size="middle">
            {session?.user?.name && session?.user?.email &&
              <>
                <Text strong>
                  {session.user.name}
                </Text>
              </>
            }
            {!isLoadingPhoto && photo &&
              <Avatar src={photo?.data.avatar} alt={"Avatar"} />
            }
          </Space>
        )} */}
      </Space>
    </AntdLayout.Header>
  );
};
