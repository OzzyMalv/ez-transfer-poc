/**
 * Convert string to base64url encoded string
 * @param inputStr {string}
 * @return string
 */
export const base64UrlEncode = (inputStr: string) => {
  const base64EncodedString = Buffer.from(inputStr).toString("base64");
  // Base64Url encoding replaces '+' with '-' and '/' with '_'
  return base64EncodedString
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};
