// locales/index.js
const accountEn = require("./en/account.json");
const commonEn = require("./en/common.json");
const errorEn = require("./en/error.json");
const expiredEn = require("./en/expired.json");
const footerEn = require("./en/footer.json");
const formValidationEn = require("./en/formValidation.json");
const loginEn = require("./en/login.json");
const notFoundEn = require("./en/404.json");
const preferencesEn = require("./en/preferences.json");
const projectsEn = require("./en/projects.json");
const receivedTransfersEn = require("./en/received-transfers.json");
const receiverEn = require("./en/receiver.json");
const receiverSessionFilesEn = require("./en/receiverSessionFiles.json");
const registerEn = require("./en/register.json");
const senderEn = require("./en/sender.json");
const sidenavEn = require("./en/sidenav.json");
const workspacesEn = require("./en/workspaces.json");

const resources = {
  en: {
    account: accountEn,
    common: commonEn,
    error: errorEn,
    expired: expiredEn,
    footer: footerEn,
    formValidation: formValidationEn,
    login: loginEn,
    notFound: notFoundEn,
    preferences: preferencesEn,
    projects: projectsEn,
    ["received-transfers"]: receivedTransfersEn,
    receiver: receiverEn,
    receiverSessionFiles: receiverSessionFilesEn,
    register: registerEn,
    sender: senderEn,
    sidenav: sidenavEn,
    workspaces: workspacesEn,
  },
};

module.exports = resources;
