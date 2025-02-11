import routes from "../constants/routes";

const setCurrentUrl = (url: string) => {
  if (url !== routes.CHECKOUT_SUCCESS) {
    localStorage.setItem("previousPage", url);
  }
};

export const getPreviousUrl = () => {
  const previousUrl = localStorage.getItem("previousPage");

  if (previousUrl && previousUrl !== routes.HOME) {
    return previousUrl;
  }

  return routes.HOME;
};

export const formattedShortUrl = (pathname: string) => {
  return `/${pathname.split("/").filter((part) => part)[0]}`;
};

export default setCurrentUrl;
