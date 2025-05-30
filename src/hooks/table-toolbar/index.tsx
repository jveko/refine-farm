import type { CrudFilter, CrudSort } from "@refinedev/core"
import type { FormProps } from "antd"
import { useEffect, useRef, useState } from "react"

type Props<T> = {
  searchFormProps: FormProps<T>
  filters: CrudFilter[]
  sorters: CrudSort[]
  setSorters: (sorters: CrudSort[]) => void
}

export const useTableToolbar = <T extends object>(props: Props<T>) => {
  const { searchFormProps, filters, sorters, setSorters } = props
  const [activeFilter, setActiveFilter] = useState<number>(0)
  const [activeSorter, setActiveSorter] = useState<number>(0)
  const refSearchButton = useRef<HTMLButtonElement>(null)
  const search = () => {
    searchFormProps.form?.submit()
    refSearchButton.current?.focus()
    setResetFilter()
  }
  useEffect(() => {
    setResetFilter()
  }, [filters])
  useEffect(() => {
    setResetSorter()
  }, [sorters])
  const resetFilter = () => {
    searchFormProps.form?.resetFields()
    searchFormProps.form?.submit()
  }
  const resetSorter = () => {
    setSorters([])
  }
  const getActiveFilter = () => {
    if (!searchFormProps.form?.getFieldsValue()) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values: any = searchFormProps.form?.getFieldsValue()
    let count = 0
    for (const key in values) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!(values[key] === undefined || values[key] === null || values[key] === "" || values[key].length === 0)) {
        console.log("active", key)
        count++
      }
    }
    return count
  }
  const getActiveSorter = () => {
    return sorters.length
  }
  const setResetFilter = () => {
    const count = getActiveFilter()
    if (typeof count === "number") {
      setActiveFilter(count)
    }
  }
  const setResetSorter = () => {
    const count = getActiveSorter()
    setActiveSorter(count)
  }
  return {
    searchFormProps,
    search,
    activeFilter,
    activeSorter,
    resetFilter,
    resetSorter,
    refSearchButton,
  }
}
