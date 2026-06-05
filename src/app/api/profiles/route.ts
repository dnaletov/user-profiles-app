import { NextRequest, NextResponse } from "next/server";
import { withErrorHandling, withAuth, errorResponse } from "../../../lib/apiHelpers";
import { getProfiles, createProfile } from "../../../lib/profileService";

export const GET = withErrorHandling(async () => {
  const profiles = await getProfiles();
  return NextResponse.json(profiles);
});

export const POST = withAuth(async (req: NextRequest, user) => {
  const data = await req.json();

  if (!data.firstName || !data.lastName || !data.birthDate)
    return errorResponse("Missing required fields", 400);

  const newProfile = await createProfile(user.userId, data);
  return NextResponse.json(newProfile);
});
