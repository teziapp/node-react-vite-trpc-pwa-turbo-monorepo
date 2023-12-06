import { T_CacheLastUpdateTimes } from "../components/InitialCacheLoading";
import { defaultThemeSettings } from "../config";
import { RouterOutputs } from "../trpc/trpc";
export class LocalCacheAPI<T> {
    cachedItem: T | null;
    keyName!: string;
    constructor(localStorageName: keyof localCacheItems) {
        this.keyName = localStorageName;
        const persisted = localStorage.getItem(localStorageName);
        if (!persisted || persisted === 'undefined' || persisted === 'null') {
            this.cachedItem = null;
        } else {
            this.cachedItem = JSON.parse(persisted) as T
        }
    }

    getItem() {
        return this.cachedItem;
    }

    createOrUpdate(newValue: any) {
        // console.log({newValue});
        // console.log(this, this.cachedItem);
        this.cachedItem = newValue
        this.persist();
    }

    deleteItem() {
        localStorage.removeItem(this.keyName);
        this.cachedItem = null;
    }

    private persist() {
      localStorage.setItem(this.keyName, JSON.stringify(this.cachedItem));
      window.dispatchEvent( new Event(this.keyName, {bubbles: true, cancelable: false}) );
    }
};

export const clearLocalCache = () => {
  Object.values(localCacheFunctions).forEach(localFunc => localFunc.deleteItem());
  localStorage.clear();
};

export type localCacheItems = {
  allCacheLastUpdateTime: number;
  cacheLastUpdateTimes: T_CacheLastUpdateTimes;
  themeSettings: typeof defaultThemeSettings;
  userObj: Omit<RouterOutputs['auth']['login'], 'token'>;
};

export const allCacheLastUpdateTimeCache = new LocalCacheAPI<localCacheItems['allCacheLastUpdateTime']>('allCacheLastUpdateTime');
export const cacheLastUpdateCache = new LocalCacheAPI<localCacheItems['cacheLastUpdateTimes']>('cacheLastUpdateTimes');
export const themeSettingsCache = new LocalCacheAPI<localCacheItems['themeSettings']>('themeSettings');
export const userObjCache = new LocalCacheAPI<localCacheItems['userObj']>('userObj');

export const localCacheFunctions = {
  allCacheLastUpdateTime: allCacheLastUpdateTimeCache,
  cacheLastUpdateTimes: cacheLastUpdateCache,
  themeSettings: themeSettingsCache,
  userObj: userObjCache
}