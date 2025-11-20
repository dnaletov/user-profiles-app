import Image from 'next/image';
import { Profile } from '@/types';
import { formatDate, getFullName } from '@/utils/formatters';
import noPhotoImg from "../../public/nophoto.png";
import { useTranslation } from "@/hooks/useTranslation";

interface ProfileDetailsProps {
  profile: Profile;
  variant?: "card" | "full";
}

export const ProfileDetails = ({
  profile,
  variant = "card",
}: ProfileDetailsProps) => {
  const { t } = useTranslation();
  const fullName = getFullName(profile.firstName, profile.lastName);

  if (variant === "card") {
    return (
      <>
        <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
          <Image
            src={profile.photo || noPhotoImg}
            alt={profile.photo ? "profile photo" : t("noPhoto")}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold truncate">{fullName}</h2>
          <p className="text-gray-500 mt-1">
            <span className="font-medium text-gray-700 mr-1">{t("birthday")}:</span>
            {formatDate(profile.birthDate)}
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-4">
      <div className="w-full h-64 relative rounded-lg overflow-hidden shadow-sm">
        <Image
          src={profile.photo || noPhotoImg}
          alt={fullName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 33vw"
          priority
        />
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        <div className="border-b pb-2">
          <span className="block text-sm text-gray-500 uppercase tracking-wider font-semibold">{t("name")}</span>
          <span className="text-lg">{fullName}</span>
        </div>
        
        <div className="border-b pb-2">
          <span className="block text-sm text-gray-500 uppercase tracking-wider font-semibold">{t("birthday")}</span>
          <span className="text-lg">{formatDate(profile.birthDate)}</span>
        </div>

        <div>
          <span className="block text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">{t("description")}</span>
          <div
            className="text-gray-700 prose prose-sm max-w-none bg-gray-50 p-3 rounded-md"
            dangerouslySetInnerHTML={{
              __html: profile.description || "",
            }}
          />
        </div>
      </div>
    </div>
  );
};
