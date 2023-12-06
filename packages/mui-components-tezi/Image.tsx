import { LazyLoadImage } from 'react-lazy-load-image-component';
// @mui
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

type inputProps = BoxProps & {
  ratio?: keyof typeof ratioObj,
};

//comments

export default function Image({ ratio, sx, ...other }: inputProps) {
  if (ratio) {
    return (
      <Box
        component="span"
        sx={{
          width: 1,
          lineHeight: 0,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          pt: getRatio(ratio),
          '& .wrapper': {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            lineHeight: 0,
            position: 'absolute',
            backgroundSize: 'cover !important',
          },
          ...sx,
        }}
      >
        <Box
          component={LazyLoadImage}
          wrapperClassName="wrapper"
          placeholderSrc="https://zone-assets-api.vercel.app/assets/img_placeholder.svg"
          sx={{ width: 1, height: 1, objectFit: 'cover' }}
          {...other}
        />
      </Box>
    );
  }

  return (
    <Box
      component="span"
      sx={{
        lineHeight: 0,
        display: 'block',
        overflow: 'hidden',
        '& .wrapper': { width: 1, height: 1, backgroundSize: 'cover !important' },
        ...sx,
      }}
    >
      <Box
        component={LazyLoadImage}
        wrapperClassName="wrapper"
        placeholderSrc="https://zone-assets-api.vercel.app/assets/img_placeholder.svg"
        sx={{ width: 1, height: 1, objectFit: 'cover' }}
        {...other}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

const ratioObj = {
  '4/3': 'calc(100% / 4 * 3)',
  '3/4': 'calc(100% / 3 * 4)',
  '6/4': 'calc(100% / 6 * 4)',
  '4/6': 'calc(100% / 4 * 6)',
  '16/9': 'calc(100% / 16 * 9)',
  '9/16': 'calc(100% / 9 * 16)',
  '21/9': 'calc(100% / 21 * 9)',
  '9/21': 'calc(100% / 9 * 21)',
  '1/1': '100%',
}

function getRatio(ratio: keyof typeof ratioObj = '1/1') {
  return ratioObj[ratio];
}
