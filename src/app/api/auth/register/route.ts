import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { hashPassword, signToken } from "../../../../lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  const token = signToken({ userId: user.id });

  return NextResponse.json({ user: { id: user.id, email: user.email }, token });
}
