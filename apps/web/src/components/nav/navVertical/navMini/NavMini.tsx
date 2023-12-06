import { Box, Stack, SxProps } from "@mui/material";
import { memo } from "react";
import { NavListProps } from "../../types";
import NavList from "./NavList";
import { hideScrollbarX } from "../../../../utils/cssStyles";
import { NAVBAR } from "../../../../config";
import Logo from '/logo.svg';

type inputProps = {
  data: NavListProps[],
  sx?: SxProps
}

const NavMini = ({data, sx, ...other}: inputProps) => {
  
  return (
    <Stack
      alignItems="center"
      spacing={0.5}
      sx={{
        pb: 2,
        px: 0.75,
        height: 1,
        // position: 'fixed',
        width: NAVBAR.DASHBOARD_MINI_WIDTH,
        borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
        ...hideScrollbarX,
        ...sx
      }}
      {...other}
    >
      <Box
        sx={{
          py: 2
        }}
      >
        <img src={Logo} className="logo" alt="Vite logo" />
      </Box>
      {data.map((item) => (
        <NavList key={item.title + item.path} data={item} depth={1} />
      ))}
    </Stack>
  );
};

export default memo(NavMini);