import { PaginationTotal } from "@/components"
import { useTable, type useTableProps } from "@/hooks"
import { sorterTable } from "@/utils/sorterTable"
import type { ICooperationAgreementTypeTable, ICooperationAgreementTypeTableFilter } from "@interfaces"
import { BooleanField } from "@refinedev/antd"
import type { HttpError } from "@refinedev/core"
import { Table } from "antd"
import React from "react"

type Props = useTableProps<ICooperationAgreementTypeTable, HttpError, unknown, ICooperationAgreementTypeTable>

export const CooperationAgreementTypeTable = (props: Props) => {
  const { tableProps, filters, sorters, searchFormProps, setSorters } = useTable<
    ICooperationAgreementTypeTable,
    HttpError,
    ICooperationAgreementTypeTableFilter
  >({
    ...props,
    resource: "cooperation-agreement-type",
    onSearch: (params) => {
      const { q, name, isActive, description, department } = params
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
          value: Array.isArray(department) && department.length === 0 ? undefined : department,
        },
      ]
    },
  })
  return (
    <>
      {/*<CooperationAgreementTypeTableToolbar*/}
      {/*  searchFormProps={searchFormProps}*/}
      {/*  filters={filters}*/}
      {/*  sorters={sorters}*/}
      {/*  setSorters={setSorters}*/}
      {/*/>*/}
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
        <Table.Column key="name" dataIndex="name" title={"Name"} {...sorterTable("name", sorters)} />
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
      </Table>
    </>
  )
}
