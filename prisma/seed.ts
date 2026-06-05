import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("test", 10);

  const user = await prisma.user.upsert({
    where: { email: "test@test.test" },
    update: {},
    create: {
      email: "test@test.test",
      password,
      profiles: {
        create: [
          {
            firstName: "Alice",
            lastName: "Johnson",
            birthDate: new Date("1990-05-14"),
            description: "Frontend developer.",
            photo:
              "https://res.cloudinary.com/dhryd47yb/image/upload/v1780640914/profiles/lpyz4t7s7n7wrcmgb3oc.avif",
          },
          {
            firstName: "Bob",
            lastName: "Smith",
            birthDate: new Date("1985-11-03"),
            description: "Product designer.",
            photo:
              "https://res.cloudinary.com/dhryd47yb/image/upload/v1780640996/profiles/kjdmbihyt6cswnrwb1ip.jpg",
          },
        ],
      },
    },
  });

  console.log(`Seeded user: ${user.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
