import type { AccountInfo } from "@azure/msal-browser"
import type { BaseKey, BaseRecord } from "@refinedev/core"

export interface IGetListResponse {
  data: BaseRecord[]
  totalData: number
}

export interface IAuth {
  isAuthenticated: boolean
  account: AccountInfo | undefined
  accessToken: string | undefined
  expiresOn: Date | undefined
}

export interface IToken {
  accessToken: string | undefined
  expiresOn: Date | undefined
}

export interface IUser {
  id: string
  name: string
  email: string
  avatar: string
}

export interface ICheckUser {
  user?: IUser
  status: "authorized" | "unauthorized" | "error"
  message?: string
}

export interface IResponseMutation {
  message: string
  status: string
  data?: IMutationCreate
}

export interface IMutationCreate {
  id: BaseKey
}

// -- Start Cooperation Agreement Type
export interface ICooperationAgreementTypeForm {
  name: string
  description: string
  departmentId: string
  classBusinessId: string
  isActive: boolean
}

export interface ICooperationAgreementTypeTable {
  id: number
  name: string
  description?: string
  department: string
  isActive: boolean
  totalAttachmentOptions: number
}

export interface ICooperationAgreementTypeTableFilter {
  q: string
  name: string
  description?: string
  department: string[]
  isActive: boolean
}

// -- End Cooperation Agreement Type
export interface IDepartmentOption {
  id: string
  name: string
}
