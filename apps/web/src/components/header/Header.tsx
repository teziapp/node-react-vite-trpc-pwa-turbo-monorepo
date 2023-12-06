import { AppBar, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import SvgColor from "mui-components-tezi/SvgColor";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { HEADER, NAVBAR, isMobile } from "../../config";
import useOffSetTop from "../../hooks/useOffsetTop";
import useResponsive from "../../hooks/useResponsive";
import { bgBlur } from "../../utils/cssStyles";
import { isNavMiniState, isNavOpenState, pageTitleState } from "../../utils/recoilState";

export const Header = () => {
  const isDesktop = useResponsive();
  const theme = useTheme();
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT);
  const isNavMini = useRecoilValue(isNavMiniState);
  const setIsNavOpen = useSetRecoilState(isNavOpenState);
  const pageTitle = useRecoilValue(pageTitleState);

  const showMenuButton = !isDesktop || isMobile;
  
  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        color: theme.palette.getContrastText(theme.palette.background.default),
        height: HEADER.MOBILE_HEIGHT,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(!showMenuButton && {
          width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
          height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
          ...(isOffset && {
            height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAVBAR.DASHBOARD_MINI_WIDTH + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          // px: { lg: 5 },
        }}
      >
        {showMenuButton && (
          <IconButton onClick={() => setIsNavOpen(oldState => !oldState)} sx={{ mr: 1, color: 'text.primary' }}>
            <SvgColor iconFileName="menu-2-fill" />
          </IconButton>
        )}
        <Typography variant='h6'>{pageTitle}</Typography>
      </Toolbar>
    </AppBar>
  )
}