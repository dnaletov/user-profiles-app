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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("POST /api/profiles body:", data);

    const newProfile = await prisma.userProfile.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: new Date(data.birthDate),
        photo: data.photo || "",
        description: data.description,
        userId: data.userId,
      },
    });
    return NextResponse.json(newProfile);
  } catch (err) {
    console.error("ERROR /api/profiles POST:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
