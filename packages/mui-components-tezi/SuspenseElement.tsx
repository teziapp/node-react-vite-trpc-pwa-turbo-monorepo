import { CircularProgress, styled } from "@mui/material";
import { Suspense, SuspenseProps } from "react";

const RootStyle = styled('div')(({ theme }) => ({
  width: "100%",
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 2),
}));

export const SuspenseWithFallbackProps = ({children, fallback=<CircularProgress />}: Partial<SuspenseProps>) => (
  <Suspense fallback={<RootStyle>{fallback}</RootStyle>}>
    {children}
  </Suspense>
);