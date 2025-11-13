export interface ProfileData {
  firstName: string;
  lastName: string;
  birthDate: string;
  photo?: string | null;
  description?: string;
}

export interface Profile extends ProfileData {
  id: number;
  userId: number;
}
