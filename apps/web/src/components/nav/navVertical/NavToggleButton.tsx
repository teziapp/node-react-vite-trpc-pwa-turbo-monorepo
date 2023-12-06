import { IconButton, SxProps } from "@mui/material";
import SvgColor from "mui-components-tezi/SvgColor";
import { NAVBAR, isMobile } from "../../../config";

type inputProps = {
  isDesktop: boolean | null,
  isNavMini: boolean,
  setIsNavMini: React.Dispatch<React.SetStateAction<boolean>>,
  sx?: SxProps
};

export const NavToggleButton = ({isDesktop, isNavMini, setIsNavMini, sx, ...other}: inputProps) => {

  if(isMobile || !isDesktop) return null;

  return (
    <IconButton
      size="small"
      onClick={() => setIsNavMini(oldState => !oldState)}
      sx={{
        p: 0.5,
        top: 32,
        position: 'fixed',
        left: (isNavMini ? NAVBAR.DASHBOARD_MINI_WIDTH : NAVBAR.DASHBOARD_WIDTH) - 12,
        bgcolor: 'background.default',
        zIndex: (theme) => theme.zIndex.appBar + 1,
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
        '&:hover': {
          bgcolor: 'background.default',
        },
        ...sx,
      }}
      {...other}
    >
      <SvgColor
        iconFileName={isNavMini ? 'arrow-ios-forward-fill' : 'arrow-ios-back-fill'}
        sx={{
          height: 16,
          width: 16
        }}
      />
    </IconButton>
  );
}