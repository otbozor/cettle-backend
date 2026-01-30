import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create regions and districts
    const regions = [
        {
            nameUz: 'Toshkent shahri',
            nameRu: 'Город Ташкент',
            slug: 'toshkent-shahri',
            districts: [
                { nameUz: 'Bektemir tumani', slug: 'bektemir' },
                { nameUz: 'Chilonzor tumani', slug: 'chilonzor' },
                { nameUz: 'Mirzo Ulug\'bek tumani', slug: 'mirzo-ulugbek' },
                { nameUz: 'Sergeli tumani', slug: 'sergeli' },
                { nameUz: 'Shayxontohur tumani', slug: 'shayxontohur' },
                { nameUz: 'Olmazor tumani', slug: 'olmazor' },
                { nameUz: 'Uchtepa tumani', slug: 'uchtepa' },
                { nameUz: 'Yakkasaroy tumani', slug: 'yakkasaroy' },
                { nameUz: 'Yunusobod tumani', slug: 'yunusobod' },
            ],
        },
        {
            nameUz: 'Toshkent viloyati',
            nameRu: 'Ташкентская область',
            slug: 'toshkent-viloyati',
            districts: [
                { nameUz: 'Angren shahri', slug: 'angren' },
                { nameUz: 'Olmaliq shahri', slug: 'olmaliq' },
                { nameUz: 'Chirchiq shahri', slug: 'chirchiq' },
                { nameUz: 'Bekobod tumani', slug: 'bekobod' },
                { nameUz: 'Bo\'stonliq tumani', slug: 'bustonliq' },
                { nameUz: 'Zangiota tumani', slug: 'zangiota' },
                { nameUz: 'Qibray tumani', slug: 'qibray' },
                { nameUz: 'Parkent tumani', slug: 'parkent' },
            ],
        },
        {
            nameUz: 'Samarqand viloyati',
            nameRu: 'Самаркандская область',
            slug: 'samarqand',
            districts: [
                { nameUz: 'Samarqand shahri', slug: 'samarqand-shahri' },
                { nameUz: 'Bulung\'ur tumani', slug: 'bulungur' },
                { nameUz: 'Ishtixon tumani', slug: 'ishtixon' },
                { nameUz: 'Jomboy tumani', slug: 'jomboy' },
                { nameUz: 'Kattaqo\'rg\'on tumani', slug: 'kattaqorgon' },
                { nameUz: 'Narpay tumani', slug: 'narpay' },
                { nameUz: 'Pastdarg\'om tumani', slug: 'pastdargom' },
                { nameUz: 'Payariq tumani', slug: 'payariq' },
            ],
        },
        {
            nameUz: 'Buxoro viloyati',
            nameRu: 'Бухарская область',
            slug: 'buxoro',
            districts: [
                { nameUz: 'Buxoro shahri', slug: 'buxoro-shahri' },
                { nameUz: 'G\'ijduvon tumani', slug: 'gijduvon' },
                { nameUz: 'Jondor tumani', slug: 'jondor' },
                { nameUz: 'Kogon tumani', slug: 'kogon' },
                { nameUz: 'Olot tumani', slug: 'olot' },
                { nameUz: 'Qorako\'l tumani', slug: 'qorakol' },
                { nameUz: 'Romitan tumani', slug: 'romitan' },
                { nameUz: 'Shofirkon tumani', slug: 'shofirkon' },
            ],
        },
        {
            nameUz: 'Farg\'ona viloyati',
            nameRu: 'Ферганская область',
            slug: 'fargona',
            districts: [
                { nameUz: 'Farg\'ona shahri', slug: 'fargona-shahri' },
                { nameUz: 'Marg\'ilon shahri', slug: 'margilon' },
                { nameUz: 'Quva tumani', slug: 'quva' },
                { nameUz: 'Rishton tumani', slug: 'rishton' },
                { nameUz: 'So\'x tumani', slug: 'soh' },
                { nameUz: 'Uchko\'prik tumani', slug: 'uchkuprik' },
                { nameUz: 'Yozyovon tumani', slug: 'yozyovon' },
            ],
        },
        {
            nameUz: 'Andijon viloyati',
            nameRu: 'Андижанская область',
            slug: 'andijon',
            districts: [
                { nameUz: 'Andijon shahri', slug: 'andijon-shahri' },
                { nameUz: 'Asaka tumani', slug: 'asaka' },
                { nameUz: 'Baliqchi tumani', slug: 'baliqchi' },
                { nameUz: 'Jalaquduq tumani', slug: 'jalaquduq' },
                { nameUz: 'Marhamat tumani', slug: 'marhamat' },
                { nameUz: 'Oltinko\'l tumani', slug: 'oltinkul' },
                { nameUz: 'Shahrixon tumani', slug: 'shahrixon' },
            ],
        },
        {
            nameUz: 'Namangan viloyati',
            nameRu: 'Наманганская область',
            slug: 'namangan',
            districts: [
                { nameUz: 'Namangan shahri', slug: 'namangan-shahri' },
                { nameUz: 'Chortoq tumani', slug: 'chortoq' },
                { nameUz: 'Chust tumani', slug: 'chust' },
                { nameUz: 'Kosonsoy tumani', slug: 'kosonsoy' },
                { nameUz: 'Mingbuloq tumani', slug: 'mingbuloq' },
                { nameUz: 'Pop tumani', slug: 'pop' },
                { nameUz: 'Uchqo\'rg\'on tumani', slug: 'uchqorgon' },
            ],
        },
        {
            nameUz: 'Xorazm viloyati',
            nameRu: 'Хорезмская область',
            slug: 'xorazm',
            districts: [
                { nameUz: 'Urganch shahri', slug: 'urganch' },
                { nameUz: 'Xiva shahri', slug: 'xiva' },
                { nameUz: 'Bog\'ot tumani', slug: 'bogot' },
                { nameUz: 'Gurlan tumani', slug: 'gurlan' },
                { nameUz: 'Shovot tumani', slug: 'shovot' },
                { nameUz: 'Yangiariq tumani', slug: 'yangiariq' },
                { nameUz: 'Yangibozor tumani', slug: 'yangibozor' },
            ],
        },
        {
            nameUz: 'Qashqadaryo viloyati',
            nameRu: 'Кашкадарьинская область',
            slug: 'qashqadaryo',
            districts: [
                { nameUz: 'Qarshi shahri', slug: 'qarshi' },
                { nameUz: 'Shahrisabz tumani', slug: 'shahrisabz' },
                { nameUz: 'Chiroqchi tumani', slug: 'chiroqchi' },
                { nameUz: 'Dehqonobod tumani', slug: 'dehqonobod' },
                { nameUz: 'G\'uzor tumani', slug: 'guzor' },
                { nameUz: 'Kasbi tumani', slug: 'kasbi' },
                { nameUz: 'Kitob tumani', slug: 'kitob' },
                { nameUz: 'Koson tumani', slug: 'koson' },
            ],
        },
        {
            nameUz: 'Surxondaryo viloyati',
            nameRu: 'Сурхандарьинская область',
            slug: 'surxondaryo',
            districts: [
                { nameUz: 'Termiz shahri', slug: 'termiz' },
                { nameUz: 'Angor tumani', slug: 'angor' },
                { nameUz: 'Boysun tumani', slug: 'boysun' },
                { nameUz: 'Denov tumani', slug: 'denov' },
                { nameUz: 'Jarqo\'rg\'on tumani', slug: 'jarqorgon' },
                { nameUz: 'Muzrabot tumani', slug: 'muzrabot' },
                { nameUz: 'Sherobod tumani', slug: 'sherobod' },
            ],
        },
        {
            nameUz: 'Navoiy viloyati',
            nameRu: 'Навоийская область',
            slug: 'navoiy',
            districts: [
                { nameUz: 'Navoiy shahri', slug: 'navoiy-shahri' },
                { nameUz: 'Zarafshon shahri', slug: 'zarafshon' },
                { nameUz: 'Karmana tumani', slug: 'karmana' },
                { nameUz: 'Konimex tumani', slug: 'konimex' },
                { nameUz: 'Navbahor tumani', slug: 'navbahor' },
                { nameUz: 'Nurota tumani', slug: 'nurota' },
                { nameUz: 'Tomdi tumani', slug: 'tomdi' },
            ],
        },
        {
            nameUz: 'Jizzax viloyati',
            nameRu: 'Джизакская область',
            slug: 'jizzax',
            districts: [
                { nameUz: 'Jizzax shahri', slug: 'jizzax-shahri' },
                { nameUz: 'Arnasoy tumani', slug: 'arnasoy' },
                { nameUz: 'Baxmal tumani', slug: 'baxmal' },
                { nameUz: 'Do\'stlik tumani', slug: 'dustlik' },
                { nameUz: 'Forish tumani', slug: 'forish' },
                { nameUz: 'G\'allaorol tumani', slug: 'gallaorol' },
                { nameUz: 'Mirzacho\'l tumani', slug: 'mirzachul' },
            ],
        },
        {
            nameUz: 'Sirdaryo viloyati',
            nameRu: 'Сырдарьинская область',
            slug: 'sirdaryo',
            districts: [
                { nameUz: 'Guliston shahri', slug: 'guliston' },
                { nameUz: 'Yangiyer shahri', slug: 'yangiyer' },
                { nameUz: 'Boyovut tumani', slug: 'boyovut' },
                { nameUz: 'Mirzaobod tumani', slug: 'mirzaobod' },
                { nameUz: 'Oqoltin tumani', slug: 'oqoltin' },
                { nameUz: 'Sayxunobod tumani', slug: 'sayxunobod' },
                { nameUz: 'Sardoba tumani', slug: 'sardoba' },
            ],
        },
        {
            nameUz: 'Qoraqalpog\'iston Respublikasi',
            nameRu: 'Республика Каракалпакстан',
            slug: 'qoraqalpogiston',
            districts: [
                { nameUz: 'Nukus shahri', slug: 'nukus' },
                { nameUz: 'Amudaryo tumani', slug: 'amudaryo' },
                { nameUz: 'Beruniy tumani', slug: 'beruniy' },
                { nameUz: 'Chimboy tumani', slug: 'chimboy' },
                { nameUz: 'Ellikqala tumani', slug: 'ellikqala' },
                { nameUz: 'Mo\'ynoq tumani', slug: 'moynoq' },
                { nameUz: 'Qo\'ng\'irot tumani', slug: 'qongirot' },
                { nameUz: 'Xo\'jayli tumani', slug: 'xojayli' },
            ],
        },
    ];

    for (const regionData of regions) {
        const { districts, ...region } = regionData;

        const createdRegion = await prisma.region.upsert({
            where: { slug: region.slug },
            update: region,
            create: region,
        });

        for (const district of districts) {
            await prisma.district.upsert({
                where: { slug: district.slug },
                update: { ...district, regionId: createdRegion.id },
                create: { ...district, regionId: createdRegion.id },
            });
        }
    }

    console.log('✅ Regions and districts seeded');

    // Create breeds
    const breeds = [
        { name: 'Karabayir', slug: 'karabayir', description: 'O\'zbekistonning an\'anaviy ot zoti' },
        { name: 'Qorabo\'g\'oz', slug: 'qorabogoz', description: 'Kuchli va chidamli ot zoti' },
        { name: 'Lokayi', slug: 'lokayi', description: 'Tog\' sharoitlariga moslashgan zot' },
        { name: 'Ko\'pakcha', slug: 'kopakcha', description: 'Kichik bo\'yli, chaqqon otlar' },
        { name: 'Arab', slug: 'arab', description: 'Arabiston yarim orolidan kelgan zot' },
        { name: 'Axaltekin', slug: 'axaltekin', description: 'Turkmanistondan kelgan nozik otlar' },
        { name: 'Don', slug: 'don', description: 'Rossiya Don daryosi bo\'yidan' },
        { name: 'Budyonnovsk', slug: 'budyonnovsk', description: 'Sport uchun yetishtirilgan zot' },
        { name: 'Orlov', slug: 'orlov', description: 'Rossiya trotter zoti' },
        { name: 'Aralash', slug: 'aralash', description: 'Aralash zot' },
        { name: 'Noma\'lum', slug: 'nomalum', description: 'Zoti aniqlanmagan' },
    ];

    for (const breed of breeds) {
        await prisma.breed.upsert({
            where: { slug: breed.slug },
            update: breed,
            create: breed,
        });
    }

    console.log('✅ Breeds seeded');

    // Create admin roles and permissions
    const permissions = [
        { key: 'admin.access', description: 'Access admin panel' },
        { key: 'listings.view', description: 'View all listings' },
        { key: 'listings.approve', description: 'Approve listings' },
        { key: 'listings.reject', description: 'Reject listings' },
        { key: 'listings.edit', description: 'Edit any listing' },
        { key: 'listings.delete', description: 'Delete listings' },
        { key: 'users.view', description: 'View users' },
        { key: 'users.ban', description: 'Ban users' },
        { key: 'users.unban', description: 'Unban users' },
        { key: 'blog.manage', description: 'Manage blog posts' },
        { key: 'events.manage', description: 'Manage events' },
        { key: 'products.manage', description: 'Manage products' },
        { key: 'settings.manage', description: 'Manage settings' },
        { key: 'roles.manage', description: 'Manage roles' },
    ];

    for (const permission of permissions) {
        await prisma.permission.upsert({
            where: { key: permission.key },
            update: permission,
            create: permission,
        });
    }

    console.log('✅ Permissions seeded');

    // Create roles
    const superAdminRole = await prisma.adminRole.upsert({
        where: { name: 'Super Admin' },
        update: { description: 'Full access to everything' },
        create: { name: 'Super Admin', description: 'Full access to everything' },
    });

    const moderatorRole = await prisma.adminRole.upsert({
        where: { name: 'Moderator' },
        update: { description: 'Can approve/reject listings' },
        create: { name: 'Moderator', description: 'Can approve/reject listings' },
    });

    const contentManagerRole = await prisma.adminRole.upsert({
        where: { name: 'Content Manager' },
        update: { description: 'Can manage blog and events' },
        create: { name: 'Content Manager', description: 'Can manage blog and events' },
    });

    // Assign all permissions to Super Admin
    const allPermissions = await prisma.permission.findMany();
    for (const permission of allPermissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: superAdminRole.id,
                    permissionId: permission.id,
                },
            },
            update: {},
            create: {
                roleId: superAdminRole.id,
                permissionId: permission.id,
            },
        });
    }

    // Assign moderator permissions
    const moderatorPermissions = ['admin.access', 'listings.view', 'listings.approve', 'listings.reject', 'listings.edit'];
    for (const key of moderatorPermissions) {
        const permission = await prisma.permission.findUnique({ where: { key } });
        if (permission) {
            await prisma.rolePermission.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: moderatorRole.id,
                        permissionId: permission.id,
                    },
                },
                update: {},
                create: {
                    roleId: moderatorRole.id,
                    permissionId: permission.id,
                },
            });
        }
    }

    // Assign content manager permissions
    const contentPermissions = ['admin.access', 'blog.manage', 'events.manage'];
    for (const key of contentPermissions) {
        const permission = await prisma.permission.findUnique({ where: { key } });
        if (permission) {
            await prisma.rolePermission.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: contentManagerRole.id,
                        permissionId: permission.id,
                    },
                },
                update: {},
                create: {
                    roleId: contentManagerRole.id,
                    permissionId: permission.id,
                },
            });
        }
    }

    console.log('✅ Roles and permissions assigned');

    // Create default Super Admin user with username/password
    console.log('Creating default Super Admin user...');

    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash('admin123', 10); // Default password

    const defaultSuperAdmin = await prisma.user.upsert({
        where: {
            username: 'superadmin' // Username-based login
        },
        update: {
            displayName: 'Super Admin',
            password: hashedPassword,
            isVerified: true,
            status: 'ACTIVE',
        },
        create: {
            username: 'superadmin',
            password: hashedPassword,
            displayName: 'Super Admin',
            isVerified: true,
            status: 'ACTIVE',
            // No Telegram ID needed for admin
        },
    });

    // Assign Super Admin role to default user
    await prisma.adminUserRole.upsert({
        where: {
            userId_roleId: {
                userId: defaultSuperAdmin.id,
                roleId: superAdminRole.id,
            },
        },
        update: {},
        create: {
            userId: defaultSuperAdmin.id,
            roleId: superAdminRole.id,
        },
    });

    console.log('✅ Default Super Admin created');
    console.log('   🔐 Username: superadmin');
    console.log('   🔐 Password: admin123');
    console.log('   ⚠️  IMPORTANT: Change password in production!');
    console.log('   📍 Login URL: POST /api/auth/admin/login');

    // Create sample blog categories
    const blogCategories = [
        { name: 'Ot parvarishi', slug: 'ot-parvarishi' },
        { name: 'Ko\'pkari', slug: 'kopkari' },
        { name: 'Sog\'liq', slug: 'sogliq' },
        { name: 'Ozuqa', slug: 'ozuqa' },
        { name: 'Mashg\'ulotlar', slug: 'mashgulotlar' },
    ];

    for (const category of blogCategories) {
        await prisma.blogCategory.upsert({
            where: { slug: category.slug },
            update: category,
            create: category,
        });
    }

    console.log('✅ Blog categories seeded');

    // Create product categories
    const productCategories = [
        { name: 'Egar-jabduqlar', slug: 'egar-jabduqlar' },
        { name: 'Ozuqa va qo\'shimchalar', slug: 'ozuqa-qoshimchalar' },
        { name: 'Kiyim-kechak', slug: 'kiyim-kechak' },
        { name: 'Ot uchun aksessuarlar', slug: 'aksessuarlar' },
        { name: 'Dori-darmonlar', slug: 'dori-darmonlar' },
    ];

    for (const category of productCategories) {
        await prisma.productCategory.upsert({
            where: { slug: category.slug },
            update: category,
            create: category,
        });
    }

    console.log('✅ Product categories seeded');

    console.log('🎉 Database seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
