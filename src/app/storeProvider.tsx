"use client";

import { AppStore, setupStore } from "@/store";
import { Provider } from "react-redux";
import { useRef } from "react";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = setupStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};
