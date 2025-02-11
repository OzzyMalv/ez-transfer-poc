import React from "react";
import { Controller, Path, Control } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import { TextField, TextFieldProps } from "@mui/material";
import { useTranslation } from "next-i18next";

export type FormTextInputProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  "name"
> & {
  name: Path<T>;
  // todo custom validation handling
  // validation?: ControllerProps<T>['rules']
  // parseError?: (error: FieldError) => ReactNode
  control?: Control<T>;
  component?: typeof TextField;
};

const FormTextInput = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  required,
  type,
  ...rest
}: FormTextInputProps<TFieldValues>) => {
  const { t } = useTranslation("formValidation");

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
      }) => (
        <TextField
          {...rest}
          name={name}
          value={value ?? ""}
          onChange={(ev) => {
            onChange(ev.target.value);
            if (typeof rest.onChange === "function") {
              rest.onChange(ev);
            }
          }}
          onBlur={onBlur}
          required={required}
          error={rest.error ?? !!error}
          helperText={
            rest.helperText ||
            t(error?.message as "form_validation.form.validation.emailError")
          }
          type={type}
          inputRef={ref}
        />
      )}
    />
  );
};

export default FormTextInput;
