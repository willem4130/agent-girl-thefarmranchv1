import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@farmranchmedia.com' },
    update: {},
    create: {
      email: 'admin@farmranchmedia.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', admin.email);
  console.log('📧 Email: admin@farmranchmedia.com');
  console.log('🔑 Password: admin123');

  // Create a demo client user
  const clientPassword = await bcrypt.hash('client123', 10);

  const client = await prisma.user.upsert({
    where: { email: 'client@farmranchmedia.com' },
    update: {},
    create: {
      email: 'client@farmranchmedia.com',
      name: 'Demo Client',
      password: clientPassword,
      role: 'CLIENT',
    },
  });

  console.log('✅ Client user created:', client.email);
  console.log('📧 Email: client@farmranchmedia.com');
  console.log('🔑 Password: client123');

  console.log('\n🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
