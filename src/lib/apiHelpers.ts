import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./auth";
import prisma from "./prisma";

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

export async function getUserFromToken(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  const decoded = verifyToken(token) as any;
  if (!decoded) return null;

  return { userId: decoded.userId || decoded.id };
}

export async function getProfileById(id: number) {
  return prisma.userProfile.findUnique({ where: { id } });
}
