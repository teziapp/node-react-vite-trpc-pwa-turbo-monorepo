import { Stack, Typography } from "@mui/material";
import { RhfSubmitButton, RhfTextField, useFormPersistent } from "mui-components-tezi";
import { toast } from "react-toastify";
import { toastErrorSettings, toastSuccessSettings } from "../../config";
import useResponsive from "../../hooks/useResponsive";
import { trpcFetch } from "../../trpc/trpcFetch";
import { formSubmitErrorHandler } from "../../utils/formSubmitErrorHandler";
import { timeOut } from "../../utils/timeOut";

export const Signup = () => {
  const isDesktop = useResponsive();
  const actionType = 'add-new';

  const defaultValues = {};

  const {
    FormProvider, ...methods
  } = useFormPersistent<any>({
    defaultValues,
    // resolver: zodResolver(userInsertSchema)
  });

  const { getValues, handleSubmit, setError } = methods;

  const onSubmit = (latestDoc: any) => {
    console.log({latestDoc});

    const submitAction = trpcFetch.auth.signup.mutate(latestDoc);

    return Promise.all([timeOut(), submitAction])
      .then(async (values) => {
        const userObj = values[1];
        toast.success(`${userObj.email}, ${userObj.mobile_number} created`, toastSuccessSettings);
        return userObj;
      })
      .catch(formSubmitErrorHandler(setError))
  };

  const onError = (error: any) => {
    console.log(getValues());
    console.error(error);
    console.log(error);
    toast.error(error.message || 'Error', toastErrorSettings);
  };

  return (
    <Stack
      maxWidth={400}
      minWidth={300}
    >
      <Typography sx={{ my: 2 }} textAlign='center' variant='h4'>Signup</Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, onError)}>
        <RhfTextField
          label='Name'
          name='name'
        />
        <RhfTextField
          label='Email'
          name='email'
        />
        <RhfTextField
          label='Mobile Number'
          name='mobile_number'
          type='number'
        />
        <RhfTextField
          label='Password'
          name='password'
          type='password'
        />
        <RhfTextField
          label='Confirm'
          name='confirm'
        />
        <RhfSubmitButton isDesktop={isDesktop} actionType={actionType} />
      </FormProvider>
    </Stack>
  )

}