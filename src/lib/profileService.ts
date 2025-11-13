import { Profile, ProfileData } from "@/app/types/profile";
import prisma from "./prisma";

export async function getProfilesByUserId(userId: number) {
  return prisma.userProfile.findMany({ where: { userId } });
}

export async function getProfileById(id: number) {
  return prisma.userProfile.findUnique({ where: { id } });
}

export async function createProfile(userId: number, data: ProfileData) {
  return prisma.userProfile.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: new Date(data.birthDate),
      photo: data.photo || "",
      description: data.description || "",
      userId,
    },
  });
}

export async function updateProfile(id: number, data: ProfileData) {
  return prisma.userProfile.update({
    where: { id },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: new Date(data.birthDate),
      photo: data.photo || "",
      description: data.description || "",
    },
  });
}

export async function deleteProfile(id: number): Promise<void> {
  await prisma.userProfile.delete({ where: { id } });
}
