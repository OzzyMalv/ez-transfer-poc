import { SwitchStyled } from "@/components/senderForm/senderForm.styles";
import theme from "@/styles/theme";
import { FormControlLabel, Switch, SwitchProps } from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, Path } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";

export type SwitchInputProps<T extends FieldValues = FieldValues> = Omit<
  SwitchProps,
  "name"
> & {
  name: Path<T>;
  control?: Control<T>;
  component?: typeof Switch;
  label?: ReactNode;
};

const FormSwitchInput = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label = null,
}: SwitchInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: props }) => (
        <FormControlLabel
          control={<SwitchStyled {...props} />}
          label={label}
          sx={{
            "&&": { marginRight: label ? theme.spacing(2) : theme.spacing(0) },
          }}
        />
      )}
    />
  );
};

export default FormSwitchInput;
