import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./auth";
import prisma from "./prisma";
import { JwtPayload } from "jsonwebtoken";
import { Context } from "@/types";

interface User {
  userId: number;
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function notFound() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export function invalidId() {
  return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function getUserFromRequest(
  req: NextRequest
): Promise<User | null> {
  const cookieToken = req.cookies.get("token")?.value;
  console.log("[AUTH] cookie token:", cookieToken || "no cookie");

  if (cookieToken) {
    const decoded = verifyToken(cookieToken) as JwtPayload;

    if (decoded?.userId || decoded?.id) {
      return { userId: decoded.userId || decoded.id };
    }
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token) as JwtPayload;

    if (decoded?.userId || decoded?.id) {
      return { userId: decoded.userId || decoded.id };
    }
  }
  return null;
}

export function withErrorHandling<T = {}>(
  handler: (req: NextRequest, context?: Context<T>) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: Context<T>) => {
    try {
      return await handler(req, context);
    } catch (err) {
      if (err instanceof Error) {
        console.error(`${req.method} ${req.url} error:`, err.message);
      } else {
        console.error(`${req.method} ${req.url} unknown error`, err);
      }
      return errorResponse("Internal server error", 500);
    }
  };
}

export async function requireUser(req: NextRequest): Promise<User> {
  const user = await getUserFromRequest(req);

  if (!user) {
    throw { status: 401, message: "Unauthorized" };
  }

  return user;
}
