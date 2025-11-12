import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../../../lib/auth";
import prisma from "../../../../../lib/prisma";

export async function GET(req: NextRequest, context: any) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token) as any;
    if (!decoded)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const params = await context.params;
    const id = parseInt(params.id, 10);
    if (isNaN(id))
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const profile = await prisma.userProfile.findUnique({ where: { id } });
    if (!profile)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (profile.userId !== decoded.userId)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    return NextResponse.json(profile);
  } catch (err: any) {
    console.error("ERROR in GET /api/profiles/[id]:", err.message);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, context: any) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token) as any;
    if (!decoded)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const params = await context.params;
    const id = parseInt(params.id, 10);
    if (isNaN(id))
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const data = await req.json();

    const existing = await prisma.userProfile.findUnique({ where: { id } });
    if (!existing)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.userId !== decoded.userId)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const updatedProfile = await prisma.userProfile.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        photo: data.photo || "",
        description: data.description || "",
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (err: any) {
    console.error("ERROR in PUT /api/profiles/[id]:", err.message);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token) as any;
    if (!decoded)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const params = await context.params;
    const id = parseInt(params.id, 10);
    if (isNaN(id))
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const existing = await prisma.userProfile.findUnique({ where: { id } });
    if (!existing)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.userId !== decoded.userId)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await prisma.userProfile.delete({ where: { id } });

    return NextResponse.json({ message: "Profile deleted" });
  } catch (err: any) {
    console.error("ERROR in DELETE /api/profiles/[id]:", err.message);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
