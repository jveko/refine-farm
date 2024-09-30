import { Col, Form, FormProps, Input, Row, Select } from "antd";
import {
  ICooperationAgreementTypeTableFilter,
  IDepartmentOption,
} from "@/interfaces";
import { CrudFilter } from "@refinedev/core";
import { CrudSort } from "@refinedev/core";
import { useSelect } from "@refinedev/antd";
import { createStyles } from "antd-style";
import { TableToolbar } from "@/components";
import { useTableToolbar } from "@/hooks";

type Props = {
  searchFormProps: FormProps<ICooperationAgreementTypeTableFilter>;
  filters: CrudFilter[];
  sorters: CrudSort[];
  setSorters: (sorters: CrudSort[]) => void;
};
export const CooperationAgreementTypeTableToolbar = (props: Props) => {
  const { searchFormProps } = props;
  const { styles } = useStyles();
  const tableToolbar = useTableToolbar(props);
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
  });

  return (
    <TableToolbar {...tableToolbar}>
      <Form {...searchFormProps} layout={"horizontal"}>
        <Row>
          <Col xs={24} md={12}>
            <Form.Item label={"Name"} name={"name"} className={styles.formItem}>
              <Input placeholder={"Search Name"} onPressEnter={tableToolbar.search}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label={"Description"}
              name={"description"}
              className={styles.formItem}
            >
              <Input placeholder={"Search Description"} onPressEnter={tableToolbar.search} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label={"Department"}
              name={"department"}
              className={styles.formItem}
            >
              <Select
                {...departmentSelectProps}
                placeholder={"Select Department"}
                allowClear
                mode={"multiple"}
                onClear={tableToolbar.search}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label={"Status"}
              name={"isActive"}
              className={styles.formItem}
            >
              <Select
                allowClear
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
                placeholder={"Select Status"}
                onClear={tableToolbar.search}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </TableToolbar>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    formItem: {
      backgroundColor: token.colorBgContainer,
      padding: "4px 12px 0px 0px",
      margin: 0,
    },
  };
});
