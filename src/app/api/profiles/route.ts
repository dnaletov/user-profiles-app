import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getUserFromToken } from "../../../lib/apiHelpers";

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromToken(req);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const profiles = await prisma.userProfile.findMany({
      where: { userId: user.userId },
    });
    return NextResponse.json(profiles);
  } catch (err: any) {
    console.error("GET /profiles error:", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromToken(req);
    if (!user)
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
        userId: user.userId,
      },
    });

    return NextResponse.json(newProfile);
  } catch (err: any) {
    console.error("POST /profiles error:", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
