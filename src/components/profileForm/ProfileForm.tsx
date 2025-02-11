"use client";
import useLookupData from "@/common/hooks/useLookupData";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  requestUpdateUserProfile,
  selectUserAuthProfile,
  setUserProfileData,
} from "@/store/slices/auth.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { FieldWrapper, StyledFormLabel } from "../senderForm/senderForm.styles";
import FormAutocomplete from "../shared/form/FormAutocomplete";
import FormTextInput from "../shared/form/FormTextInput";
import { ProfileSchemaType, ProfileSchema } from "./profileValidation";
import Image from "next/image";
import theme from "@/styles/theme";
import {
  heapAddUserProperty,
  heapAddEventProperties,
  heapClearEventProperty,
} from "@/common/utils/heapTracking";
import { useEffect } from "react";

const profileDefaultValues = {
  firstName: "",
  lastName: "",
};

export interface ILookup {
  inputValue?: string;
  id?: number;
  name: string;
}

const ProfileForm = () => {
  const { t } = useTranslation(["common", "formValidation"]);
  const dispatch = useAppDispatch();
  const profileData = useAppSelector(selectUserAuthProfile);
  const email = profileData.email;

  useEffect(() => {
    const heapProperty = {
      email,
      has_account: "true",
      opted_in: profileData.isMarketingOptIn || false,
    };

    if (email) {
      heapClearEventProperty();
      heapAddUserProperty(heapProperty);
      heapAddEventProperties({ logged_in: true });
    }
  });

  useEffect(() => {
    reset({
      firstName: profileData?.firstName || "",
      lastName: profileData?.lastName || "",
    });
  }, [profileData]);

  const auth =
    typeof localStorage !== "undefined" ? localStorage.getItem("auth") : null;
  const jsonAuth = auth !== null ? JSON.parse(auth) : null;
  const status = jsonAuth?.status ?? "";

  const { regions, jobTitles } = useLookupData({ status });

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<ProfileSchemaType>({
    defaultValues: profileDefaultValues,
    mode: "onBlur",
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit: SubmitHandler<ProfileSchemaType> = async (data) => {
    await dispatch(
      requestUpdateUserProfile({
        ...data,
        email,
        isMarketingOptIn: profileData.isMarketingOptIn,
      }),
    )
      .unwrap()
      .then(() => {
        dispatch(
          setUserProfileData({
            ...data,
            email,
            isMarketingOptIn: profileData.isMarketingOptIn,
          }),
        );

        jsonAuth["status"] = "Verified";
        localStorage.setItem("auth", JSON.stringify(jsonAuth));
      })
      .catch(() => {
        setError("root.serverError", {
          type: t("form_validation.form.validation.serverError", {
            ns: "formValidation",
          }),
        });
      });
  };

  return (
    <Modal
      open={status === "IncompleteProfile"}
      data-testid="dti-profile-modal"
      disableAutoFocus
    >
      <Grid
        container
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { md: theme.spacing(106), xs: "100%", sm: theme.spacing(54) },
          height: { xs: "100dvh", sm: "auto" },
          borderRadius: theme.spacing(3),
          overflow: "hidden",
        }}
      >
        <Grid
          item
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <Box
            sx={{
              background: "#bfffda",
              flex: "1",
              position: "relative",
            }}
          >
            <Image
              src="/img/profile.svg"
              alt=""
              width={450}
              height={500}
              priority={true}
              style={{
                height: "auto",
                width: "100%",
                position: "absolute",
                bottom: 0,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              background: "#FFF",
              padding: {
                md: "64px 0 48px",
                sm: "56px 0 48px",
                xs: "56px 0 16px",
              },
              display: "flex",
              justifyContent: { sm: "center", xs: "start" },
              alignItems: "center",
              flexDirection: "column",
              height: { xs: "100%" },
            }}
          >
            <Typography variant="hL">{t("profile.title")}</Typography>
            <Typography
              variant="bodyM"
              sx={{
                marginTop: "8px",
              }}
            >
              {t("profile.subtitle")}
            </Typography>
            <Box
              sx={{
                padding: {
                  md: "16px 64px 0",
                  sm: "16px 49px 0",
                  xs: "16px 24px 0",
                },
                width: "100%",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
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
                  <StyledFormLabel>
                    {t("profile.form.label.region")}
                  </StyledFormLabel>
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
                  <StyledFormLabel>
                    {t("profile.form.label.jobTitle")}
                  </StyledFormLabel>
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
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  data-testid="dti-profile-confirm"
                  data-analytics="profile-confirm"
                  sx={{ marginTop: "8px" }}
                  disabled={!isDirty || !isValid || isSubmitting}
                >
                  {t("profile.form.button.confirm")}
                </Button>
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ProfileForm;
