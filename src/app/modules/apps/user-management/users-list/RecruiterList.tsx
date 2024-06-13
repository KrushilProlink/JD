import { KTCard } from "../../../../../_metronic/helpers";
import { RecruiterDetailsTable } from "./table/RecruiterDetailsTable";
// import ColspanTable from "./table/ColspanTable";

const RecruiterList = () => {
  return (
    <>
      <KTCard>
        <RecruiterDetailsTable />
      </KTCard>
    </>
  );
};

const RecruiterListWrapper = () => <RecruiterList />;

export { RecruiterListWrapper };
