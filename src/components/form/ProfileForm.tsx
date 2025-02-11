import useLookupData from "@/common/hooks/useLookupData";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  requestUpdateUserProfile,
  selectUserAuthProfile,
  setUserProfileData,
} from "@/store/slices/auth.slice";
import { showNotify } from "@/store/slices/notification.slice";
import theme from "@/styles/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField, TextFieldProps } from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  ProfileSchemaWithEmail,
  ProfileSchemaWithEmailType,
} from "../profileForm/profileValidation";
import { FieldWrapper, StyledFormLabel } from "../senderForm/senderForm.styles";
import FormAutocomplete from "../shared/form/FormAutocomplete";
import FormTextInput from "../shared/form/FormTextInput";

const profileDefaultValues = {
  firstName: "",
  lastName: "",
};

export interface ILookup {
  inputValue?: string;
  id: number;
  name: string;
}

const ProfileForm = () => {
  const { t } = useTranslation(["common", "formValidation"]);
  const dispatch = useAppDispatch();
  const profileData = useAppSelector(selectUserAuthProfile);

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isDirty, isValid },
  } = useForm<ProfileSchemaWithEmailType>({
    defaultValues: profileDefaultValues,
    mode: "onBlur",
    resolver: zodResolver(ProfileSchemaWithEmail),
  });

  useEffect(() => {
    const { region, jobTitle, firstName, lastName, email, isMarketingOptIn } =
      profileData;
    reset({
      email,
      firstName,
      lastName,
      isMarketingOptIn,
      region: region?.id ? (region as ILookup) : undefined,
      jobTitle: jobTitle?.name ? (jobTitle as ILookup) : undefined,
    });
  }, []);

  const { regions, jobTitles } = useLookupData({ status: "IncompleteProfile" });

  const handleBlurSubmit: SubmitHandler<ProfileSchemaWithEmailType> = async (
    data,
  ) => {
    if (isValid && isDirty) {
      await dispatch(
        requestUpdateUserProfile({ ...data, email: profileData.email }),
      )
        .unwrap()
        .then(() => {
          dispatch(setUserProfileData(data));
          reset({ ...data, email: profileData.email });
          dispatch(showNotify({ isOpen: true, message: "notify.saved" }));
        })
        .catch(() => {
          setError("root.serverError", {
            type: t("form_validation.form.validation.serverError", {
              ns: "formValidation",
            }),
          });
        });
    }
  };

  const handleBlurForm = () => {
    handleSubmit(handleBlurSubmit)();
  };

  return (
    <Box
      sx={{
        maxWidth: theme.spacing(40.5),
      }}
    >
      <form onBlur={handleBlurForm}>
        <FieldWrapper>
          <StyledFormLabel>
            {`${t("profile.form.label.firstName")} *`}
          </StyledFormLabel>
          <FormTextInput
            required
            placeholder={t("profile.form.placeholder.firstName")}
            variant="outlined"
            inputProps={{
              "data-testid": "dti-firstName-input",
              "data-analytics": "profile-firstName-input",
            }}
            control={control}
            name="firstName"
          />
        </FieldWrapper>
        <FieldWrapper>
          <StyledFormLabel>
            {`${t("profile.form.label.lastName")} *`}
          </StyledFormLabel>
          <FormTextInput
            required
            placeholder={t("profile.form.placeholder.lastName")}
            variant="outlined"
            inputProps={{
              "data-testid": "dti-lastName-input",
              "data-analytics": "profile-lastName-input",
            }}
            name="lastName"
            control={control}
          />
        </FieldWrapper>
        <FieldWrapper>
          <StyledFormLabel>{t("profile.form.label.region")}</StyledFormLabel>
          <FormAutocomplete
            data-testid="dti-region-input"
            data-analytics="profile-region-input"
            name="region"
            control={control}
            options={regions}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={t("profile.form.placeholder.region")}
                InputLabelProps={
                  params.InputLabelProps as TextFieldProps["InputLabelProps"]
                }
              />
            )}
          />
        </FieldWrapper>
        <FieldWrapper>
          <StyledFormLabel>{t("profile.form.label.jobTitle")}</StyledFormLabel>
          <FormAutocomplete
            data-testid="dti-jobTitle-input"
            data-analytics="profile-jobTitle-input"
            freeSolo
            name="jobTitle"
            control={control}
            options={jobTitles}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={t("profile.form.placeholder.jobTitle")}
                InputLabelProps={
                  params.InputLabelProps as TextFieldProps["InputLabelProps"]
                }
              />
            )}
          />
        </FieldWrapper>
      </form>
    </Box>
  );
};

export default ProfileForm;
