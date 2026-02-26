import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedProducts() {
    console.log('🌱 Seeding product categories...');

    // Create categories
    const categories = [
        { name: 'Egar-jabduqlar', slug: 'egar-jabduqlar' },
        { name: 'Ozuqa', slug: 'ozuqa' },
        { name: 'Dori-darmonlar', slug: 'dori-darmonlar' },
        { name: 'Parvarish vositalari', slug: 'parvarish-vositalari' },
        { name: 'Kiyimlar', slug: 'kiyimlar' },
        { name: 'Tasbehlar va jilovlar', slug: 'tasbehlar-jilovlar' },
        { name: 'Taqinchoqlar', slug: 'taqinchoqlar' },
        { name: 'Sport anjomlari', slug: 'sport-anjomlari' },
    ];

    for (const cat of categories) {
        await prisma.productCategory.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }

    console.log('✅ Product categories seeded!');

    // Get first category for sample products
    const egarCategory = await prisma.productCategory.findUnique({
        where: { slug: 'egar-jabduqlar' },
    });

    const ozuqaCategory = await prisma.productCategory.findUnique({
        where: { slug: 'ozuqa' },
    });

    if (egarCategory) {
        // Sample product 1
        const egarProduct = await prisma.product.upsert({
            where: { slug: 'qorabayir-egari' },
            update: {},
            create: {
                title: 'Qorabayir Egari (To\'liq komplekt)',
                slug: 'qorabayir-egari',
                categoryId: egarCategory.id,
                description: 'Qo\'lda yasalgan haqiqiy charm egar. To\'liq komplekt: egar, jabduq, uzangi, ko\'krakbon. O\'zbekistonda ishlab chiqarilgan. Sifati kafolatlangan.',
                priceAmount: 1500000,
                priceCurrency: 'UZS',
                hasDelivery: true,
                stockStatus: 'IN_STOCK',
                status: 'PUBLISHED',
                publishedAt: new Date(),
            },
        });
        // Update media (delete old, recreate)
        await prisma.productMedia.deleteMany({ where: { productId: egarProduct.id } });
        await prisma.productMedia.create({
            data: {
                productId: egarProduct.id,
                url: 'https://picsum.photos/seed/egar/800/600',
                thumbUrl: 'https://picsum.photos/seed/egar/400/300',
                sortOrder: 0,
            },
        });

        console.log('✅ Sample egar product created!');
    }

    if (ozuqaCategory) {
        // Sample product 2
        const ozuqaProduct = await prisma.product.upsert({
            where: { slug: 'maxsus-ot-ozuqasi' },
            update: {},
            create: {
                title: 'Maxsus ot ozuqasi "Champion"',
                slug: 'maxsus-ot-ozuqasi',
                categoryId: ozuqaCategory.id,
                description: 'Yuqori sifatli ot ozuqasi. Barcha kerakli vitaminlar va minerallar bilan boyitilgan. 25kg qop.',
                priceAmount: 250000,
                priceCurrency: 'UZS',
                hasDelivery: true,
                stockStatus: 'IN_STOCK',
                status: 'PUBLISHED',
                publishedAt: new Date(),
            },
        });
        // Update media (delete old, recreate)
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
