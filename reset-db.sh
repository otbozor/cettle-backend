#!/bin/bash
# Database'ni tozalash va qayta seed qilish

echo "⚠️  Database reset boshlandi..."

# Reset database
npx prisma migrate reset --force

echo "✅ Database reset tugadi!"
echo "🌱 Seed fayllar avtomatik ishga tushdi"
echo ""
echo "Admin login:"
echo "  Username: admin"
echo "  Password: admin123"
