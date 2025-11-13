import { NextRequest, NextResponse } from "next/server";
import {
  withErrorHandling,
  requireUser,
  invalidId,
  notFound,
  forbidden,
} from "../../../../lib/apiHelpers";
import {
  getProfileById,
  updateProfile,
  deleteProfile,
} from "../../../../lib/profileService";

type Context = {
  params: { id: string };
};

export const GET = withErrorHandling(
  async (req: NextRequest, { params }: Context) => {
    const user = await requireUser(req);
    const { id } = await params;
    const profileId = parseInt(id, 10);
    if (isNaN(profileId)) return invalidId();

    const profile = await getProfileById(profileId);
    if (!profile) return notFound();
    if (profile.userId !== user.userId) return forbidden();

    return NextResponse.json(profile);
  }
);

export const PUT = withErrorHandling(
  async (req: NextRequest, { params }: Context) => {
    const user = await requireUser(req);
    const { id } = await params;
    const profileId = parseInt(id, 10);
    if (isNaN(profileId)) return invalidId();

    const profile = await getProfileById(profileId);
    if (!profile) return notFound();
    if (profile.userId !== user.userId) return forbidden();

    const data = await req.json();
    const updated = await updateProfile(profileId, data);
    return NextResponse.json(updated);
  }
);

export const DELETE = withErrorHandling(
  async (req: NextRequest, { params }: Context) => {
    const user = await requireUser(req);
    const { id } = await params;
    const profileId = parseInt(id, 10);
    if (isNaN(profileId)) return invalidId();

    const profile = await getProfileById(profileId);
    if (!profile) return notFound();
    if (profile.userId !== user.userId) return forbidden();

    await deleteProfile(profileId);
    return NextResponse.json({ message: "Profile deleted" });
  }
);
