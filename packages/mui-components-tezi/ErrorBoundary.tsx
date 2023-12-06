import { Box, Button, Stack, Typography } from "@mui/material";
import { PropsWithChildren, useEffect } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { SuspenseWithFallbackProps } from "./SuspenseElement";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {

  const locationNow = location.pathname;
  // const errorReporter = useErrorReporter();
  // errorReporter(error);
  console.log("Error Fallback", {error})
  const navigate = useNavigate();

  useEffect(() => {
    if (error.status === 401) resetErrorBoundary();
  }, []);
  
  return (
    <Box className="error" color="red">
      <Box sx={{p:1}}>
        <Typography variant="h5">
          Something Went Wrong: 
        </Typography>
        <Typography variant="h6">
          Try to reload this page or restart the app
        </Typography>
        <Typography variant="body1">
          Please send the screenshot of this page to <a href="tel:9638051000">9638051000</a> or <a href="tel:7575806994">7575806994</a>
        </Typography>
        <Typography>
          {/* version: {fe_version} */}
        </Typography>
        <Stack 
          direction="row" 
          spacing={1} 
          sx={{
              position: "fixed",
              bottom: (theme) => theme.spacing(7),
              right: (theme) => theme.spacing(15)
              }}>
          <Button 
            variant="contained"
            onClick={()=>navigate(-1)}>
            Back
          </Button>
          <Button 
            variant="contained"
            onClick={()=>navigate(0)}>
            Reload
          </Button>
        </Stack>
        <Typography>
          url: {locationNow+window.location.search}
        </Typography>
      <Box m={1} p={0.5} sx={{overflow:"hidden"}}>
        <Typography>
          { error.customMessage?.length !== 0 ? error.customMessage : error.message ||""}
        </Typography>
        <Typography>
          {error.stack||""}
        </Typography>
      </Box>
      </Box>
      {/* <p>Something went wrong...</p>
      <pre>{error.message || ''}</pre>
      <pre>{error.stack.slice(0,120) || ''}</pre> */}
    </Box>
  );
}

export const ErrorBoundaryWithFallback = ({ children }: PropsWithChildren<unknown>) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    {children}
  </ErrorBoundary>
);

export const ErrorBoundaryWithSuspense = ({children}: PropsWithChildren<unknown>) => (
  <ErrorBoundaryWithFallback>
    <SuspenseWithFallbackProps>
      {children}
    </SuspenseWithFallbackProps>
  </ErrorBoundaryWithFallback>
);