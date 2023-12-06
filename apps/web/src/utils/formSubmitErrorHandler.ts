import { TRPCClientError } from "@trpc/client";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";
import { AppRouter } from "../../../api/src/trpc/router";
import { toastErrorSettings } from "../config";

export const formSubmitErrorHandler = <T extends FieldValues>(setError: UseFormSetError<T>) => (error: TRPCClientError<AppRouter>) => {
  try {
    console.error(error);
    const parsedError = error.message && JSON.parse(error.message)
    if(Array.isArray(parsedError)){
      parsedError.forEach((err) => err.path.forEach((path: Path<T>) => setError(path, {message: err.message})));
    };
  } catch {

  } finally {
    toast.error(error.message, toastErrorSettings);
    return;
  }
};