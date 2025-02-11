import React from "react";
import { ReactNode } from "react";
import { Controller, Path, Control } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";
import theme from "@/styles/theme";

export type CheckboxInputProps<T extends FieldValues = FieldValues> = Omit<
  CheckboxProps,
  "name"
> & {
  name: Path<T>;
  control?: Control<T>;
  component?: typeof Checkbox;
  label: ReactNode;
};

const FormCheckboxInput = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
}: CheckboxInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: props }) => (
        <FormControlLabel
          control={
            <Checkbox
              sx={{ marginTop: theme.spacing(-2.5) }}
              size="small"
              {...props}
            />
          }
          label={label}
        ></FormControlLabel>
      )}
    />
  );
};

export default FormCheckboxInput;
