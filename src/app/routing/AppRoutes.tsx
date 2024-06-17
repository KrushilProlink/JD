/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "../App";
import { AuthPage, Logout, useAuth } from "../modules/auth";
import { ErrorsPage } from "../modules/errors/ErrorsPage";
import { AdminRoutes } from "./AdminRoutes";
import { RecruitmentHeadRoutes } from "./RecruitmentHeadRoutes";
import { TeamLeadRoutes } from "./TeamLeadRoutes";
import { ClientRoutes } from "./ClientRoutes";
import { RecruiterRoutes } from "./RecruiterRoutes";

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { BASE_URL } = import.meta.env;
interface UserDetails {
  token: string;
  userRole: string;
  userId: string;
}
const AppRoutes: FC = () => {
  const { currentUser } = useAuth();

  const userDetails: UserDetails | null = JSON.parse(
    localStorage.getItem("userDetails") || "null"
  );

  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
          {userDetails?.token && userDetails?.userRole === "recruiter" ? (
            <>
              <Route path="/*" element={<RecruiterRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : userDetails?.token && userDetails?.userRole === "admin" ? (
            <>
              <Route path="/*" element={<AdminRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : userDetails?.token &&
            userDetails?.userRole === "recruiter_head" ? (
            <>
              <Route path="/*" element={<RecruitmentHeadRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : userDetails?.token && userDetails?.userRole === "team_lead" ? (
            <>
              <Route path="/*" element={<TeamLeadRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : userDetails?.token && userDetails?.userRole === "client" ? (
            <>
              <Route path="/*" element={<ClientRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
