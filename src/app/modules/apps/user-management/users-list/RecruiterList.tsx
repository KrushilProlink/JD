import { KTCard } from "../../../../../_metronic/helpers";
import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { RecruiterDetailsTable } from "./table/RecruiterDetailsTable";
import { UserEditModal } from "./user-edit-modal/UserEditModal";
// import ColspanTable from "./table/ColspanTable";

const RecruiterList = () => {
  const { itemIdForUpdate } = useListView();
  return (
    <>
      <KTCard>
        <RecruiterDetailsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <UserEditModal />}
    </>
  );
};

const RecruiterListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <RecruiterList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { RecruiterListWrapper };
