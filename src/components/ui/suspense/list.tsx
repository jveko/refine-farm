import { SkeletonList } from "@/components"
import type React from "react"
import { type PropsWithChildren, Suspense } from "react"

export const SuspenseList: React.FC<PropsWithChildren<{ fallback?: React.ReactNode }>> = ({ children, fallback }) => {
  return <Suspense fallback={fallback == undefined ? <Skeleton /> : fallback}>{children}</Suspense>
}

const Skeleton: React.FC = () => {
  return (
    <>
      <SkeletonList />
    </>
  )
}
