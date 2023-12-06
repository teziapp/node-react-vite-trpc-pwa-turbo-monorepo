import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// https://vite-pwa-org.netlify.app/frameworks/#type-declarations
import { LogoutButton } from "mui-components-tezi";
import { handleLogout } from "utils/handleLogout";
import { useRegisterSW } from 'virtual:pwa-register/react';
import { fe_version } from "../config";
import { trpc } from "../trpc/trpc";

export const ServiceWorkerUpdateDialog = () => {

  const refetchInterval = 60000; // 60 * 60 * 1000; // this is 1 hour (60 * 60 * 100)
  const { data } = trpc.version.useQuery(undefined, {
    refetchInterval,
  });

  let setIntervalId: string | number |NodeJS.Timeout;

  useEffect(() => () => {
    console.log(setIntervalId);
    clearInterval(setIntervalId);
  }, []);

  const location = useLocation();
  const locationNow = location.pathname.split('/');
  let updateAllowed = true;
  if(locationNow.length > 1){
      // console.log(location.length);
      updateAllowed = !(locationNow.includes("add-new") || locationNow.includes("edit"))
  };

  const {
    offlineReady: [offlineReady],// setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log(
        'SW Registered: ' + '\n' + 
        'active.onerror: ' + r?.active?.onerror  + '\n' + 
        'active.state: ' + r?.active?.state  + '\n' + 
        'active.scriptURL: ' + r?.active?.scriptURL  + '\n' + 
        'installing.onerror: ' + r?.installing?.onerror + '\n' + 
        'installing.state: ' + r?.installing?.state + '\n' + 
        'onupdatefound: ' + r?.onupdatefound  + '\n'
      )
      r && setInterval(() => {
        r.update();
      }, refetchInterval);
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  });

  console.log({data, offlineReady, needRefresh});

  const close = () => {
    // setOfflineReady(false)
    setNeedRefresh(false)
  };

  const forceLogout = fe_version < data?.force_logout_below_frontend_version!;
  const forceUpdate = forceLogout || fe_version < data?.force_update_below_frontend_version!

  return (
    <Dialog open={needRefresh && (updateAllowed || forceUpdate)}>
      <DialogTitle>An update is available!</DialogTitle>
      <DialogContent>
        <Typography>
          Your App has been updated. Update now to get new features.
        </Typography>
        {forceLogout && <Typography> You need to Logout.</Typography>}
      </DialogContent>
      <DialogActions>
        {!forceUpdate &&
          <Button 
            onClick={close}
          >
            Not Now
          </Button>
        }
        {forceLogout
          ? <LogoutButton handleLogout={handleLogout} onClick={() => updateServiceWorker(true)}/>
          : <Button 
              onClick={() => updateServiceWorker(true)}
            >
              Update
            </Button>
        }
      </DialogActions>
    </Dialog>
)
};