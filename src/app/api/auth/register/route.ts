import { NextRequest, NextResponse } from "next/server";
import { hashPassword, signToken } from "../../../../lib/auth";
import { findUserByEmail, createUser } from "../../../../lib/userService";
import { errorResponse, withErrorHandling } from "../../../../lib/apiHelpers";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const { email, password } = await req.json();

  const existingUser = await findUserByEmail(email);
  if (existingUser) return errorResponse("User already exists", 400);

  const hashed = await hashPassword(password);
  const user = await createUser(email, hashed);

  const token = signToken({ userId: user.id });

  return NextResponse.json({
    user: { id: user.id, email: user.email },
    token,
  });
});
