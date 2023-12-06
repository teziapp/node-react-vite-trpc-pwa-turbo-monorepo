import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { localdbStoresObj } from "../clientDb/localDb";
import { useWatchLocalStorage } from "../hooks/useWatchLocalStorage";
import { allCacheLastUpdateTimeCache, cacheLastUpdateCache } from "../utils/localCacheApi";

const cacheInitialState = { 
  dev_company: {lastUpdateTime: 0, label: "Dev Company"},
  project: {lastUpdateTime: 0, label: "Projects"},
  og: {lastUpdateTime: 0, label: "Owner Groups"},
};

export type T_CacheLastUpdateTimes = typeof cacheInitialState;

const checkCacheIsLatest = (tableType: keyof typeof localdbStoresObj) => {
  // const localDBCount = LocalDB[tableType].count();
  // const localMaxUpdatedAt = LocalDB[tableType]
  //   .orderBy('updated_at').last();

  // const remoteDataState = trpcFetch[tableType].countAndMaxUpdatedAt.query();

  // return Promise.all([localDBCount, localMaxUpdatedAt, remoteDataState])
  //   .then(values => (values[0]===values[2].count && values[1]?.updated_at===values[2].max_updated_at))
};

const updateLocalStoreTime = (key: keyof T_CacheLastUpdateTimes) => {

  const cacheLatestUpdateTimes = cacheLastUpdateCache.getItem();

  const newObj: T_CacheLastUpdateTimes = {
    ...(cacheLatestUpdateTimes ?? cacheInitialState),
    [key]: {
      label: cacheInitialState[key].label,
      lastUpdateTime: Date.now()
    }
  };

  cacheLastUpdateCache.createOrUpdate(newObj);

};

export const checkAndUpdateCache = (tableType: keyof typeof localdbStoresObj) => checkCacheIsLatest(tableType)
  /*
  .then(async(isLatest) => {
    // If not latest, Fetch fresh data & update the localdb.
    if(!isLatest) {
      const newData = await trpcFetch[tableType].getList.query()
      await LocalDB[tableType].clear();
      // below will give error in dev mode coz it will write the same data twice.
      // In prod coz we are clearing the data first, its a non-conflict.
      // @ts-ignore
      await LocalDB[tableType].bulkAdd(newData);
    };

    // For testing
    // await new Promise(resolve => setTimeout(resolve, (Math.random() * 5000)));
    
    updateLocalStoreTime(tableType);
    return;
  });
  */

export const InitialCacheLoading = () => {
  const cacheLastUpdateTimes = useWatchLocalStorage<T_CacheLastUpdateTimes>('cacheLastUpdateTimes', cacheInitialState);
  const [timeBefore5Min] = useState(Date.now() - (5 * 60 * 1000));

  const propertyUpdatedInLast5Min = (key: keyof T_CacheLastUpdateTimes) => {
    if(!cacheLastUpdateTimes) return false;
    return (cacheLastUpdateTimes[key].lastUpdateTime > timeBefore5Min);
  }

  const updateLocalCache = async () => {
    // setting devcompany
      /*
      if(!propertyUpdatedInLast5Min('dev_company')) {
        await trpcFetch.project.findFirst.query({
          columns: {},
          // orderBy: (),
          // where: eq(project_table.id, 2),
          with:{
            dev_company: {
              columns: {
                id: true,
                name: true
              }
            }
          }
        }).then(devCo => {
          devCompanyCache.createOrUpdate(devCo)
          updateLocalStoreTime('dev_company');
          return;
        });
      };
      */

    // setting data from local-db
      /*
      if(!propertyUpdatedInLast5Min('og')) await checkAndUpdateCache('og');
      if(!propertyUpdatedInLast5Min('project')) await checkAndUpdateCache('project');
      */
      return;

  };

  useEffect(() => {
    updateLocalCache().then(() => allCacheLastUpdateTimeCache.createOrUpdate(Date.now()));
  }, []);

  const cacheKeys = cacheLastUpdateTimes && (Object.keys(cacheLastUpdateTimes) as (keyof T_CacheLastUpdateTimes)[]);
  return (
    <Box>
      { 
        cacheKeys && cacheKeys.map((key) => (
          <Typography key={key}>{cacheLastUpdateTimes[key].label}: {propertyUpdatedInLast5Min(key) ? 'Done' : 'Loading...'}</Typography>
        ))
      }
    </Box>
  )
}