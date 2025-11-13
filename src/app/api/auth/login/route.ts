import { NextRequest, NextResponse } from "next/server";
import { signToken, verifyPassword } from "../../../../lib/auth";
import { findUserByEmail } from "../../../../lib/userService";
import { errorResponse, withErrorHandling } from "../../../../lib/apiHelpers";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const { email, password } = await req.json();

  const user = await findUserByEmail(email);
  if (!user) return errorResponse("Invalid credentials", 401);

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return errorResponse("Invalid credentials", 401);

  const token = signToken({ userId: user.id });
  return NextResponse.json({ user: { id: user.id, email: user.email }, token });
});
