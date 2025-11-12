import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { signToken, verifyPassword } from "../../../../../lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ userId: user.id });
  return NextResponse.json({ user: { id: user.id, email: user.email }, token });
}
