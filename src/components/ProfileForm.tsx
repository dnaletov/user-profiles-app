import { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import PhotoUpload from "./PhotoUpload";
import { Input, Button } from "./ui";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
  initialData?: {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    photo?: string | null;
    description?: string;
  };
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    birthDate: string;
    photo?: string;
    description?: string;
  }) => void;
  submitLabel?: string;
}

const ProfileForm: React.FC<Props> = ({
  initialData = {},
  onSubmit,
  submitLabel,
}) => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState(initialData.firstName || "");
  const [lastName, setLastName] = useState(initialData.lastName || "");
  const [birthDate, setBirthDate] = useState(initialData.birthDate || "");
  const [photo, setPhoto] = useState(initialData.photo || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName || "");
      setLastName(initialData.lastName || "");
      setBirthDate(initialData.birthDate || "");
      setPhoto(initialData.photo || "");
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim() || !birthDate) {
      setError(t("errorRequiredFields"));
      return;
    }

    const today = new Date();
    const selectedDate = new Date(birthDate);
    if (selectedDate > today) {
      setError(t("errorFutureDate"));
      return;
    }

    if (description.length > 150) {
      setError(t("errorDescriptionLength"));
      return;
    }

    if ((firstName + lastName).length > 20) {
      setError(t("errorNameLength"));
      return;
    }

    onSubmit({ firstName, lastName, birthDate, photo, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PhotoUpload value={photo} onChange={setPhoto} />
      <Input
        placeholder={t("firstName")}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <Input
        placeholder={t("lastName")}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <Input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        required
        max={new Date().toISOString().split("T")[0]}
      />
      <RichTextEditor value={description} onChange={setDescription} />
      <Button type="submit" fullWidth>
        {submitLabel || t("save")}
      </Button>
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
    </form>
  );
};

export default ProfileForm;
