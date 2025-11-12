import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import {
  getUserFromToken,
  invalidId,
  notFound,
  forbidden,
} from "../../../../lib/apiHelpers";

export async function GET(req: NextRequest, context: any) {
  try {
    const user = await getUserFromToken(req);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const params = await context.params;
    const id = parseInt(params.id, 10);
    if (isNaN(id)) return invalidId();

    const profile = await prisma.userProfile.findUnique({ where: { id } });
    if (!profile) return notFound();
    if (profile.userId !== user.userId) return forbidden();

    return NextResponse.json(profile);
  } catch (err: any) {
    console.error("GET /profiles/[id] error:", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, context: any) {
  try {
    const user = await getUserFromToken(req);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const params = await context.params;
    const id = parseInt(params.id, 10);
    if (isNaN(id)) return invalidId();

    const data = await req.json();
    const profile = await prisma.userProfile.findUnique({ where: { id } });
    if (!profile) return notFound();
    if (profile.userId !== user.userId) return forbidden();

    const updated = await prisma.userProfile.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        photo: data.photo || "",
        description: data.description || "",
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("PUT /profiles/[id] error:", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    const user = await getUserFromToken(req);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const params = await context.params;
    const id = parseInt(params.id, 10);
    if (isNaN(id)) return invalidId();

    const profile = await prisma.userProfile.findUnique({ where: { id } });
    if (!profile) return notFound();
    if (profile.userId !== user.userId) return forbidden();

    await prisma.userProfile.delete({ where: { id } });
    return NextResponse.json({ message: "Profile deleted" });
  } catch (err: any) {
    console.error("DELETE /profiles/[id] error:", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
