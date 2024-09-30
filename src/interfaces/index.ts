import { BaseKey, BaseRecord } from "@refinedev/core";

export interface IUser {
  id: string;
  name: string;
  email: string;
  roles: IRole[];
  avatar: string;
}

export interface ICheckUser {
  user?: IUser;
  status: "authorized" | "unauthorized" | "error";
  message?: string;
}

export interface IResponseMutation {
  message: string;
  status: string;
  data?: IMutationCreate;
}

export interface IMutationCreate {
  id: BaseKey;
}

// -- Start Cooperation Agreement Type
export interface ICooperationAgreementType {
  name: string;
  description: string;
  departmentId: string;
  classBusinessId: string;
  isActive: boolean;
}
export interface ICooperationAgreementTypeForm {
  name: string;
  description: string;
  departmentId: string;
  classBusinessId: string;
  isActive: boolean;
}

export interface ICooperationAgreementTypeTable {
  id: number;
  name: string;
  description?: string;
  department: string;
  isActive: boolean;
  totalAttachmentOptions: number;
}

export interface ICooperationAgreementTypeTableFilter {
  q: string;
  name: string;
  description?: string;
  department: string[];
  isActive: boolean;
}
// -- End Cooperation Agreement Type

// -- Start Company Regulation Type
export interface ICompanyRegulationType {
  id: number;
  name: string;
  description: string;
  isArchived: boolean;
  sequenceOrder: number;
}
export interface ICompanyRegulationTypeTable {
  iconKey: any;
  id: number;
  name: string;
  description: string;
  isArchived: boolean;
  sequenceOrder: number;
  icon: string;
}

export interface ICompanyRegulationTypeTableFilter {
  q: string;
  name: string;
  description: string;
  isArchived: boolean;
  sequenceOrder: number;
}
// -- End Company Regulation Type

// -- Start Company Regulation Document
export interface ICompanyRegulationDocumentPagination {
  id: number;
  title: string;
  description?: string;
  department: string;
  status: string;
  lastDocumentVersionPublishedNo: string;
  lastDocumentVersionPublishedRevision: string;
  lastDocumentVersionPublishedDate: string;
}

export interface ICompanyRegulationDocumentPaginationFilter {
  q: string;
  title: string;
  description?: string;
  department: string;
  status: string;
  lastDocumentVersionPublishedNo: string;
  lastDocumentVersionPublishedRevision: string;
  lastDocumentVersionPublishedDate: string;
}

export interface ICompanyRegulationDocument extends BaseRecord {
  typeId: number;
  departmentId: string;
  title: string;
  description: string;
  status: string;
  isArchived: boolean;
}

export interface ICompanyRegulationDocumentForm {
  typeId: number;
  departmentId: string;
  title: string;
  description: string;
  status: string;
  isArchived: boolean;
}
// -- End Company Regulation Document

// -- Start Company Regulation Document Version
export interface ICompanyRegulationDocumentVersion {
  id: number;
  no: string;
  revision: string;
  description: string;
  isPublished: boolean;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedById: string;
  publishedAt: string;
  publishedBy: string;
  files: ICompanyRegulationDocumentVersionFile[];
}
export interface ICompanyRegulationDocumentVersionPagination {
  id: number;
  no: string;
  revision: string;
  description: string;
  isPublished: boolean;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedById: string;
  publishedAt: string;
  publishedBy: string;
  files: ICompanyRegulationDocumentVersionFile[];
}

export interface ICompanyRegulationDocumentVersionFile {
  name: string;
  blobName: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface ICompanyRegulationDocumentVersionPaginationFilter {
  q: string;
  name: string;
  description: string;
  isArchived: boolean;
  sequenceOrder: number;
}

export interface ICompanyRegulationDocumentVersionForm {
  documentId: number;
  title: string;
  description: string;
  documentVersionNo: string;
  documentVersionRevision: string;
  documentVersionDate: string;
  documentVersionStatus: string;
}

// -- End Company Regulation Document Version

export interface ICompanyRegulationDocumentVersionFileView {
  name: string;
  url: string;
}
export interface ICooperationAgreementConfigAttachmentOptionTable {
  id: number;
  name: string;
  description?: string;
  isRequired: boolean;
}

export interface ICooperationAgreementConfigAttachmentOptionForm {
  cooperationAgreementTypeId: BaseKey;
  name: string;
  description?: string;
  isRequired: boolean;
}

export interface ICompanyRegulationTypeForm {
  companyRegulationTypeId: BaseKey;
  name: string;
  description?: string;
  isRequired: boolean;
}

export interface ICompanyRegulationTypeTable {
  id: number;
  name: string;
  description?: string;
  isArchived: boolean;
}

export interface IDepartmentOption {
  id: string;
  name: string;
}

export interface IClassBusiness {
  id: string;
  name: string;
}

export interface ICompanyRegulationDocumentStatusOption {
  id: string;
  name: string;
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
