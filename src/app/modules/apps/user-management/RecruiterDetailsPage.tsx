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
          path="recruiter"
          element={
            <>
              <PageTitle>Requirement Details</PageTitle>
              <RecruiterListWrapper />
            </>
          }
        />
        <Route
          path="recruiter/add"
          element={
            <>
              <PageTitle>Add New</PageTitle>
              <KTCard>
                <Add />
              </KTCard>
            </>
          }
        />
        <Route
          path="recruiter/candidatesDetails/:id"
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
        element={<Navigate to="/apps/recruiter-Details/recruiter" />}
      />
    </Routes>
  );
};

export default RecruiterDetailsPage;
