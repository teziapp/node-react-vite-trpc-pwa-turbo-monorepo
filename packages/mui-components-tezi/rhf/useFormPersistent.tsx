import { DefaultValues, FieldValues, UseFormProps, useForm } from "react-hook-form";
import { FormProvider } from "./FormProvider";
import { persistFormData } from "./persistFormData";

export const useFormPersistent = <T extends FieldValues>(props?: UseFormProps<T>) => {

  const location = window.location.href.split('?')[0];
  const persistedString = localStorage.getItem(location);
  const persistedData: DefaultValues<T> | null = persistedString && JSON.parse(persistedString);

  const methods = useForm<T>({
    shouldFocusError: true,
    mode: "onBlur",
    reValidateMode: "onChange",
    ...props,
    defaultValues: persistedData ?? (props?.defaultValues),
  });
  
  const CustomFormProvider = FormProvider<T>;

  const { getPersisted, unPersist } = persistFormData<T>(location, methods.getValues);
  
  return {
    ...methods, FormProvider: CustomFormProvider, getPersisted, unPersist
  };
};