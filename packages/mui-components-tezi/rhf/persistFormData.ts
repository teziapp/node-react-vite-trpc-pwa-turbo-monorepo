import { useEffect } from "react"
import { FieldValues, UseFormGetValues } from "react-hook-form";

export const persistFormData = <T extends FieldValues>(location: string, getValues: UseFormGetValues<T>) => {
  useEffect(() => {
    const intervalFunc = setInterval(() => {
      localStorage.setItem(location, JSON.stringify(getValues()));
    }, 3000);

    return () => {
      clearInterval(intervalFunc);
    }
  }, [location, getValues])


  const getPersisted = (): T => {
    const persisted = localStorage.getItem(location);
    return persisted && JSON.parse(persisted);
  };
  
  const unPersist = () => localStorage.removeItem(location);

  return {
    getPersisted,
    unPersist
  };
}