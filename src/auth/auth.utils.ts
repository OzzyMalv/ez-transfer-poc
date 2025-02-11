import { getTokenExpiry } from "./auth";

export function convertExpiryToTimeLeft(expiry: number) {
  const expiryDate = new Date(expiry * 1000).getTime();
  const now = new Date().getTime();

  return Number(expiryDate - now);
}

export const getTokenRefreshPeriod = () => {
  const DEFAULT_TOKEN_REFRESH_PERIOD = 54 * 60_000; // 54 mins
  const FIVE_MINS = 5 * 60_000; // 5 mins

  const expiry = getTokenExpiry();

  return expiry
    ? convertExpiryToTimeLeft(expiry) - FIVE_MINS // Current token's expiry - 5 mins
    : DEFAULT_TOKEN_REFRESH_PERIOD;
};
