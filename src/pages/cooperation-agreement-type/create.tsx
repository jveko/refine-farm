import { FC } from "react";
import { CooperationAgreementTypeForm, useCooperationAgreementTypeForm } from "@/features/cooperation-agreement-type";
import { RefineCreate } from "@/components/ui/refine";

export const CooperationAgreementTypeCreate: FC = () => {
  const form = useCooperationAgreementTypeForm({ action: "create" });
  return (
    <>
      <RefineCreate
        saveButtonProps={form.saveButtonProps}
        title={"Create Cooperation Agreement Type"}
      >
        <CooperationAgreementTypeForm form={form} />
      </RefineCreate>
    </>
  );
};

export default CooperationAgreementTypeCreate;
