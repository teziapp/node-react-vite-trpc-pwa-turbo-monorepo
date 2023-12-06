import { Autocomplete, AutocompleteProps, Checkbox, TextField, TextFieldProps } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Controller, FieldValues, Path } from "react-hook-form";

// Options can be an array of string, number or objects
type OptionsType = (string | number | Record<string, any>)[];

// value can be string or number. Will be an array when multiple is allowed.
type ValueType = string | number | (string | number)[] | undefined;

type T_AutoCompleteRhfMui<
  F extends FieldValues,
  T,
  M extends boolean | undefined,
  D extends boolean | undefined,
  S extends boolean | undefined
> = Omit<AutocompleteProps<T, M, D, S>, 'disableClearable' | 'renderInput' | 'options'> & {
  disableClearable: boolean;
  displayLabelKey?: string;
  objectValueKey?: string;
  label?: string;
  name: Path<F>;
  options?: (string | number | Record<string, any>)[];
  queryFn?: Promise<OptionsType>;
  renderInput?: AutocompleteProps<T, M, D, S>['renderInput'];
  textFieldProps?: TextFieldProps
};

export const AutoCompleteStringNumberRhfMui = <TFieldValues extends FieldValues>(
  {
    defaultValue = null,
    disableCloseOnSelect,
    displayLabelKey,
    objectValueKey,
    fullWidth = true,
    getOptionLabel,
    isOptionEqualToValue,
    label,
    multiple = false,
    name,
    onChange: propOnChange,
    openOnFocus = true,
    options,
    queryFn,
    renderInput,
    renderOption,
    size='small',
    textFieldProps,
    ...props
  }:T_AutoCompleteRhfMui<
    TFieldValues,
    ValueType,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined
  >) => {

    const { data = undefined, isLoading = false } = queryFn 
      ? useQuery({
          queryFn: () => queryFn,
          queryKey: [name]
        })
      : {};

    options = (options || data || []) as any;

    const newGetOptionLabel = (option: ValueType | Record<string, any>) => {

      const findOptionForValue = (val: string| number) => (options?.find(optionFromList => (typeof optionFromList === 'object' && objectValueKey) && (optionFromList[objectValueKey] === val)) || val);

      // select option-object from the list based on form value.
      const optionObj = (
        (typeof option === 'string' || typeof option === 'number' || Array.isArray(option)) && 
        options && 
        typeof options[0] === 'object'
      ) && (
        Array.isArray(option)
          ? option.map(selectedOption => findOptionForValue(selectedOption))
          : findOptionForValue(option)
      );

      // if custom function is declared send the optionObj or option to the function.
      if (getOptionLabel) return getOptionLabel((optionObj ? optionObj : option) as any);

      // if custom function is not declared, return relevant label where applicable.
      else {
        if (typeof option === 'object' && !Array.isArray(option) && displayLabelKey) return option[displayLabelKey]
        else if (optionObj && displayLabelKey && typeof optionObj === 'object') {
          if (Array.isArray(optionObj)){
            return optionObj.map(op => op[displayLabelKey]);
          };
          return optionObj[displayLabelKey]
        }
        return option?.toString();
      }
    };

    return (
      <Controller
        // @ts-ignore defaultValue needs to be defined so that there is no un-controlled component error.
        defaultValue={defaultValue}
        name={name}
        render={({field: { onChange, ref, ...field }, fieldState: { error }}) => {
          onChange = propOnChange || onChange;
          return (
            <Autocomplete
              {...field}
              disableCloseOnSelect={disableCloseOnSelect || multiple}
              fullWidth={fullWidth}
              getOptionLabel={newGetOptionLabel}
              isOptionEqualToValue={isOptionEqualToValue
                ? isOptionEqualToValue
                : (option) => {
                  const value: ValueType = field.value;
                  if (!option || !value) return false;

                  // if the options are object.
                  if (typeof option === 'object' && objectValueKey) {
                    if (Array.isArray(value)){
                      return value.some(val => val === option[objectValueKey as any]);
                    }
                    return value === option[objectValueKey as any];
                  }

                  // if the options are string or number
                  if (Array.isArray(value)){
                    return value.some(val => val === option);
                  }
                  return (option === value)
                }
              }
              loading={isLoading}
              multiple={multiple}
              onChange={(event, value, reason, details) => {
                  if (!value) return onChange(value);
                  
                  let newValue;
                  if (multiple && Array.isArray(value) && objectValueKey) {
                    newValue = value.map((val) => typeof val === 'object' ? val[objectValueKey as any] : val)
                  }
                  else {
                    newValue =  (typeof value === 'object' && objectValueKey)
                      ? (value[objectValueKey as any])
                      : value
                  };
                  onChange(newValue);
                }
              }
              options={options as any} // using any because options could also be an object while the value could only be string | number | (string | number)[];
              renderInput={renderInput
                ? renderInput
                : (params) => (
                  <TextField
                    {...params}
                    error={!!error}
                    label={label}
                    helperText={error?.message}
                    inputRef={ref}
                    {...textFieldProps}
                  />
                )
              }
              renderOption={renderOption
                ? renderOption
                : (props, option, state, ownerState) => (
                  <li {...props}>
                    {multiple && <Checkbox sx={{ mr: 1}} checked={state.selected} />}
                    {newGetOptionLabel(option)}
                  </li>
                )
              }
              size={size}
              {...props}
            />
          )
        }}
      />
    )
}