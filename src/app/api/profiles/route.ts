import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token) as any;
    if (!decoded)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const profiles = await prisma.userProfile.findMany({
      where: { userId: decoded.userId },
    });

    return NextResponse.json(profiles);
  } catch (err) {
    console.error("ERROR /api/profiles GET:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token) as any;
    if (!decoded || !decoded.userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    if (!data.firstName || !data.lastName || !data.birthDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProfile = await prisma.userProfile.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: new Date(data.birthDate),
        photo: data.photo || "",
        description: data.description || "",
        userId: decoded.userId,
      },
    });

    return NextResponse.json(newProfile);
  } catch (err: any) {
    console.error("ERROR /api/profiles POST:", err.message);
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}
