import { NextResponse } from "next/server";

export function returnError(message: { [key: string]: any }) {
  return NextResponse.json(message, {
    status: 403,
  });
}

export function returnSuccess(message: { [key: string]: any }) {
  return NextResponse.json(message, {
    status: 200,
  });
}
