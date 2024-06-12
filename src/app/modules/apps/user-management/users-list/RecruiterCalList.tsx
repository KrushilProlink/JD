import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { UsersListHeader } from "./components/header/UsersListHeader";
import { RecruiterCallDetails } from "./table/RecruiterCallDetails";
import { UserEditModal } from "./user-edit-modal/UserEditModal";
import { KTCard } from "../../../../../_metronic/helpers";

const RecruiterCalList = () => {
  const { itemIdForUpdate } = useListView();
  return (
    <>
      <KTCard>
        <RecruiterCallDetails />
      </KTCard>
      {itemIdForUpdate !== undefined && <UserEditModal />}
    </>
  );
};

const RecruiterCallListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <RecruiterCalList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { RecruiterCallListWrapper };
