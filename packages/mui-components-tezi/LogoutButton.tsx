import LoadingButton from '@mui/lab/LoadingButton';
import { Button } from "@mui/material";
import { useState } from "react";

export const LogoutButton = ({handleLogout, onClick}: {handleLogout: () => Promise<string | number | undefined>, onClick?: () => void}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleClick = () => {
    setIsLoggingOut(true);
    handleLogout().then(() => setIsLoggingOut(false));
    onClick?.();
  };

  return (
    <LoadingButton
      loading={isLoggingOut}
      component={Button}
      variant="contained"
      onClick={handleClick}
      color="error"
    >
      Logout
    </LoadingButton>
  )
}