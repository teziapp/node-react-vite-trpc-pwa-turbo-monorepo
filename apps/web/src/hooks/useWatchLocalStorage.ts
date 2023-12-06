import { useEffect, useState } from "react"
import { localCacheFunctions, localCacheItems } from "../utils/localCacheApi"

export const useWatchLocalStorage = <T>(key: keyof localCacheItems, defaultValue?: T) => {
  const cacheApiFunc = localCacheFunctions[key]
  const [value, setValue] = useState<T | null>(() => {
    if (cacheApiFunc) {
      if(cacheApiFunc.getItem()) return cacheApiFunc.getItem()
      else if (defaultValue) cacheApiFunc.createOrUpdate(defaultValue);
      return defaultValue || null;
    };

    // If Cache Api Function is not available
      const persisted = localStorage.getItem(key);
      if (persisted) return JSON.parse(persisted);
      else if (defaultValue) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
      return persisted
  });

  useEffect(() => {
    // onstorage = (e) => {
    const listener = (e: StorageEvent) => {
      // console.log('listener fired', {e}, e.storageArea)
      if (e.storageArea === localStorage && (e.key === key || e.key === '__all__')) {
        setValue(e.newValue ? JSON.parse(e.newValue): null);
      }
    };

    window.addEventListener('storage', listener);

    return () => {
      window.removeEventListener('storage', listener);
      // onstorage = null;
    };
  }, [key, cacheApiFunc]);

  return value;
}