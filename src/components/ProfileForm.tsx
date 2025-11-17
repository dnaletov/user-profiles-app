import { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import PhotoUpload from "./PhotoUpload";

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
  submitLabel = "Save",
}) => {
  const [firstName, setFirstName] = useState(initialData.firstName || "");
  const [lastName, setLastName] = useState(initialData.lastName || "");
  const [birthDate, setBirthDate] = useState(initialData.birthDate || "");
  const [photo, setPhoto] = useState(initialData.photo || "");
  const [description, setDescription] = useState(initialData.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ firstName, lastName, birthDate, photo, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PhotoUpload value={photo} onChange={setPhoto} />
      <input
        className="border p-2 w-full"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        required
      />
      <RichTextEditor value={description} onChange={setDescription} />
      <button className="bg-blue-500 text-white p-2 rounded w-full">
        {submitLabel}
      </button>
    </form>
  );
};

export default ProfileForm;
