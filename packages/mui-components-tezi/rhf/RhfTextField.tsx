import { TextField, TextFieldProps } from "@mui/material";
import { Controller, FieldValues, Path } from "react-hook-form";

type RHFTextFieldProps<T extends FieldValues> = Omit<TextFieldProps, 'name'> & {
  name: Path<T>
};

export const RhfTextField = <T extends RHFTextFieldProps<FieldValues>>({
  defaultValue = null,
  fullWidth = true,
  InputLabelProps,
  name, 
  onBlur,
  onChange,
  onClick,
  size = 'small', 
  ...props
}: T) => {
  return(
    <Controller
      defaultValue={defaultValue}
      name={name}
      render={({field: {ref, value, ...field}, fieldState: { error }}) => (
        <TextField
          {...field}
          error={!!error}
          fullWidth={fullWidth}
          helperText={error?.message}
          InputLabelProps={{
            // give true if field.value is zero.
            shrink: ((value === undefined || value === null || value === '') ? false : true),
            ...InputLabelProps,
          }} 
          inputRef={ref}
          onBlur={onBlur ?? field.onBlur}
          onChange={onChange ?? field.onChange}
          onClick={onClick}
          size={size}
          value={value || ''}
          {...props}
        />
      )}
    />
  )
};