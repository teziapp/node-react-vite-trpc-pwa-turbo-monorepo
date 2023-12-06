// import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// import { MotionContainer, varBounce } from '../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));



// ----------------------------------------------------------------------

export const Page404 = () => {
  let locationNow = location.pathname;
  return (
      <RootStyle>
        <Container 
            // component={MotionContainer}
        >
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            {/* <m.div variants={varBounce().in}> */}
              <Typography variant="h3" paragraph>
                Sorry, page not found!
              </Typography>
            {/* </m.div> */}
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check
              your spelling.
            </Typography>
            <Typography >
              URL: {locationNow}
            </Typography>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Go to Home
            </Button>
          </Box>
        </Container>
      </RootStyle>
  );
}
