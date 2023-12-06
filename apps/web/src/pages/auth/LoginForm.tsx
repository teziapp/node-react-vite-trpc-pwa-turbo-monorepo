import { Button, IconButton, InputAdornment } from "@mui/material";
import Cookies from 'js-cookie';
import { RhfSubmitButton, RhfTextField } from "mui-components-tezi";
import SvgColor from "mui-components-tezi/SvgColor";
import { customUseForm } from "mui-components-tezi/rhf/useForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import exclude from '../../../../api/src/utils/exclude';
import { isRemote, toastSuccessSettings } from "../../config";
import { trpcFetch } from "../../trpc/trpcFetch";
import { formSubmitErrorHandler } from '../../utils/formSubmitErrorHandler';
import { userObjCache } from '../../utils/localCacheApi';
import { timeOut } from '../../utils/timeOut';

export const LoginForm = ({isDesktop}: {isDesktop: boolean | null}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {FormProvider, ...methods} = customUseForm<any>({
    // resolver: zodResolver(loginSchema),
  });
  const {handleSubmit, setError} = methods;
  
  const onSubmit = (latestDoc: any /*T_Login*/) => {
      
    // console.log({latestDoc});
    const submitAction = trpcFetch.auth.login.mutate(latestDoc);

    return Promise.all([timeOut(), submitAction])
      .then((values) => {
        const userObj = values[1];
        Cookies.set('access_token', userObj.token?.access_token, {
          // domain: 'app.subsmanager.com',
          expires: new Date(userObj.token?.access_token_expires),
          sameSite: 'strict',
          secure: isRemote
        })
        navigate('/');
        userObjCache.createOrUpdate(exclude(userObj, ['token']));
        toast.success(`Welcome ${userObj.name}.`, toastSuccessSettings);
        return;
      })
      .catch(formSubmitErrorHandler(setError));
  };
  
  const onError = (error: unknown) => {
    console.error(error);
  };

  return (
    <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit, onError)}
    >
      <RhfTextField
        autoFocus
        inputProps={{ style: { textTransform: 'none' }}}
        label="Email or Mobile Number"
        name="emailOrPhone"
      />
      <RhfTextField
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <SvgColor iconFileName={showPassword ? 'eye-fill' : 'eye-off-fill'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        inputProps={{style: {textTransform:"none"}}} 
      />
      <RhfSubmitButton 
        actionType='add-new' 
        buttonLabel='Login'
        isDesktop={isDesktop}
      />
      <Button
        color="secondary"
        disabled
        onClick={() => {
          onSubmit({
            emailOrPhone: '7990451310',
            password: "90909090K"
          })
        }}
        sx={{ mt: 5, width: "100%", alignContent: "end" }}
      >
        Demo Login
      </Button>
    </FormProvider>

  )
};