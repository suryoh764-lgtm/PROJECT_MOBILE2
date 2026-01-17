const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@yasaka.com' },
    update: {},
    create: {
      email: 'admin@yasaka.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN'
    }
  });
  console.log('Admin created:', admin.email);

  const categories = [
    { name: 'PAKET', description: 'Paket menu lengkap' },
    { name: 'AYAM', description: 'Variasi ayam' },
    { name: 'MINUMAN', description: 'Minuman segar' },
    { name: 'KENTANG', description: 'Kentang goreng' }
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat
    });
  }
  console.log('Categories created');

  const categoryMap = {};
  const dbCategories = await prisma.category.findMany();
  for (const cat of dbCategories) categoryMap[cat.name] = cat.id;

  const menuItems = [
    { name: 'Paket Ayam Geprek', description: 'Ayam geprek dengan nasi hangat', price: 25000, categoryName: 'PAKET' },
    { name: 'Paket Nasi Box', description: 'Nasi box dengan lauk lengkap', price: 30000, categoryName: 'PAKET' },
    { name: 'Ayam Bakar', description: 'Ayam bakar bumbu special', price: 28000, categoryName: 'AYAM' },
    { name: 'Ayam Goreng', description: 'Ayam goreng krispi', price: 25000, categoryName: 'AYAM' },
    { name: 'Es Teh', description: 'Es teh manis segar', price: 5000, categoryName: 'MINUMAN' },
    { name: 'Jus Jeruk', description: 'Jus jeruk segar', price: 10000, categoryName: 'MINUMAN' },
    { name: 'Kentang Goreng', description: 'Kentang goreng crispy', price: 15000, categoryName: 'KENTANG' },
    { name: 'Kentang BBQ', description: 'Kentang dengan sauce BBQ', price: 18000, categoryName: 'KENTANG' }
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: {
        name: item.name,
        description: item.description,
        price: item.price,
        categoryId: categoryMap[item.categoryName]
      }
    });
  }
  console.log('Menu items created');

  console.log('Seed completed successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

