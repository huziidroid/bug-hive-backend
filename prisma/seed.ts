import { PrismaClient } from '@prisma/client';

const Roles = [
  {
    name: 'Software Engineer',
  },
  {
    name: 'Data Engineer',
  },
  {
    name: 'React Engineer',
  },
  {
    name: 'React Native Engineer',
  },
  {
    name: 'Frontend Developer',
  },
  {
    name: 'Backend Developer',
  },
  {
    name: 'Python Developer',
  },
  {
    name: 'Golang Developer',
  },
  {
    name: 'QA Engineer',
  },
  {
    name: 'Node Developer',
  },
  {
    name: 'Project Manager',
  },
];

const prisma = new PrismaClient();

const main = async () => {
  Roles.forEach(async (role) => {
    await prisma.role.create({ data: role });
  });
};

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
