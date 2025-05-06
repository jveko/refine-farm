import type { ICooperationAgreementType, ICooperationAgreementTypeForm, IResponseMutation } from "@/interfaces"
import { notificationError } from "@/utils/notificationError"
import { useForm } from "@refinedev/antd"
import type { BaseKey, HttpError, UseFormProps } from "@refinedev/core"

type TQueryFnData = ICooperationAgreementType
type TError = HttpError
type TVariables = ICooperationAgreementTypeForm
type TResponse = IResponseMutation
type Props = {
  companyRegulationTypeId?: number
  recordItemId?: BaseKey
} & UseFormProps<TQueryFnData, TError, TVariables, TQueryFnData, TResponse, TError>

export const useCooperationAgreementTypeForm = (props: Props) => {
  const resource = "cooperation-agreement-type"
  const form = useForm<TQueryFnData, TError, TVariables, TQueryFnData, TResponse, TError>({
    ...props,
    resource: resource,
    action: props.action,
    id: props.recordItemId,
    redirect: "edit",
    successNotification: () => {
      return {
        description: "Operation Successful",
        message: "Cooperation Agreement Type has been successfully created",
        type: "success",
      }
    },
    errorNotification: notificationError,
  })
  return {
    ...form,
    resource,
    action: props.action,
    recordItemId: props.recordItemId,
  }
}
