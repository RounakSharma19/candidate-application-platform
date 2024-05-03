import { JobListingPage } from "@pages";
import { routes } from "@constants";
import { Navigate, Route, Routes } from "react-router-dom";

/**
 * Main application router
 * @returns {Route Element}
 */
export const MainStackRouter = (): React.JSX.Element => {
  return (
    <>
      <Routes>
        <Route path={routes.JOBS}>
          <Route index element={<JobListingPage />} />
        </Route>
        <Route path="*" element={<Navigate to={routes.JOBS} replace />} />
      </Routes>
    </>
  );
};
