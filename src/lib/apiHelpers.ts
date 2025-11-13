import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./auth";
import prisma from "./prisma";
import { JwtPayload } from "jsonwebtoken";

interface User {
  userId: number;
}
interface Context {
  params: { id: string };
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function forbidden() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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

export async function getUserFromToken(req: NextRequest): Promise<User | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  const decoded = verifyToken(token) as JwtPayload;
  if (!decoded) return null;

  return { userId: decoded.userId || decoded.id };
}

export async function getProfileById(id: number) {
  return prisma.userProfile.findUnique({ where: { id } });
}

export function withErrorHandling(
  handler: (req: NextRequest, context: Context) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: { params: { id: string } }) => {
    try {
      return await handler(req, context);
    } catch (err) {
      if (err instanceof Error) {
        console.error(`${req.method} ${req.url} error:`, err.message);
      } else {
        console.error(`${req.method} ${req.url} unknown error`);
      }
      return errorResponse("Internal server error", 500);
    }
  };
}

export async function requireUser(req: NextRequest): Promise<User> {
  const user = await getUserFromToken(req);
  if (!user) throw { status: 401, message: "Unauthorized" };
  return user;
}
