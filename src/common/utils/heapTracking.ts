/* global heap */

import { ENV_CONSTANTS } from "@/common/constants/env.const";

type UserProperty = {
  [key: string]: string | boolean | undefined;
};

const heapEnabled = ENV_CONSTANTS.IS_HEAP_ENABLED;
const internalDomains = ENV_CONSTANTS.HEAP_INTERNAL_DOMAINS.split(",");
const internalUsers = ENV_CONSTANTS.HEAP_INTERNAL_USERS.split(",").map(
  (encodedInternalUserEmail) =>
    Buffer.from(encodedInternalUserEmail, "base64").toString("utf-8"),
);

const heapUserInternalTracking = (email: string) => {
  if (heapEnabled) {
    const heapUserProperty = {
      email: email.toLowerCase(),
      internal_user:
        internalUsers.includes(email) ||
        internalDomains.includes(email.split("@").pop() as string),
    };

    heap.addUserProperties(heapUserProperty);
  }
};

export const heapIdentify = (email: string) => {
  if (heapEnabled) {
    heap.identify(email.toLowerCase());
  }
};

export const heapAddUserProperty = (property: UserProperty) => {
  if (heapEnabled) {
    heap.addUserProperties(property);
  }
};

export const heapAddEventProperties = (data: unknown) => {
  if (heapEnabled) {
    heap.addEventProperties(data);
  }
};

export const heapRemoveEventProperty = (propertyName: string) => {
  if (heapEnabled) {
    heap.removeEventProperty(propertyName);
  }
};

export const heapClearEventProperty = () => {
  if (heapEnabled) {
    heap.clearEventProperties();
  }
};

interface FileObject {
  type?: string;
}

export const dragAndDropTracking = (files: FileObject[]) => {
  if (heapEnabled) {
    const fileTypes: string[] = [];
    let fileType = "";

    files.forEach((file) => {
      fileType =
        file.type === undefined || file.type === "" ? "folder" : "file";

      if (!fileTypes.includes(fileType)) {
        fileTypes.push(fileType);
      }
    });

    heap.track(" Peach Go_Sender_Drag_Drop", {
      fileTypes: fileTypes.join(", "),
    });
  }
};

export default heapUserInternalTracking;
