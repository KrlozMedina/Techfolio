import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { authorize } from "@/lib/auth/authorize";
import { Permission } from "@/lib/auth/permissions";

type HandlerContext<P = unknown> = {
  params: P;
};

type Handler<P = unknown> = (
  req: NextRequest,
  context: HandlerContext<P>
) => Promise<NextResponse>;

export function withAuthorization<P>(
  permission: Permission,
  handler: Handler<P>
): Handler<P> {
  return async (req, context) => {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!authorize(session.role, permission)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }
    
    return handler(req, context);
  };
}


// import { NextRequest, NextResponse } from "next/server";
// import { getSession } from "@/lib/auth/session";
// import { authorize } from "@/lib/auth/authorize";
// import { Permission } from "@/lib/auth/permissions";

// type Handler = (
//   req: NextRequest,
//   context?: unknown
// ) => Promise<NextResponse>;

// export function withAuthorization(
//   permission: Permission,
//   handler: Handler
// ) {
//   return async (req: NextRequest, context?: unknown) => {
//     const session = await getSession();

//     if (!session) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     if (!authorize(session.role, permission)) {
//       return NextResponse.json(
//         { error: "Forbidden" },
//         { status: 403 }
//       );
//     }

//     return handler(req, context);
//   };
// }