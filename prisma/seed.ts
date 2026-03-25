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
                { nameUz: 'Mirobod tumani', slug: 'mirobod' },
                { nameUz: 'Sirg\'ali tumani', slug: 'sirgali' },
                { nameUz: 'Shayxontohur tumani', slug: 'shayxontohur' },
                { nameUz: 'Olmazor tumani', slug: 'olmazor' },
                { nameUz: 'Uchtepa tumani', slug: 'uchtepa' },
                { nameUz: 'Yakkasaroy tumani', slug: 'yakkasaroy' },
                { nameUz: 'Yashnobod tumani', slug: 'yashnobod' },
                { nameUz: 'Yangihayot tumani', slug: 'yangihayot' },
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
                { nameUz: 'Yangiyo\'l shahri', slug: 'yangiyl-shahri' },
                { nameUz: 'Nurafshon shahri', slug: 'nurafshon' },
                { nameUz: 'Bekobod shahri', slug: 'bekobod-shahri' },
                { nameUz: 'Ohangaron shahri', slug: 'ohangaron-shahri' },
                { nameUz: 'Oqqo\'rg\'on tumani', slug: 'oqqorgon' },
                { nameUz: 'Ohangaron tumani', slug: 'ohangaron' },
                { nameUz: 'Bekobod tumani', slug: 'bekobod' },
                { nameUz: 'Bo\'ka tumani', slug: 'boka' },
                { nameUz: 'Bo\'stonliq tumani', slug: 'bustonliq' },
                { nameUz: 'Zangiota tumani', slug: 'zangiota' },
                { nameUz: 'Yuqorichirchiq tumani', slug: 'yuqorichirchiq' },
                { nameUz: 'Quyichirchiq tumani', slug: 'quyichirchiq' },
                { nameUz: 'O\'rtachirchiq tumani', slug: 'ortachirchiq' },
                { nameUz: 'Qibray tumani', slug: 'qibray' },
                { nameUz: 'Parkent tumani', slug: 'parkent' },
                { nameUz: 'Piskent tumani', slug: 'piskent' },
                { nameUz: 'Chinoz tumani', slug: 'chinoz' },
                { nameUz: 'Yangiyo\'l tumani', slug: 'yangiyl' },
                { nameUz: 'Toshkent tumani', slug: 'toshkent-tumani' },
            ],
        },
        {
            nameUz: 'Samarqand viloyati',
            nameRu: 'Самаркандская область',
            slug: 'samarqand',
            districts: [
                { nameUz: 'Samarqand shahri', slug: 'samarqand-shahri' },
                { nameUz: 'Kattaqo\'rg\'on shahri', slug: 'kattaqorgon-shahri' },
                { nameUz: 'Oqdaryo tumani', slug: 'oqdaryo' },
                { nameUz: 'Bulung\'ur tumani', slug: 'bulungur' },
                { nameUz: 'Ishtixon tumani', slug: 'ishtixon' },
                { nameUz: 'Jomboy tumani', slug: 'jomboy' },
                { nameUz: 'Kattaqo\'rg\'on tumani', slug: 'kattaqorgon' },
                { nameUz: 'Qo\'shrabot tumani', slug: 'qoshrabot' },
                { nameUz: 'Narpay tumani', slug: 'narpay' },
                { nameUz: 'Nurobod tumani', slug: 'nurobod' },
                { nameUz: 'Pastdarg\'om tumani', slug: 'pastdargom' },
                { nameUz: 'Paxtachi tumani', slug: 'paxtachi' },
                { nameUz: 'Payariq tumani', slug: 'payariq' },
                { nameUz: 'Samarqand tumani', slug: 'samarqand-tumani' },
                { nameUz: 'Tayloq tumani', slug: 'tayloq' },
                { nameUz: 'Urgut tumani', slug: 'urgut' },
            ],
        },
        {
            nameUz: 'Buxoro viloyati',
            nameRu: 'Бухарская область',
            slug: 'buxoro',
            districts: [
                { nameUz: 'Buxoro shahri', slug: 'buxoro-shahri' },
                { nameUz: 'Kogon shahri', slug: 'kogon-shahri' },
                { nameUz: 'Olot tumani', slug: 'olot' },
                { nameUz: 'Buxoro tumani', slug: 'buxoro-tumani' },
                { nameUz: 'Vobkent tumani', slug: 'vobkent' },
                { nameUz: 'G\'ijduvon tumani', slug: 'gijduvon' },
                { nameUz: 'Kogon tumani', slug: 'kogon' },
                { nameUz: 'Qorako\'l tumani', slug: 'qorakol' },
                { nameUz: 'Qorovulbozor tumani', slug: 'qorovulbozor' },
                { nameUz: 'Peshku tumani', slug: 'peshku' },
                { nameUz: 'Romitan tumani', slug: 'romitan' },
                { nameUz: 'Jondor tumani', slug: 'jondor' },
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
                { nameUz: 'Qo\'qon shahri', slug: 'qoqon' },
                { nameUz: 'Quvasoy shahri', slug: 'quvasoy' },
                { nameUz: 'Oltiariq tumani', slug: 'oltiariq' },
                { nameUz: 'Qo\'shtepa tumani', slug: 'qoshtepa' },
                { nameUz: 'Bog\'dod tumani', slug: 'bogdod' },
                { nameUz: 'Buvayda tumani', slug: 'buvayda' },
                { nameUz: 'Beshariq tumani', slug: 'beshariq' },
                { nameUz: 'Quva tumani', slug: 'quva' },
                { nameUz: 'Uchko\'prik tumani', slug: 'uchkuprik' },
                { nameUz: 'Rishton tumani', slug: 'rishton' },
                { nameUz: 'So\'x tumani', slug: 'soh' },
                { nameUz: 'Toshloq tumani', slug: 'toshloq' },
                { nameUz: 'O\'zbekiston tumani', slug: 'ozbekiston-tumani' },
                { nameUz: 'Farg\'ona tumani', slug: 'fargona-tumani' },
                { nameUz: 'Dang\'ara tumani', slug: 'dangara' },
                { nameUz: 'Furqat tumani', slug: 'furqat' },
                { nameUz: 'Yozyovon tumani', slug: 'yozyovon' },
            ],
        },
        {
            nameUz: 'Andijon viloyati',
            nameRu: 'Андижанская область',
            slug: 'andijon',
            districts: [
                { nameUz: 'Andijon shahri', slug: 'andijon-shahri' },
                { nameUz: 'Xonobod shahri', slug: 'xonobod' },
                { nameUz: 'Oltinko\'l tumani', slug: 'oltinkul' },
                { nameUz: 'Andijon tumani', slug: 'andijon-tumani' },
                { nameUz: 'Baliqchi tumani', slug: 'baliqchi' },
                { nameUz: 'Bo\'z tumani', slug: 'boz' },
                { nameUz: 'Buloqboshi tumani', slug: 'buloqboshi' },
                { nameUz: 'Jalaquduq tumani', slug: 'jalaquduq' },
                { nameUz: 'Izboskan tumani', slug: 'izboskan' },
                { nameUz: 'Ulug\'nor tumani', slug: 'ulugnor' },
                { nameUz: 'Qo\'rg\'ontepa tumani', slug: 'qorgontepa' },
                { nameUz: 'Asaka tumani', slug: 'asaka' },
                { nameUz: 'Marxamat tumani', slug: 'marhamat' },
                { nameUz: 'Shahrixon tumani', slug: 'shahrixon' },
                { nameUz: 'Paxtaobod tumani', slug: 'paxtaobod' },
                { nameUz: 'Xo\'jaobod tumani', slug: 'xojaobod' },
            ],
        },
        {
            nameUz: 'Namangan viloyati',
            nameRu: 'Наманганская область',
            slug: 'namangan',
            districts: [
                { nameUz: 'Namangan shahri', slug: 'namangan-shahri' },
                { nameUz: 'Mingbuloq tumani', slug: 'mingbuloq' },
                { nameUz: 'Kosonsoy tumani', slug: 'kosonsoy' },
                { nameUz: 'Namangan tumani', slug: 'namangan-tumani' },
                { nameUz: 'Norin tumani', slug: 'norin' },
                { nameUz: 'Pop tumani', slug: 'pop' },
                { nameUz: 'To\'raqo\'rg\'on tumani', slug: 'toraqorgon' },
                { nameUz: 'Uychi tumani', slug: 'uychi' },
                { nameUz: 'Uchqo\'rg\'on tumani', slug: 'uchqorgon' },
                { nameUz: 'Chortoq tumani', slug: 'chortoq' },
                { nameUz: 'Chust tumani', slug: 'chust' },
                { nameUz: 'Yangiqo\'rg\'on tumani', slug: 'yangiqorgon' },
                { nameUz: 'Davlatobod tumani', slug: 'davlatobod' },
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
                { nameUz: 'Qo\'shko\'pir tumani', slug: 'qoshkopir' },
                { nameUz: 'Urganch tumani', slug: 'urganch-tumani' },
                { nameUz: 'Xazorasp tumani', slug: 'xazorasp' },
                { nameUz: 'Xonqa tumani', slug: 'xonqa' },
                { nameUz: 'Xiva tumani', slug: 'xiva-tumani' },
                { nameUz: 'Shovot tumani', slug: 'shovot' },
                { nameUz: 'Yangiariq tumani', slug: 'yangiariq' },
                { nameUz: 'Yangibozor tumani', slug: 'yangibozor' },
                { nameUz: 'Tuproqqal\'a tumani', slug: 'tuproqqala' },
            ],
        },
        {
            nameUz: 'Qashqadaryo viloyati',
            nameRu: 'Кашкадарьинская область',
            slug: 'qashqadaryo',
            districts: [
                { nameUz: 'Qarshi shahri', slug: 'qarshi' },
                { nameUz: 'Shahrisabz shahri', slug: 'shahrisabz-shahri' },
                { nameUz: 'G\'uzor tumani', slug: 'guzor' },
                { nameUz: 'Dehqonobod tumani', slug: 'dehqonobod' },
                { nameUz: 'Qamashi tumani', slug: 'qamashi' },
                { nameUz: 'Qarshi tumani', slug: 'qarshi-tumani' },
                { nameUz: 'Koson tumani', slug: 'koson' },
                { nameUz: 'Kitob tumani', slug: 'kitob' },
                { nameUz: 'Mirishkor tumani', slug: 'mirishkor' },
                { nameUz: 'Muborak tumani', slug: 'muborak' },
                { nameUz: 'Nishon tumani', slug: 'nishon' },
                { nameUz: 'Kasbi tumani', slug: 'kasbi' },
                { nameUz: 'Chiroqchi tumani', slug: 'chiroqchi' },
                { nameUz: 'Shahrisabz tumani', slug: 'shahrisabz' },
                { nameUz: 'Yakkabog\' tumani', slug: 'yakkabog' },
                { nameUz: 'Ko\'kdala tumani', slug: 'kokdala' },
            ],
        },
        {
            nameUz: 'Surxondaryo viloyati',
            nameRu: 'Сурхандарьинская область',
            slug: 'surxondaryo',
            districts: [
                { nameUz: 'Termiz shahri', slug: 'termiz' },
                { nameUz: 'Oltinsoy tumani', slug: 'oltinsoy' },
                { nameUz: 'Angor tumani', slug: 'angor' },
                { nameUz: 'Boysun tumani', slug: 'boysun' },
                { nameUz: 'Muzrabot tumani', slug: 'muzrabot' },
                { nameUz: 'Denov tumani', slug: 'denov' },
                { nameUz: 'Jarqo\'rg\'on tumani', slug: 'jarqorgon' },
                { nameUz: 'Qumqo\'rg\'on tumani', slug: 'qumqorgon' },
                { nameUz: 'Qiziriq tumani', slug: 'qiziriq' },
                { nameUz: 'Sariosiyo tumani', slug: 'sariosiyo' },
                { nameUz: 'Termiz tumani', slug: 'termiz-tumani' },
                { nameUz: 'Uzun tumani', slug: 'uzun' },
                { nameUz: 'Sherobod tumani', slug: 'sherobod' },
                { nameUz: 'Sho\'rchi tumani', slug: 'shorchi' },
                { nameUz: 'Bandixon tumani', slug: 'bandixon' },
            ],
        },
        {
            nameUz: 'Navoiy viloyati',
            nameRu: 'Навоийская область',
            slug: 'navoiy',
            districts: [
                { nameUz: 'Navoiy shahri', slug: 'navoiy-shahri' },
                { nameUz: 'Zarafshon shahri', slug: 'zarafshon' },
                { nameUz: 'G\'ozg\'on shahri', slug: 'gozgon' },
                { nameUz: 'Konimex tumani', slug: 'konimex' },
                { nameUz: 'Qiziltepa tumani', slug: 'qiziltepa' },
                { nameUz: 'Navbahor tumani', slug: 'navbahor' },
                { nameUz: 'Karmana tumani', slug: 'karmana' },
                { nameUz: 'Nurota tumani', slug: 'nurota' },
                { nameUz: 'Tomdi tumani', slug: 'tomdi' },
                { nameUz: 'Uchquduq tumani', slug: 'uchquduq' },
                { nameUz: 'Xatirchi tumani', slug: 'xatirchi' },
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
                { nameUz: 'G\'allaorol tumani', slug: 'gallaorol' },
                { nameUz: 'Sh.Rashidov tumani', slug: 'sharashidov' },
                { nameUz: 'Do\'stlik tumani', slug: 'dustlik' },
                { nameUz: 'Zomin tumani', slug: 'zomin' },
                { nameUz: 'Zarbdor tumani', slug: 'zarbdor' },
                { nameUz: 'Mirzacho\'l tumani', slug: 'mirzachul' },
                { nameUz: 'Zafarobod tumani', slug: 'zafarobod' },
                { nameUz: 'Paxtakor tumani', slug: 'paxtakor' },
                { nameUz: 'Forish tumani', slug: 'forish' },
                { nameUz: 'Yangiobod tumani', slug: 'yangiobod' },
            ],
        },
        {
            nameUz: 'Sirdaryo viloyati',
            nameRu: 'Сырдарьинская область',
            slug: 'sirdaryo',
            districts: [
                { nameUz: 'Guliston shahri', slug: 'guliston' },
                { nameUz: 'Yangiyer shahri', slug: 'yangiyer' },
                { nameUz: 'Shirin shahri', slug: 'shirin' },
                { nameUz: 'Baxt shahri', slug: 'baxt' },
                { nameUz: 'Oqoltin tumani', slug: 'oqoltin' },
                { nameUz: 'Boyovut tumani', slug: 'boyovut' },
                { nameUz: 'Sayxunobod tumani', slug: 'sayxunobod' },
                { nameUz: 'Guliston tumani', slug: 'guliston-tumani' },
                { nameUz: 'Sardoba tumani', slug: 'sardoba' },
                { nameUz: 'Mirzaobod tumani', slug: 'mirzaobod' },
                { nameUz: 'Sirdaryo tumani', slug: 'sirdaryo-tumani' },
                { nameUz: 'Xovos tumani', slug: 'xovos' },
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
                { nameUz: 'Qorao\'zak tumani', slug: 'qoraozak' },
                { nameUz: 'Kegeyli tumani', slug: 'kegeyli' },
                { nameUz: 'Qo\'ng\'irot tumani', slug: 'qongirot' },
                { nameUz: 'Qanliko\'l tumani', slug: 'qanlikol' },
                { nameUz: 'Mo\'ynoq tumani', slug: 'moynoq' },
                { nameUz: 'Nukus tumani', slug: 'nukus-tumani' },
                { nameUz: 'Taxiatosh tumani', slug: 'taxiatosh' },
                { nameUz: 'Taxtako\'pir tumani', slug: 'taxtakopir' },
                { nameUz: 'To\'rtko\'l tumani', slug: 'tortkol' },
                { nameUz: 'Xo\'jayli tumani', slug: 'xojayli' },
                { nameUz: 'Chimboy tumani', slug: 'chimboy' },
                { nameUz: 'Shumanay tumani', slug: 'shumanay' },
                { nameUz: 'Ellikqal\'a tumani', slug: 'ellikqala' },
                { nameUz: 'Bo\'zatov tumani', slug: 'bozatov' },
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

    // Create breeds (qoramol zotlari)
    const breeds = [
        { name: 'Mahalliy zot', slug: 'mahalliy', description: "O'zbekiston mahalliy qoramol zoti" },
        { name: 'Qorabosh', slug: 'qorabosh', description: 'Kuchli va sut beruvchi zot' },
        { name: 'Hereford', slug: 'hereford', description: "Go'sht uchun mashhur xorijiy zot" },
        { name: 'Angus', slug: 'angus', description: "Yuqori sifatli go'sht zoti" },
        { name: 'Simental', slug: 'simental', description: "Go'sht-sut kombinatsiyali zot" },
        { name: 'Holshteyn', slug: 'holshteyn', description: 'Yuqori sut mahsuldorligi' },
        { name: "Qozoq oq boshi", slug: 'qozoq-oq-boshi', description: "Qozog'iston go'sht zoti" },
        { name: 'Qalmoq', slug: 'qalmoq', description: "Chidamli va ko'p go'shtli zot" },
        { name: 'Limuzin', slug: 'limuzin', description: "Frantsuz go'sht zoti" },
        { name: "Sharo'le", slug: 'sharolle', description: "Yirik tanali go'sht zoti" },
        { name: 'Aberdin-Angus', slug: 'aberdin-angus', description: "Shotlandiya go'sht zoti" },
        { name: 'Jersey', slug: 'jersey', description: "Yog'li sut beruvchi zot" },
        { name: 'Aralash zot', slug: 'aralash', description: 'Aralash zot' },
        { name: 'Boshqa', slug: 'boshqa', description: 'Boshqa zot' },
    ];

    for (const breed of breeds) {
        await prisma.breed.upsert({
            where: { slug: breed.slug },
            update: breed,
            create: breed,
        });
    }

    console.log('✅ Breeds seeded');

    // Create sheep & goat breeds (qo'y va echki zotlari)
    const sheepBreeds = [
        { name: "Qoraqo'l", slug: 'qarakul', description: "O'zbekiston mahalliy qo'y zoti, jun uchun", animalType: 'QOY' },
        { name: "Hissor", slug: 'hissor', description: "Tojikiston go'sht-yog' zoti", animalType: 'QOY' },
        { name: "Jyddi", slug: 'jyddi', description: "Go'sht uchun mahalliy zot", animalType: 'QOY' },
        { name: "Romanov", slug: 'romanov', description: "Ko'p tug'adigan rus zoti", animalType: 'QOY' },
        { name: "Edilbay", slug: 'edilbay', description: "Qozog'iston yog'-go'sht zoti", animalType: 'QOY' },
        { name: "Merinos", slug: 'merinos', description: "Nozik jun beruvchi zot", animalType: 'QOY' },
        { name: "Dorper", slug: 'dorper', description: "Janubiy Afrika go'sht zoti", animalType: 'QOY' },
        { name: "Aralash qo'y zoti", slug: 'aralash-qoy', description: "Aralash zot", animalType: 'QOY' },
        { name: "Boshqa qo'y zoti", slug: 'boshqa-qoy', description: "Boshqa zot", animalType: 'QOY' },
        { name: "Zanen echki", slug: 'zanen', description: "Ko'p sut beruvchi Shveytsariya echkisi", animalType: 'ECHKI' },
        { name: "Toggenburg", slug: 'toggenburg', description: "Sut echkisi", animalType: 'ECHKI' },
        { name: "Mahalliy echki", slug: 'mahalliy-echki', description: "O'zbekiston mahalliy echkisi", animalType: 'ECHKI' },
        { name: "Buyr echki", slug: 'buyr', description: "Go'sht echkisi", animalType: 'ECHKI' },
        { name: "Boshqa echki zoti", slug: 'boshqa-echki', description: "Boshqa zot", animalType: 'ECHKI' },
    ];

    for (const breed of sheepBreeds) {
        await prisma.sheepBreed.upsert({
            where: { slug: breed.slug },
            update: breed,
            create: breed,
        });
    }

    console.log('✅ Sheep & goat breeds seeded');

    // Create default Admin user with credentials from .env
    console.log('Creating default Admin user...');

    const bcrypt = require('bcrypt');
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.user.upsert({
        where: { username: adminUsername },
        update: {
            password: hashedPassword,
            isAdmin: true,
            isVerified: true,
            status: 'ACTIVE',
        },
        create: {
            username: adminUsername,
            password: hashedPassword,
            displayName: 'Admin',
            isAdmin: true,
            isVerified: true,
            status: 'ACTIVE',
        },
    });

    console.log('✅ Admin user created/updated');
    console.log(`   🔐 Username: ${adminUsername}`);
    console.log(`   🔐 Password: ${adminPassword}`);

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
