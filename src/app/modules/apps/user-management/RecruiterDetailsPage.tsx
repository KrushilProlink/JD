import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { RecruiterListWrapper } from "./users-list/RecruiterList";
import { RecruiterCallListWrapper } from "./users-list/RecruiterCalList";
import Add from "./form/Add";
import { KTCard } from "../../../../_metronic/helpers";
import { QueryRequestProvider } from "./users-list/core/QueryRequestProvider";
import { QueryResponseProvider } from "./users-list/core/QueryResponseProvider";
import { ListViewProvider } from "./users-list/core/ListViewProvider";

const RecruiterDetailsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="recruiter"
          element={
            <>
              <PageTitle>Recruiter Details</PageTitle>
              <RecruiterListWrapper />
            </>
          }
        />
        <Route
          path="recruiter/add"
          element={
            <>
              <PageTitle>Add New</PageTitle>
              <QueryRequestProvider>
                <QueryResponseProvider>
                  <ListViewProvider>
                    <KTCard>
                      <Add />
                    </KTCard>
                  </ListViewProvider>
                </QueryResponseProvider>
              </QueryRequestProvider>
            </>
          }
        />
      </Route>
      <Route
        index
        element={<Navigate to="/apps/recruiter-Details/recruiter" />}
      />
    </Routes>
  );
};

export default RecruiterDetailsPage;
