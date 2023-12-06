import { Box } from '@mui/material';
import { ErrorBoundaryWithSuspense } from 'mui-components-tezi';
import { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Page } from './Page';
import { Header } from './header/Header';
import { NavVertical } from './nav/navVertical/NavVertical';

export const DashboardLayout = () => {

  const { pathname } = useLocation();

  // Things to reset on route change.
  useEffect(() => {
    // Scroll to Top.
    window.scrollTo(0, 0);

  }, [pathname]);

  return (
    <Fragment>
      <Header />
      <Box
        sx={{
          display: { md: 'flex' },
          minHeight: { md: 1 },
        }}
      >
        <NavVertical />
        <ErrorBoundaryWithSuspense>
          <Page />
        </ErrorBoundaryWithSuspense>
        {/* <ServiceWorkerUpdateDialog /> */}
      </Box>
    </Fragment>
  )
}