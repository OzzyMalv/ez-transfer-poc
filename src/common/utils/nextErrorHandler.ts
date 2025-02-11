import { NextResponse } from "next/server";

interface CustomError extends Error {
  statusCode?: number;
}
interface FetchError extends Error {
  statusCode?: number;
  message: string;
  error: boolean;
}

export const nextErrorHandler = (err: unknown) => {
  if (err instanceof Error) {
    return NextResponse.json(
      { error: err.message },
      { status: (err as CustomError).statusCode || 500 },
    );
  } else {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
};

export const routeErrorHandler = (status: number, customMessage?: string) => {
  return NextResponse.json(
    {
      error: true,
      message: customMessage || `Request failed with status code ${status}`,
      statusCode: status,
    },
    {
      status: status,
    },
  );
};

export const fetchErrorHandler = (error: FetchError) => {
  const setError = new Error(error.message) as Error & {
    statusCode?: number;
  };
  setError.statusCode = error.statusCode;

  return setError;
};
