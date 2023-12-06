import { Box, Drawer, Stack } from "@mui/material";
import { CloseButton, LogoutButton } from "mui-components-tezi";
import Scrollbar from "mui-components-tezi/scrollbar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import DocIllustration from "../../../assets/illustration_doc";
import { NAVBAR, isMobile } from "../../../config";
import useResponsive from "../../../hooks/useResponsive";
import { RouteObjectWithNavbar, routeObjectWithNavbarSettings } from "../../../router";
import { handleLogout } from "../../../utils/handleLogout";
import { isNavMiniState, isNavOpenState } from "../../../utils/recoilState";
import { NavToggleButton } from "./NavToggleButton";
import NavExpanded from "./navExpanded/NavExpanded";
import NavMini from "./navMini/NavMini";
import Logo from '/logo.svg';

type navbarObject = RouteObjectWithNavbar & {
  children: navbarObject[],
  path: string,
  title: string
}

export const NavVertical = () => {
  const isDesktop = useResponsive();
  const [isNavMini, setIsNavMini] = useRecoilState(isNavMiniState);
  const [openNav, setOpenNav] = useRecoilState(isNavOpenState);
  const pathname = useLocation();

  const onCloseNav = () => setOpenNav(false);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  // @ts-ignore
  const data: navbarObject[] = routeObjectWithNavbarSettings[0].children!.flatMap(group => (group.title && group.icon && group.path) ? group : []);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
        >
          <Box>
            <img src={Logo} className="logo" alt="Vite logo" />
          </Box>
          {(isMobile || !isDesktop) && 
            <CloseButton onClose={() => setOpenNav(false)} />
          }
        </Stack>
        {/* <NavAccount /> */}
      </Stack>
      <NavExpanded data={data} />
      <Box sx={{ flexGrow: 1 }} />
      <Stack
        spacing={3}
        sx={{
          px: 5,
          pb: 5,
          mt: 10,
          width: 1,
          textAlign: "center",
          display: "block",
        }}
      >
        <DocIllustration />
        <LogoutButton handleLogout={handleLogout} />  
      </Stack>
    </Scrollbar>
  );
  
  return (
    <Box
      component="nav"
      sx={{
        // flexShrink: { lg: 0 },
        width: { lg: isNavMini ? NAVBAR.DASHBOARD_MINI_WIDTH : NAVBAR.DASHBOARD_WIDTH },
      }}
    >
      <NavToggleButton isDesktop={isDesktop} isNavMini={isNavMini} setIsNavMini={setIsNavMini}/>
      {(isMobile || !isDesktop)
        ? <Drawer
            open={openNav}
            onClose={onCloseNav}
            ModalProps={{
              keepMounted: true,
            }}
            PaperProps={{
              sx: {
                width: NAVBAR.DASHBOARD_WIDTH,
              },
            }}
          >
            {renderContent}
          </Drawer>
        : <Drawer
            open
            variant="permanent"
            PaperProps={{
              sx: {
                bgcolor: 'transparent',
                borderRightStyle: 'dashed',
                width: isNavMini ? NAVBAR.DASHBOARD_MINI_WIDTH : NAVBAR.DASHBOARD_WIDTH,
                zIndex: 0,
              },
            }}
          >
            {isNavMini ? <NavMini data={data} /> : renderContent}
          </Drawer>
    }

    </Box>
  )
};