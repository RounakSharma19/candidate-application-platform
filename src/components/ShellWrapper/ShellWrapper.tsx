import React from "react";

import { Loader, Render } from "..";

type IProps = {
  /** prop for loading state */
  isLoading: boolean;
  /** prop for error state */
  isError: boolean;
  /** children to render */
  children: JSX.Element;
  /** prop for fetching state */
  isFetching?: boolean;
  /** loadable shell component for the page */
  loadableShell?: React.ReactNode;
  /** fetcher shell component for the page */
  fetchingShell?: React.ReactNode;
  /** Error shell component for the page */
  errorShell?: React.ReactNode;
};

export const ShellWrapper = (props: IProps): JSX.Element => {
  const {
    children,
    isError,
    isLoading,
    isFetching = false,
    fetchingShell = <Loader />,
    loadableShell = <Loader />,
    errorShell = <p>Error</p>,
  } = props;
  return (
    <>
      {/* Loading State */}
      <Render if={isLoading}>
        <>{loadableShell}</>
      </Render>

      {/* Fetching State */}
      <Render if={isFetching}>
        <>{fetchingShell}</>
      </Render>

      {/* Error State */}
      <Render if={isError}>
        <>{errorShell}</>
      </Render>

      {/* If not loading & no error , return children */}
      <Render if={!isLoading && !isError}>
        <>{children}</>
      </Render>
    </>
  );
};
