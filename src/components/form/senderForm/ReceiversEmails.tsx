import { checkEmail } from "@/common/utils/emailValidation";
import {
  StyledFormLabel,
  StyledRecieversEmailWrapper,
  StyledRecieversEmails,
  StyledRecieversEmailsList,
} from "@/components/form/senderForm/senderForm.styles";
import { extractEmails } from "@/components/form/senderForm/senderForm.utils";
import { SenderFormSchemaType } from "@/components/form/senderForm/SenderFormValidation";
import { Box, Chip, TextField, TextFieldProps } from "@mui/material";
import { useTranslation } from "next-i18next";
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Control, useFieldArray } from "react-hook-form";
import { AutocompleteRenderInputParams } from "@mui/material";

interface IReceiversEmailsField<
  T extends SenderFormSchemaType = SenderFormSchemaType,
> {
  control: Control<T>;
  isValidReceiverEmails: boolean;
  handleIsValidReceiverEmails: (arg: boolean) => void;
  handleReceiverInput: (arg: boolean) => void;
}
const ReceiversEmailsField: React.FC<IReceiversEmailsField> = ({
  control,
  isValidReceiverEmails,
  handleIsValidReceiverEmails,
  handleReceiverInput,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation("sender");

  const [isFocused, setFocus] = useState(false);

  const { fields, append, remove } = useFieldArray({
    name: "receivers",
    control,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newMail, setNewMail] = useState("");
  const [validEmails, setValidEmails] = useState<string[]>([]);
  const [invalidEmails, setInvalidEmails] = useState<string[]>([]);

  const checkIfInputIsValid = (value: string) => {
    const { validEmails, invalidEmails } = extractEmails(value);
    setValidEmails(validEmails);
    setInvalidEmails(invalidEmails);

    const isThereAnyInvalidEmails = validEmails.some((item) => {
      return !checkEmail(item);
    });

    return { isThereAnyInvalidEmails };
  };

  const receivers = fields.map((item) => item.email);

  const fillTheField = () => {
    if (newMail.length > 0) {
      const { isThereAnyInvalidEmails } = checkIfInputIsValid(newMail);
      if (
        isThereAnyInvalidEmails ||
        (!validEmails.length && invalidEmails.length)
      ) {
        handleIsValidReceiverEmails(false);
      } else {
        if (validEmails.length) {
          validEmails.forEach((email) => {
            append({ email });
          });
        } else {
          append({ email: newMail });
        }
        setNewMail("");
      }
    }
  };

  const mailInputOnEnterPressed = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      fillTheField();
    }
  };

  const handleDelete = (index: number) => {
    remove(index);
    if (inputRef.current !== null) inputRef.current.focus();

    handleReceiverInput(fields.length - 1 > 0 || newMail.length > 0);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value.length === 0 ||
      !checkIfInputIsValid(e.target.value).isThereAnyInvalidEmails
    ) {
      if (!isValidReceiverEmails) handleIsValidReceiverEmails(true);
    }
    setNewMail(e.target.value);
    handleReceiverInput(e.target.value.length > 0);
  };

  const openTheItems = () => {
    setFocus(true);
    setIsMenuOpen(true);
  };

  const closeTheItems = () => {
    setIsMenuOpen(false);
    fillTheField();
  };

  const placeHolder = useMemo(() => {
    if (isMenuOpen == false && receivers.length > 0) return receivers[0];

    return t("sender.form.receiversEmails.input.placeholder");
  }, [isMenuOpen, receivers, t]);

  const RenderedChips = useCallback(
    () =>
      receivers.length > 0 ? (
        <StyledRecieversEmailsList
          $isMenuOpen={isMenuOpen}
          data-testid="dti-receiversEmailChips-container"
          data-analytics="receivers-email-chips-container"
        >
          {receivers.map((item, index) => (
            <Chip
              key={item}
              label={item}
              onDelete={() => handleDelete(index)}
              size="small"
              data-flag="receiverEmailItem"
              data-testid={`dti-${item}`}
              data-analytics={`receiver-email-item-${item}`}
            />
          ))}
        </StyledRecieversEmailsList>
      ) : null,
    [fields, isMenuOpen],
  );

  const SumEndingAdornment = useCallback(
    () => (
      <>
        {receivers?.length > 1 && !isMenuOpen && (
          <Chip
            label={t("sender.form.receiversEmails.extraMails.chip", {
              count: receivers.length - 1,
            })}
            size="small"
            onClick={openTheItems}
          />
        )}
      </>
    ),
    [isMenuOpen, receivers.length, t],
  );

  return (
    <Box>
      <StyledFormLabel>
        {t("sender.form.receiversEmails.input.label")}
      </StyledFormLabel>

      <StyledRecieversEmailWrapper
        $isMenuOpen={isFocused}
        onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
          setFocus(false);
          if (
            (e.relatedTarget as HTMLDivElement)?.dataset["flag"] !==
            "receiverEmailItem"
          ) {
            closeTheItems();
          }
        }}
        onFocus={openTheItems}
      >
        <StyledRecieversEmails
          id="receiverEmails"
          disablePortal
          options={[]}
          onOpen={openTheItems}
          onClose={closeTheItems}
          popupIcon={null}
          $darkPlaceholder={receivers.length > 0 && !isMenuOpen}
          renderInput={(params: AutocompleteRenderInputParams) => {
            return (
              <TextField
                {...params}
                autoComplete="false"
                inputRef={inputRef}
                placeholder={placeHolder}
                size="small"
                onKeyDown={(e) => mailInputOnEnterPressed(e)}
                type="email"
                value={newMail}
                onChange={handleInputChange}
                error={!isValidReceiverEmails}
                helperText={
                  isValidReceiverEmails
                    ? ""
                    : t("sender.form.receiversEmails.invalid")
                }
                InputLabelProps={
                  params.InputLabelProps as TextFieldProps["InputLabelProps"]
                }
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <SumEndingAdornment />,
                }}
                inputProps={{
                  ...params.inputProps,
                  value: newMail,
                  onBlur: () => {
                    setFocus(false);
                  },
                  "data-testid": "dti-receivers-emails-input",
                  "data-analytics": "receivers-emails-input",
                  autoComplete: "receiverEmails",
                  name: "receiverEmails",
                }}
              />
            );
          }}
          PopperComponent={RenderedChips}
        />
      </StyledRecieversEmailWrapper>
    </Box>
  );
};

export default ReceiversEmailsField;
