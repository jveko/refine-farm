import React, { PropsWithChildren, Suspense } from "react";
import { SkeletonList } from "@/components";

export const SuspenseList: React.FC<PropsWithChildren<{ fallback?: React.ReactNode }>> = ({
  children,
  fallback
}) => {
  return <Suspense fallback={(fallback == undefined ? <Skeleton /> : fallback)}>{children}</Suspense>;
};

const Skeleton: React.FC = () => {
  return (
    <>
      <SkeletonList />
    </>
  );
};
