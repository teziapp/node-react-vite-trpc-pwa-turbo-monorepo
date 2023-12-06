import { memo } from 'react';
// @mui
import { Box, SxProps, Theme } from '@mui/material';
//
import { StyledRootScrollbar, StyledScrollbar } from './styles';
import { Props } from 'simplebar-react';

// ----------------------------------------------------------------------

interface ScrollbarProps extends Props {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

function Scrollbar({ children, sx, ...other }: ScrollbarProps) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar 
        clickOnTrack={false} 
        // timeout={500} 
        sx={sx} 
        {...other}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
}

export default memo(Scrollbar);