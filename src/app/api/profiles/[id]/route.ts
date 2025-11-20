import { NextRequest, NextResponse } from "next/server";
import { withErrorHandling, invalidId, notFound } from "@/lib/apiHelpers";
import {
  getProfileById,
  updateProfile,
  deleteProfile,
} from "@/lib/profileService";
import { Context } from "@/app/types/profile";

export const GET = withErrorHandling<{ id: string }>(
  async (req: NextRequest, context?: Context<{ id: string }>) => {
    const { id } = await context!.params;
    const profileId = parseInt(id, 10);
    if (isNaN(profileId)) return invalidId();

    const profile = await getProfileById(profileId);
    if (!profile) return notFound();

    return NextResponse.json(profile);
  }
);

export const PUT = withErrorHandling<{ id: string }>(
  async (req: NextRequest, context?: Context<{ id: string }>) => {
    const { id } = await context!.params;
    const profileId = parseInt(id, 10);
    if (isNaN(profileId)) return invalidId();

    const profile = await getProfileById(profileId);
    if (!profile) return notFound();

    const data = await req.json();
    const updated = await updateProfile(profileId, data);
    return NextResponse.json(updated);
  }
);

export const DELETE = withErrorHandling<{ id: string }>(
  async (req: NextRequest, context?: Context<{ id: string }>) => {
    const { id } = await context!.params;
    const profileId = parseInt(id, 10);
    if (isNaN(profileId)) return invalidId();

    const profile = await getProfileById(profileId);
    if (!profile) return notFound();

    await deleteProfile(profileId);
    return NextResponse.json({ message: "Profile deleted" });
  }
);
