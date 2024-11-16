const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    await prisma.product.createMany({
        data: [
            { name: 'Product 1', description: 'Description 1', cost: 10.99, image_filename: 'pic1.jpg' },
            { name: 'Product 2', description: 'Description 2', cost: 20.99, image_filename: 'pic2.jpg' },
            { name: 'Product 3', description: 'Description 3', cost: 30.99, image_filename: 'pic3.jpg' },
            { name: 'Product 4', description: 'Description 4', cost: 40.99, image_filename: 'pic4.jpg' },
            { name: 'Product 5', description: 'Description 5', cost: 50.99, image_filename: 'pic5.jpg' },
            { name: 'Product 6', description: 'Description 6', cost: 60.99, image_filename: 'pic6.jpg' },
            { name: 'Product 7', description: 'Description 7', cost: 70.99, image_filename: 'pic7.jpg' },
            { name: 'Product 8', description: 'Description 8', cost: 80.99, image_filename: 'pic8.jpg' },
            { name: 'Product 9', description: 'Description 9', cost: 90.99, image_filename: 'pic9.jpg' },
            { name: 'Product 10', description: 'Description 10', cost: 100.99, image_filename: 'pic10.jpg' },
        ],
    });
    console.log('Seeding complete!');
    process.exit();
}

seed();
