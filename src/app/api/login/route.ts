import { createEdgeRouter } from "next-connect";
import { setLoginSession } from "@/lib/auth";
import { Session } from "@/interfaces/session";
import { NextRequest, NextResponse } from "next/server";
import { findUser, validatePassword } from "@/lib/user";
import { RequestContext } from "next/dist/server/base-server";

const router = createEdgeRouter<NextRequest, {}>();

router.post(async (req: NextRequest) => {
  try {
    return req.json().then((data) => {
      return findUser({ username: data.username }).then(
        async (user: Session | undefined) => {
          if (user && validatePassword(user, data.password)) {
            const res = NextResponse.json(
              { message: "Success to login" },
              { status: 200 }
            );
            await setLoginSession(user);
            return res;
          }

          return NextResponse.json(
            { error: "Failed to login" },
            { status: 401 }
          );
        }
      );
    });
  } catch (e) {
    console.log(e);
  }
});

export async function POST(request: NextRequest, context: RequestContext) {
  return router.run(request, context);
}
