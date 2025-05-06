import type { IDepartmentOption } from "@/interfaces"
import { useSelect } from "@refinedev/antd"
import { Col, Form, Input, Row, Segmented, Select, Spin } from "antd"
import { createStyles } from "antd-style"
import type { useCooperationAgreementTypeForm } from "./useCooperationAgreementTypeForm"

type Props = {
  form: ReturnType<typeof useCooperationAgreementTypeForm>
}

export const CooperationAgreementTypeForm = (props: Props) => {
  const { styles } = useStyles()
  const { formProps, formLoading, action } = props.form
  const { selectProps: departmentSelectProps } = useSelect<IDepartmentOption>({
    resource: "department/option",
    sorters: [
      {
        field: "name",
        order: "asc",
      },
    ],
    debounce: 500,
    onSearch: (search) => [
      {
        field: "q",
        operator: "contains",
        value: search,
      },
    ],
    optionLabel: "name",
    optionValue: "id",
  })

  return (
    <>
      <Spin spinning={formLoading}>
        <Form {...formProps}>
          <Row>
            <Col xs={24}>
              <Form.Item
                label={"Name"}
                name="name"
                className={styles.formItem}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={"Department"}
                name="departmentId"
                className={styles.formItem}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select {...departmentSelectProps} allowClear disabled={action == "edit"} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={"Status"}
                name="isActive"
                className={styles.formItem}
                rules={[
                  {
                    required: true,
                  },
                ]}
                initialValue={action === "create" ? true : undefined}
              >
                <Segmented
                  options={[
                    {
                      label: "Active",
                      value: true,
                    },
                    {
                      label: "Inactive",
                      value: false,
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label={"Description"}
                name="description"
                className={styles.formItem}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.TextArea rows={6} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </>
  )
}
const useStyles = createStyles(({ token }) => {
  return {
    formItem: {
      backgroundColor: token.colorBgContainer,
      padding: "8px",
      margin: 0,
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
    },
  }
})
