import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET!,
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = await req.formData();
  const file = data.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream({ folder: "profiles" }, (err, result) => {
        if (err)
          return resolve(NextResponse.json({ error: err }, { status: 500 }));
        resolve(NextResponse.json({ url: result!.secure_url }));
      })
      .end(buffer);
  });
}
