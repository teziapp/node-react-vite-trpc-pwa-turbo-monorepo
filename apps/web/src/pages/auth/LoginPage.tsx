import { Box, Card, Container, Stack, Typography, styled } from "@mui/material";
import Image from "mui-components-tezi/Image";
import useResponsive from "../../hooks/useResponsive";
import { LoginForm } from "./LoginForm";
import logo from '/logo.svg';

// ----------------------------------------------------------------------


const RootElement = styled(Container)(({theme}) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    }
}));

const HeaderStyle = styled('div')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    // position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7),
    },
}))

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    maxHeight: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '90vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------
  

export const Login = () => {
    const isDesktop = useResponsive();

    return (
        <RootElement>
            {isDesktop && (
                <SectionStyle>
                    <HeaderStyle>
                        <img src={logo} alt='logo' />
                    </HeaderStyle>
                    <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                        Hi, Welcome Back
                    </Typography>
                    <Image
                        // eslint-disable-next-line 
                        // @ts-ignore
                        visibleByDefault
                        alt="login"
                        src="/static/illustrations/illustration_login.png"
                    />
                </SectionStyle>
            )}
            <ContentStyle>
            
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom>
                        Sign in to Smart Brand
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                </Box>

                {/* <Tooltip title={capitalCase(method)} placement="right">
                    <>
                    <Image
                        disabledEffect
                        src={`https://minimal-assets-api.vercel.app/assets/icons/auth/ic_${method}.png`}
                        sx={{ width: 32, height: 32 }}
                    />
                    </>
                </Tooltip> */}
            </Stack>

            <LoginForm isDesktop={isDesktop}/>

            </ContentStyle>
        </RootElement>
    )
}