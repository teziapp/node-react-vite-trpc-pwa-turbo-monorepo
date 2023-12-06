// @mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ----------------------------------------------------------------------
type breakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export default function useResponsive(query?: 'up' | 'down' | 'between' | 'only', key?: breakPoints, start?: number | breakPoints, end?: number | breakPoints) {
  const theme = useTheme();

  if(!query || !key) {
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    return isDesktop;
  }

  if (query === 'up') {
    const mediaUp = useMediaQuery(theme.breakpoints.up(key));
    return mediaUp;
  }

  if (query === 'down') {
    const mediaDown = useMediaQuery(theme.breakpoints.down(key));
    return mediaDown;
  }

  if (query === 'between') {
    const mediaBetween = useMediaQuery(theme.breakpoints.between(start || key, end || key));
    return mediaBetween;
  }

  if (query === 'only') {
    const mediaOnly = useMediaQuery(theme.breakpoints.only(key));
    return mediaOnly;
  };

  return null;
}
