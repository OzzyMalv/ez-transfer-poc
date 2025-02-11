"use server";

import { cookies } from "next/headers";
import routes from "../constants/routes";

interface cookieData {
  login: string;
  access: string;
  id: string;
}

export async function csrCookies(headers: Headers) {
  headers.forEach(async (value, name) => {
    if (name.toLowerCase() === "x-csrf-token") {
      (await cookies()).set({
        name: "csr_token",
        value: value,
        httpOnly: true,
        path: routes.HOME,
        maxAge: 864000,
      });
    }

    if (name.toLowerCase() === "set-cookie") {
      (await cookies()).set({
        name: "atid",
        value: value,
        httpOnly: true,
        path: routes.HOME,
        maxAge: 864000,
      });
    }
  });
}

export async function setAuthCookies(data: cookieData) {
  (await cookies()).set({
    name: "is_logged_in",
    value: data.id,
    httpOnly: true,
    path: routes.HOME,
    maxAge: 864000,
  });

  (await cookies()).set({
    name: "id_token",
    value: data.id,
    httpOnly: true,
    path: routes.HOME,
    maxAge: 864000,
  });

  (await cookies()).set({
    name: "ac_token",
    value: data.access,
    httpOnly: true,
    path: routes.HOME,
    maxAge: 864000,
  });
}
