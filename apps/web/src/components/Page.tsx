import { Box, Typography, styled } from "@mui/material";
import { format } from "date-fns";
import { ErrorBoundaryWithSuspense } from "mui-components-tezi";
import { Fragment, forwardRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { HEADER, NAVBAR, isMobile } from "../config";
import { useWatchLocalStorage } from "../hooks/useWatchLocalStorage";
import { localCacheItems } from "../utils/localCacheApi";
import { isNavMiniState, pageTitleState } from "../utils/recoilState";
import { sseSubscription } from "../utils/sseSubscription";
import { InitialCacheLoading } from "./InitialCacheLoading";

let eventSource: EventSource | null = null;

export const Page = forwardRef((_props, ref) => {
  const isNavMini = useRecoilValue(isNavMiniState);
  const pageTitle = useRecoilValue(pageTitleState);
  const allCacheLastUpdateTime = useWatchLocalStorage<localCacheItems['allCacheLastUpdateTime']>('allCacheLastUpdateTime');
  const user = useWatchLocalStorage<localCacheItems['userObj']>('userObj');
  const { pathname } = useLocation();
  const [otherUsersOnline, setOtherUsersOnline] = useState<any>([]);
  // const [otherUsersOnline, setOtherUsersOnline] = useState<Omit<T_User_Online, 'res'>[] | null>([]);

  //Capitalise the string.
  const titleToShow = pageTitle.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const activeSubscription = user?.subscription_end_date && user.subscription_end_date >= format(new Date(), 'yyyy-MM-dd');
  
  const MainStyle = styled('main', {})(({ theme }) => ({
    flexGrow: 1,
    paddingTop: HEADER.MOBILE_HEIGHT + 10,
    paddingBottom: HEADER.MOBILE_HEIGHT + 24,
    [theme.breakpoints.up('md')]: !isMobile && {
      paddingLeft: 16, // + (isNavMini ? NAVBAR.DASHBOARD_MINI_WIDTH : NAVBAR.DASHBOARD_WIDTH),
      paddingRight: 16,
      paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 14,
      paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 14,
      width: `calc(100% - ${isNavMini ? NAVBAR.DASHBOARD_MINI_WIDTH : NAVBAR.DASHBOARD_WIDTH}px)`,
      transition: theme.transitions.create('margin-left', {
        duration: theme.transitions.duration.shorter,
      })
    },
  }));

  console.log({otherUsersOnline});

  useEffect(() => {
    console.log('Main.tsx useEffect Called.');
    console.log({otherUsersOnline, eventSource});
    if (activeSubscription && !eventSource) {
      const eS = sseSubscription(setOtherUsersOnline);
      eventSource = eS.eventSource;
      console.log({eventSource});
    };

    if(!activeSubscription) {
      console.log ('closing event source due to inactive subscription.')
      eventSource?.close();
      eventSource = null;
    };

    return () => {
      console.log('event source close due to Main.tsx unmounted.');
      eventSource?.close();
      eventSource = null;
    }
  },[activeSubscription, otherUsersOnline])

  return (
    <Fragment>
      <Helmet>
        <title>{titleToShow}</title>
        {/* {meta} */}
      </Helmet>
      <MainStyle>
        <Box display='flex' justifyContent='center' ref={ref} sx={{minHeight: '100vh'}}>
          <ErrorBoundaryWithSuspense>
            {
              user
                ? user.og_id
                  ? activeSubscription
                    ? otherUsersOnline?.length
                      ? <Typography>Users {otherUsersOnline.map((user :any) => user.user_id).join(', ')} are online.</Typography>
                      : (((allCacheLastUpdateTime || 0) + (5 * 60 * 1000)) > Date.now())
                        ? <Outlet />
                        : <InitialCacheLoading />
                    : <Typography> Your subscription has expired.</Typography>
                  : <Typography> Cant Find ownergroup </Typography>
                : (pathname === '/auth/signup' || pathname === '/auth/login')
                  ? <Outlet />
                  : <Navigate to="/auth/login" replace />
            }
          </ErrorBoundaryWithSuspense>
        </Box>
      </MainStyle>
    </Fragment>
  )
})