import React from "react";
import { BooleanField, EditButton, ShowButton } from "@refinedev/antd";
import {
  ICooperationAgreementTypeTable,
  ICooperationAgreementTypeTableFilter,
} from "@/interfaces";
import { BaseRecord, HttpError } from "@refinedev/core";
import { Space, Table } from "antd";
import { PaginationTotal } from "@/components";
import { useTable, useTableProps } from "@/hooks";
import { CooperationAgreementTypeTableToolbar } from "./toolbar";
import { sorterTable } from "@/utils/sorterTable";

type Props = useTableProps<
  ICooperationAgreementTypeTable,
  HttpError,
  unknown,
  ICooperationAgreementTypeTable
>;

export const CooperationAgreementTypeTable = (props: Props) => {
  const { tableProps, filters, sorters, searchFormProps, setSorters } =
    useTable<
      ICooperationAgreementTypeTable,
      HttpError,
      ICooperationAgreementTypeTableFilter
    >({
      ...props,
      resource: "cooperation-agreement-type",
      onSearch: (params) => {
        const { q, name, isActive, description, department } = params;
        return [
          {
            field: "q",
            operator: "containss",
            value: q || undefined,
          },
          {
            field: "name",
            operator: "containss",
            value: name || undefined,
          },
          {
            field: "isActive",
            operator: "eq",
            value: isActive,
          },
          {
            field: "description",
            operator: "containss",
            value: description || undefined,
          },
          {
            field: "department",
            operator: "in",
            value:
              Array.isArray(department) && department.length === 0
                ? undefined
                : department,
          },
        ];
      },
    });
  return (
    <>
      <CooperationAgreementTypeTableToolbar
        searchFormProps={searchFormProps}
        filters={filters}
        sorters={sorters}
        setSorters={setSorters}
      />
      <Table
        {...tableProps}
        rowKey="id"
        size="small"
        scroll={{
          y: 500,
        }}
        pagination={{
          ...tableProps.pagination,
          showTotal: (total) => <PaginationTotal total={total} />,
          pageSizeOptions: [10, 20, 50, 100],
          showSizeChanger: true,
        }}
      >
        <Table.Column
          key="name"
          dataIndex="name"
          title={"Name"}
          {...sorterTable("name", sorters)}
        />
        <Table.Column
          key="description"
          dataIndex="description"
          title={"Description"}
          {...sorterTable("description", sorters)}
        />
        <Table.Column
          key={"department"}
          dataIndex={"department"}
          title={"Department"}
          {...sorterTable("department", sorters)}
        />
        <Table.Column
          key={"isActive"}
          dataIndex={"isActive"}
          title={"Is Active"}
          {...sorterTable("isActive", sorters)}
          render={(isActive: boolean) => <BooleanField value={isActive} />}
        />
        <Table.Column<ICooperationAgreementTypeTable>
          title={"Actions"}
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </>
  );
};
