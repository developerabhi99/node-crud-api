const { PrismaClient } = require('../generated/prisma')
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  // Seed 10 users
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        profile: {
          create: {
            bio: faker.lorem.sentence(),
          },
        },
        posts: {
          create: Array.from({ length: 3 }).map(() => ({
            title: faker.lorem.words(3),
            content: faker.lorem.paragraph(),
            published: faker.datatype.boolean(),
          })),
        },
      },
    });
    console.log(`Created user: ${user.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
