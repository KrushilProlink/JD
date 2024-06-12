import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { RecruiterListWrapper } from "./users-list/RecruiterList";
import { RecruiterCallListWrapper } from "./users-list/RecruiterCalList";

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
        {/* <Route
          path="callDetails/:id"
          element={
            <>
              <PageTitle>Recruiter Call Details</PageTitle>
              <RecruiterCallListWrapper />
            </>
          }
        /> */}
      </Route>
      <Route
        index
        element={<Navigate to="/apps/recruiter-Details/recruiter" />}
      />
    </Routes>
  );
};

export default RecruiterDetailsPage;
