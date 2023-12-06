import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { Button, FormControlLabel, IconButton, Stack, Switch } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SvgColor from "../SvgColor";

type rhfSubmitButtonProps = {
  actionType?: 'edit' | 'add-new' | 'copy',
  buttonLabel?: 'login' | string,
  isDesktop: boolean | null,
  loading?: boolean,
  pdfNavigateLink?: string,
  size?: LoadingButtonProps['size']
};

export const RhfSubmitButton = ({
  actionType, 
  buttonLabel,
  isDesktop,
  loading,
  pdfNavigateLink, 
  size='medium',
  ...props
}: rhfSubmitButtonProps) => {
  const [allowEditToggle,setAllowEditToggle] = useState(false);
  const { formState: { isDirty, isSubmitting } } = useFormContext();
  const navigate = useNavigate();

  return (
    <Stack
        justifyContent='flex-end'
        direction='row'
        spacing={2}
    >
      {actionType === 'edit' && pdfNavigateLink && (
        isDesktop
          ? <Button
              variant="outlined"
              startIcon={<SvgColor iconFileName="fill-type-pdf2"/>}
              onClick={() => navigate(pdfNavigateLink)}
            >
              {(isDesktop) ? 'View PDF' : null}
            </Button>
          : <IconButton
              onClick={() => navigate(pdfNavigateLink)}
              sx={{color: '#2065D1', p:0}}
            >
              <SvgColor iconFileName="fill-type-pdf2" sx={{width:30, height:30}} />
            </IconButton>
      )}
      {actionType === 'edit' &&
        <FormControlLabel
          control={
            <Switch
              size="medium"
              checked={allowEditToggle}
              onChange={()=>setAllowEditToggle(!allowEditToggle)}
            />
          }
          disabled={!isDirty}
          label='Edit'
          onClick={() => !isDirty &&alert('Pls make changes to activate the switch.')}
        />
      }
      <LoadingButton
          size={size}
          type='submit'
          variant='contained'
          disabled={actionType === 'edit' ? !(allowEditToggle && isDirty) : !isDirty}
          loading={loading ?? isSubmitting}
          {...props}
      >
        {buttonLabel || (actionType === 'edit' ? 'Save' : 'Create')}
      </LoadingButton>
    </Stack>
  )
}