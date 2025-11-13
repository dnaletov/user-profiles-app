import { NextRequest, NextResponse } from "next/server";
import {
  withErrorHandling,
  requireUser,
  errorResponse,
} from "../../../lib/apiHelpers";
import {
  getProfilesByUserId,
  createProfile,
} from "../../../lib/profileService";

export const GET = withErrorHandling(async (req: NextRequest) => {
  const user = await requireUser(req);
  const profiles = await getProfilesByUserId(user.userId);
  return NextResponse.json(profiles);
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const user = await requireUser(req);
  const data = await req.json();

  if (!data.firstName || !data.lastName || !data.birthDate)
    return errorResponse("Missing required fields", 400);

  const newProfile = await createProfile(user.userId, data);
  return NextResponse.json(newProfile);
});
