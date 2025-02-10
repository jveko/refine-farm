import { BaseKey, BaseRecord } from "@refinedev/core";

export interface IUser {
  id: string;
  name: string;
  email: string;
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
