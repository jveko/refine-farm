import { RefineList } from "@/components/ui/refine";
import { CooperationAgreementTypeTable } from "@/features/cooperation-agreement-type";

export const CooperationAgreementTypeList: React.FC = () => {
  return (
    <>
      <RefineList title={"Cooperation Agreement Type"}>
        <CooperationAgreementTypeTable />
      </RefineList>
    </>
  );
};

export default CooperationAgreementTypeList;
