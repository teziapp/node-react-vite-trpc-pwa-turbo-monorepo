import { toast } from "react-toastify";
import { LocalDB } from "../clientDb/localDb";
import { trpcFetch } from "../trpc/trpcFetch";
import { clearLocalCache } from "./localCacheApi";
import { toastErrorSettings, toastSuccessSettings } from "../config";

export const handleLogout = async () => {
  try {
    console.log("logout attempt");
    const cacheDel = LocalDB.delete().then(localdbDeleteRes => console.log({localdbDeleteRes}));
    const delRes = trpcFetch.auth.logout.query();
    clearLocalCache();
    return Promise.all([cacheDel, delRes]).then(() => toast.success('Logout succesfully.', toastSuccessSettings));
  }
  catch (error: any) {
    toast.error(error?.message, toastErrorSettings);
  }
}