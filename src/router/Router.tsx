import { JobListingPage } from "@pages";
import { routes } from "@constants";
import { Route, Routes } from "react-router-dom";

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
      </Routes>
    </>
  );
};
