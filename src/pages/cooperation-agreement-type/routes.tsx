import { lazy } from "react"

const CooperationAgreementTypeCreate = lazy(() => import("@/pages/cooperation-agreement-type/create"))

const CooperationAgreementTypeEdit = lazy(() => import("@/pages/cooperation-agreement-type/edit"))

const CooperationAgreementTypeList = lazy(() => import("@/pages/cooperation-agreement-type/list"))

export const cooperationAgreementTypeRouter = [
  {
    path: "/cooperation-agreement-type",
    element: <CooperationAgreementTypeList />,
  },
  {
    path: "/cooperation-agreement-type/create",
    element: <CooperationAgreementTypeCreate />,
  },
  {
    path: "/cooperation-agreement-type/edit/:cooperationAgreementTypeId",
    element: <CooperationAgreementTypeEdit />,
  },
]
