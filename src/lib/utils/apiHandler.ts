import { NextResponse } from "next/server";

type HandlerFn = (req: Request, context?: any) => Promise<NextResponse>;

export function apiHandler(handler: HandlerFn) {
  return async (req: Request, context?: any) => {
    try {
      return await handler(req, context);
    } catch (error: any) {
      console.error(`[API ERROR]: ${error.message || error}`);
      return NextResponse.json(
        { error: "Internal server error", details: error?.message },
        { status: 500 }
      );
    }
  };
}
