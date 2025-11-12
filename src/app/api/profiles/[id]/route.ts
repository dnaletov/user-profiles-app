import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../../../lib/auth";
import prisma from "../../../../../lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token) as any;

    const profile = await prisma.userProfile.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!profile || profile.userId !== decoded.userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token) as any;

    const data = await req.json();

    const existing = await prisma.userProfile.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!existing || existing.userId !== decoded.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedProfile = await prisma.userProfile.update({
      where: { id: parseInt(params.id) },
      data,
    });

    return NextResponse.json(updatedProfile);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token) as any;

    const existing = await prisma.userProfile.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!existing || existing.userId !== decoded.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.userProfile.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: "Profile deleted" });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
