import { FieldValues, UseFormProps, useForm } from "react-hook-form";
import { FormProvider } from "./FormProvider";

export const customUseForm = <T extends FieldValues>(props?: UseFormProps<T>) => {
  const methods = useForm<T>({
    shouldFocusError: true,
    mode: "onBlur",
    reValidateMode: "onChange",
    ...props
  });
  
  const CustomFormProvider = FormProvider<T>;

  return {
    ...methods, FormProvider: CustomFormProvider
  };
}