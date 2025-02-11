export const extractEmails = (inputString: string) => {
  // Regex for defining email addresses
  const emailRegex = /[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  // Splits the string by , ; or white space
  const inputArray = inputString.split(/\,|\;|\s+/);

  return {
    validEmails: inputString.match(emailRegex) ?? [],
    invalidEmails: inputArray
      .filter((email) => !email.match(emailRegex))
      .filter((empty) => empty),
  };
};
