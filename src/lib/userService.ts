import prisma from "./prisma";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: string, hashedPassword: string) {
  return prisma.user.create({
    data: { email, password: hashedPassword },
  });
}
