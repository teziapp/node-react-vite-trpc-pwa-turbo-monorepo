import { TextFieldProps } from "@mui/material";
import { DatePicker, DatePickerProps, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format as formatFns } from 'date-fns';
import { Controller, FieldValues, Path } from "react-hook-form";

type T_DatePickerRhfMui<T extends FieldValues> = Omit<DatePickerProps<T>, 'name'> & {
  fullWidth?: boolean
  name: Path<T>,
  textFieldProps?: TextFieldProps
}

export const DatePickerRhfMui = <T extends T_DatePickerRhfMui<FieldValues>>({
  defaultValue = null,
  format='dd-MM-yyyy',
  fullWidth=true,
  name,
  onChange,
  textFieldProps,
  ...props
}: T) => {
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      render={({field: {ref, value, ...field}, fieldState: { error }}) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              {...field}
              format={format}
              inputRef={ref}
              onChange={onChange 
                ? onChange
                : (value, _ctx) => {
                  if(value)
                    return  field.onChange(formatFns(new Date(value as any), 'yyyy-MM-dd'))
                  
                  return field.onChange(value)
                }}
              slotProps={{
                textField: {
                  error: !!error,
                  helperText: error?.message,
                  size: 'small',
                  ...textFieldProps
                }
              }}
              value={value && new Date(value)}
              {...props}
            />
          </LocalizationProvider>
      )}}
    />
  )
}