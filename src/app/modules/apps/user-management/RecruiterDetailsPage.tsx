import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { RecruiterListWrapper } from "./users-list/RecruiterList";
import { CandidatesListWrapper } from "./users-list/CandidatesList";
import Add from "./form/Add";
import { KTCard } from "../../../../_metronic/helpers";

const RecruiterDetailsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="requirement"
          element={
            <>
              <PageTitle>Requirement</PageTitle>
              <RecruiterListWrapper />
            </>
          }
        />
        <Route
          path="requirement/add"
          element={
            <>
              <PageTitle>Add New</PageTitle>
              {/* <KTCard> */}
                <Add />
              {/* </KTCard> */}
            </>
          }
        />
        <Route
          path="requirement/candidatesDetails/:id"
          element={
            <>
              <PageTitle>Candidates Details</PageTitle>
              <CandidatesListWrapper />
            </>
          }
        />
      </Route>
      <Route
        index
        element={<Navigate to="/apps/requirement-Details/requirement" />}
      />
    </Routes>
  );
};

export default RecruiterDetailsPage;
