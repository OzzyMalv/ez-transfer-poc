import {
  Autocomplete,
  AutocompleteProps,
  createFilterOptions,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { ILookup } from "@/components/profileForm/ProfileForm";
import { useTranslation } from "next-i18next";
import { ArrowDropDownRounded } from "@mui/icons-material";

export type FormAutocompletePropsType<
  T extends ILookup,
  TField extends FieldValues = FieldValues,
> = Omit<AutocompleteProps<ILookup, boolean, boolean, boolean>, "name"> & {
  name: Path<TField>;
  control?: Control<TField>;
  component?: typeof Autocomplete;
  options: T[];
};

const filter = createFilterOptions<ILookup>();

const FormAutocomplete = <T extends ILookup, TField extends FieldValues>({
  name,
  control,
  options,
  ...rest
}: FormAutocompletePropsType<T, TField>) => {
  const { t } = useTranslation("common");
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { onChange, onBlur, value } = field;
        return (
          <Autocomplete
            {...rest}
            id={name}
            value={value ?? null}
            onChange={(event, value) => {
              event.preventDefault();
              if (typeof value === "string") {
                onChange({ name: value });
              } else if (value && (value as ILookup).inputValue) {
                onChange({
                  name: (value as ILookup).inputValue,
                });
              } else {
                onChange(value === null ? undefined : value);
              }
            }}
            size="small"
            options={options}
            onBlur={onBlur}
            clearOnBlur
            handleHomeEndKeys
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }

              if (option.inputValue) {
                return option.inputValue;
              }

              return option.name;
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              if (rest.freeSolo) {
                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option.name,
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    inputValue,
                    name: `${t(
                      "form_auto_complete.freesolo.add",
                    )} "${inputValue}"`,
                  });
                }
              }
              return filtered;
            }}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            )}
            sx={{
              "&& .MuiInputBase-root": {
                padding: 0,
                "& .MuiInputBase-input": { padding: "10px 14px" },
              },
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            popupIcon={<ArrowDropDownRounded sx={{ fontSize: "20px" }} />}
          />
        );
      }}
    />
  );
};

export default FormAutocomplete;
