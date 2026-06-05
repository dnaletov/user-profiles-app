"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Upload, Loader2, Trash2 } from "lucide-react";
import { Button } from "./ui";
import { useTranslation } from "@/hooks/useTranslation";

interface PhotoUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
}

export default function PhotoUpload({ value, onChange }: PhotoUploadProps) {
  const [uploading, setUploading] = useState<boolean>(false);
  const { t } = useTranslation();

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    const form = new FormData();
    form.append("file", file);

    setUploading(true);
    try {
      const res = await axios.post("/api/upload", form);
      onChange(res.data.url);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = () => {
    onChange("");
  };

  return (
    <div className="space-y-3">
      <div className="relative w-32 h-32 rounded-lg border overflow-hidden bg-gray-100 flex items-center justify-center">
        {uploading ? (
          <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
        ) : value ? (
          <Image
            src={value}
            alt="profile photo"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
            loading="eager"
          />
        ) : (
          <span className="text-gray-400 text-sm">No photo</span>
        )}

        {value && !uploading && (
          <Button
            onClick={removePhoto}
            variant="transparent"
            className="absolute top-0 right-0"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        )}
      </div>

      <label className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-2 text-sm rounded-lg w-fit">
        <Upload className="w-4 h-4" />
        {t("uploadPhoto")}
        <input
          type="file"
          accept="image/*"
          onChange={upload}
          className="hidden"
        />
      </label>
    </div>
  );
}
