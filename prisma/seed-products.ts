import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedProducts() {
    console.log('🌱 Seeding product categories...');

    // Create categories
    const categories = [
        { name: 'Ozuqa', slug: 'ozuqa' },
        { name: 'Dori-darmonlar', slug: 'dori-darmonlar' },
        { name: 'Parvarish vositalari', slug: 'parvarish-vositalari' },
        { name: 'Jun va teri', slug: 'jun-va-teri' },
        { name: 'Qo\'ra va to\'siq', slug: 'qora-va-tosiq' },
        { name: 'Sutchilik jihozlari', slug: 'sutchilik-jihozlari' },
        { name: 'Aksessuarlar', slug: 'aksessuarlar' },
        { name: 'Boshqa', slug: 'boshqa' },
    ];

    for (const cat of categories) {
        await prisma.productCategory.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }

    console.log('✅ Product categories seeded!');

    const ozuqaCategory = await prisma.productCategory.findUnique({
        where: { slug: 'ozuqa' },
    });

    if (ozuqaCategory) {
        const ozuqaProduct = await prisma.product.upsert({
            where: { slug: 'qoy-echki-ozuqasi' },
            update: {},
            create: {
                title: 'Qo\'y va echki uchun ozuqa aralashmasi',
                slug: 'qoy-echki-ozuqasi',
                categoryId: ozuqaCategory.id,
                description: 'Yuqori sifatli qo\'y va echki ozuqasi. Barcha kerakli vitaminlar va minerallar bilan boyitilgan. 25kg qop.',
                priceAmount: 180000,
                priceCurrency: 'UZS',
                hasDelivery: true,
                stockStatus: 'IN_STOCK',
                status: 'PUBLISHED',
                publishedAt: new Date(),
            },
        });
        await prisma.productMedia.deleteMany({ where: { productId: ozuqaProduct.id } });
        await prisma.productMedia.create({
            data: {
                productId: ozuqaProduct.id,
                url: 'https://picsum.photos/seed/ozuqa/800/600',
                thumbUrl: 'https://picsum.photos/seed/ozuqa/400/300',
                sortOrder: 0,
            },
        });
        console.log('✅ Sample ozuqa product created!');
    }

    console.log('🎉 Product seeding completed!');
}

seedProducts()
    .catch((e) => {
        console.error('❌ Error seeding products:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
