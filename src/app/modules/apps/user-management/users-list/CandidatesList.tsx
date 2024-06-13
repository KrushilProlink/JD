import { KTCard } from "../../../../../_metronic/helpers";
import { CandidatesDetailsTable } from "./table/CandidatesDetailsTable";

const CandidatesList = () => {
  return (
    <>
      <KTCard>
        <CandidatesDetailsTable />
      </KTCard>
    </>
  );
};

const CandidatesListWrapper = () => (
  // <QueryRequestProvider>
  // <QueryResponseProvider>
  // <ListViewProvider>
  <CandidatesList />
  // </ListViewProvider>
  // </QueryResponseProvider>
  // </QueryRequestProvider>
);

export { CandidatesListWrapper };
