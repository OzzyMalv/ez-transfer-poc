import React from "react";

import { render, RenderResult } from "@testing-library/react";

import { ThemeProvider } from "@mui/material";
import theme from "../../styles/theme";

import { Provider, useDispatch } from "react-redux";

import { setupStore } from "@/store";
import type { AppStore, RootState } from "@/store";
import { PreloadedState } from "@reduxjs/toolkit";

export type Props = NonNullable<unknown>;

type CreateSetupParams = {
  component: JSX.Element | React.FC;
  props?: Props;
  state?: Partial<RootState>;
  i18nConfig?: {
    initialI18nStore?: Record<string, unknown>;
    ns?: string[];
  };
  route?: string;
};

type SetupParams = {
  props?: Props;
  state?: Partial<RootState>;
  i18nConfig?: {
    initialI18nStore?: Record<string, unknown>;
    ns?: string[];
  };
};

export type Setup = RenderResult & {
  rerender: (rerenderParams: Props) => void;
  props?: Props;
  state?: Partial<RootState>;
  // selectors?: any;
  newStore: AppStore;
};

export type SetupFunction = (params?: SetupParams) => Setup;

export default function createSetup(params: CreateSetupParams): SetupFunction {
  const {
    component: Component,
    props: initialProps = {},
    state = {} as Partial<RootState>,
  } = params;

  try {
    const d = (a) => a;
    (useDispatch as jest.Mock).mockImplementation(() => d);
  } catch {}

  return ({ props, state: newState }: SetupParams = {}): Setup => {
    const finalState = newState || state;
    const store = setupStore(finalState as PreloadedState<RootState>);

    const combinedProps = { ...initialProps, ...props };
    const WrappedComponent: React.FC<Props> = (p?: Props) => {
      return (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Component {...p} store={store} />
          </ThemeProvider>
        </Provider>
      );
    };

    const wrapper = render(<WrappedComponent {...combinedProps} />);

    const rerender = (rerenderParams: Props = {}): void => {
      const { rerenderProps } = rerenderParams;
      const newProps = {
        ...combinedProps,
        ...rerenderProps,
      };
      wrapper.rerender(<WrappedComponent {...newProps} />);
    };

    return {
      ...wrapper,
      rerender,
      props,
      newStore: store,
    };
  };
}
