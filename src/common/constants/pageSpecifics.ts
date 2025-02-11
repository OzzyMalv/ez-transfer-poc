import routes from "@/common/constants/routes";

export const pagesWithBottomBorder = [
  routes.REGISTER_VERIFY,
  routes.REGISTER_SUCCESS,
  routes.REGISTER_EXPIRED,
  routes.LOGIN_RESET_PASSWORD,
  routes.LOGIN_RESET_PASSWORD_SENT,
  routes.LOGIN_RESET_PASSWORD_RESET,
  routes.LOGIN_RESET_PASSWORD_SUCCESS,
  routes.LOGIN_RESET_PASSWORD_EXPIRED,
  routes.ACCOUNT_RESET_PASSWORD_SENT,
];

export const pagesWithBorderAndBackground = [routes.HOME, routes.PRICING];

export const trialsModalPageAllowed = [
  routes.WORKSPACES,
  routes.RECEIVED_TRANSFERS,
];

export const trialsModalClosablePageAllowed = [routes.RECEIVED_TRANSFERS];

export const pagesWithoutNavigationButtons = [
  routes.REGISTER,
  routes.LOGIN,
  routes.ACCOUNT,
  routes.ACCOUNT_PREFERENCES,
  routes.ACCOUNT_PLANS,
  ...pagesWithBottomBorder,
];

export const pagesWithoutNavigationBar = [
  routes.UPLOAD,
  routes.LOGIN_RESET_PASSWORD_EXPIRED,
  routes.LOGIN_RESET_PASSWORD_SUCCESS,
  routes.VIRUS_DETECTED,
  routes.CHECKOUT_SUCCESS,
  routes.CHECKOUT,
];

export const securePages = [
  routes.ACCOUNT,
  routes.WORKSPACES,
  routes.RECEIVED_TRANSFERS,
  routes.CHECKOUT,
  routes.CHECKOUT_SUCCESS,
  routes.ACCOUNT_PREFERENCES,
  routes.ACCOUNT_PLANS,
];
