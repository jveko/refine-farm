import { useBack, useNavigation } from "@refinedev/core";
import React, { PropsWithChildren, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DeleteButton } from "@refinedev/antd";
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { CooperationAgreementTypeForm, useCooperationAgreementTypeForm } from "@/features/cooperation-agreement-type";
import { RefineEdit } from "@/components/ui/refine";

export const CooperationAgreementTypeEdit: React.FC<PropsWithChildren> = () => {
  useDocumentTitle("Edit Cooperation Agreement Type");
  const { list } = useNavigation();
  const back = useBack();
  const { cooperationAgreementTypeId } = useParams();
  const cooperationAgreementTypeIdInt = Number(cooperationAgreementTypeId ?? 0);
  useEffect(() => {
    if (!cooperationAgreementTypeId || isNaN(cooperationAgreementTypeIdInt)) list("cooperation-agreement-type");
  }, [back, cooperationAgreementTypeId, cooperationAgreementTypeIdInt, list]);
  const form = useCooperationAgreementTypeForm({
    action: "edit",
    recordItemId: cooperationAgreementTypeId,
  });

  return (
    <>
      <RefineEdit
        recordItemId={cooperationAgreementTypeId}
        saveButtonProps={form.saveButtonProps}
        title={"Edit Cooperation Agreement Type"}
        headerButtons={({ defaultButtons }) => (
          <>
            <DeleteButton
              recordItemId={cooperationAgreementTypeId}
              onSuccess={() => {
                list("cooperation-agreement-type");
              }}
            />
            {defaultButtons}
          </>
        )}
      >
        <CooperationAgreementTypeForm form={form} />
      </RefineEdit>
    </>
  );
};
export default CooperationAgreementTypeEdit;
