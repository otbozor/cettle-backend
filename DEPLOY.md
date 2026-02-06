# Render.com ga Deploy qilish

## 1. Render.com da yangi Web Service yaratish

1. [Render.com](https://render.com) ga kiring
2. **New +** → **Web Service** ni tanlang
3. GitHub repository'ni ulang

## 2. Sozlamalar

### Build & Deploy Settings:
- **Name**: `otbozor-api`
- **Region**: `Frankfurt (EU Central)` yoki `Singapore`
- **Branch**: `main`
- **Root Directory**: `horse-backend`
- **Environment**: `Node`
- **Build Command**: 
  ```bash
  npm ci && npm run build && npx prisma migrate deploy && npm run prisma:seed
  ```
- **Start Command**: 
  ```bash
  npm run start:prod
  ```

**Eslatma:** Build command'da `npm run prisma:seed` qo'shilgan - bu seed ma'lumotlarini avtomatik yuklaydi.

### Environment Variables:

Quyidagi environment variable'larni qo'shing:

```bash
# Database (Render PostgreSQL dan avtomatik)
DATABASE_URL=<Render PostgreSQL connection string>

# JWT (Generate qiling)
JWT_SECRET=<random-secret-key-32-characters>
JWT_REFRESH_SECRET=<random-secret-key-32-characters>
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Admin User (Seed uchun)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<kuchli-parol-kiriting>

# Telegram Bot
TELEGRAM_BOT_TOKEN=<your-telegram-bot-token>
TELEGRAM_BOT_USERNAME=<your-bot-username>

# App URLs
PORT=5000
NODE_ENV=production
APP_URL=<your-frontend-url>
API_URL=<your-render-backend-url>
CORS_ORIGIN=<your-frontend-url>
```

**MUHIM:** `NODE_ENV=production` o'rnatilishi shart! Bu cookie sozlamalarini to'g'ri ishlashi uchun kerak.

## 3. PostgreSQL Database yaratish

1. Render Dashboard → **New +** → **PostgreSQL**
2. **Name**: `otbozor-db`
3. **Database**: `otbozor`
4. **User**: `otbozor`
5. **Region**: Backend bilan bir xil region tanlang
6. **Plan**: `Free`

Database yaratilgandan keyin:
- **Internal Database URL** ni nusxalang
- Backend service'da `DATABASE_URL` environment variable'ga qo'ying

## 4. Deploy qilish

1. **Create Web Service** tugmasini bosing
2. Render avtomatik build va deploy qiladi
3. Deploy tugagach, URL paydo bo'ladi: `https://otbozor-api.onrender.com`

## 5. Prisma Migration va Seed

Deploy jarayonida avtomatik bajariladi:

```bash
# Build command'da:
npm ci && npm run build && npx prisma migrate deploy && npm run prisma:seed
```

Bu quyidagilarni bajaradi:
1. ✅ Database schema yaratadi (migration)
2. ✅ 14 ta viloyat va 100+ tuman qo'shadi
3. ✅ 11 ta ot zoti qo'shadi
4. ✅ Admin user yaratadi

**Seed ma'lumotlari:**
- Regions: Toshkent, Samarqand, Buxoro, Farg'ona, va boshqalar
- Districts: Har bir viloyat uchun tumanlar
- Breeds: Karabayir, Qorabo'g'oz, Lokayi, Arab, va boshqalar
- Admin: Username va password environment variable'dan olinadi

Agar seed qayta ishlatish kerak bo'lsa, Render Shell'dan:
```bash
npm run prisma:seed
```

## 6. Frontend'ni yangilash

Frontend `.env.local` faylida:

```bash
NEXT_PUBLIC_API_URL=https://otbozor-api.onrender.com
```

## 7. CORS sozlash

Backend `main.ts` da CORS sozlamalari:

```typescript
app.enableCors({
    origin: process.env.APP_URL || 'http://localhost:3000',
    credentials: true,
});
```

`APP_URL` environment variable'ga frontend URL'ni qo'ying.

## Muhim eslatmalar:

- ✅ Free plan'da service 15 daqiqa ishlatilmasa uxlaydi
- ✅ Birinchi request 30-50 soniya davom etishi mumkin
- ✅ PostgreSQL free plan: 1GB storage, 90 kun keyin o'chiriladi
- ✅ Uploads uchun S3/Cloudinary ishlatish tavsiya etiladi
- ✅ Environment variable'larni `.env` faylga qo'ymang (gitignore)

## Troubleshooting:

### Login qilgandan keyin profil ochilmayapti:
```bash
# 1. Render.com'da NODE_ENV=production ekanligini tekshiring
# 2. Frontend NEXT_PUBLIC_API_URL to'g'ri ekanligini tekshiring
# 3. Browser DevTools → Application → Cookies → accessToken borligini tekshiring
# 4. Browser DevTools → Application → Local Storage → accessToken borligini tekshiring
# 5. Backend logs'da CORS xatosi yo'qligini tekshiring
```

### Build xatosi:
```bash
# Logs'ni tekshiring
# Render Dashboard → Service → Logs
```

### Database connection xatosi:
```bash
# DATABASE_URL to'g'ri ekanligini tekshiring
# Internal Database URL ishlatilganligini tasdiqlang
```

### Prisma xatosi:
```bash
# Prisma generate va migrate deploy bajarilganligini tekshiring
npm run build
```
