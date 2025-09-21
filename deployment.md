# 🚀 Deployment Guide

## Environment Variables Required

### For Development (.env.local):
```
DATABASE_PROVIDER="sqlite"
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-super-secret-key-change-this"
NEXTAUTH_URL="http://localhost:3000"
```

### For Production (Vercel Environment Variables):
```
DATABASE_PROVIDER="postgresql"
DATABASE_URL="your-supabase-postgresql-url"
NEXTAUTH_SECRET="generate-a-strong-secret-key"
NEXTAUTH_URL="https://your-app-name.vercel.app"
```

## Deployment Steps

1. **Push to GitHub**
2. **Set up Supabase Database**
3. **Deploy to Vercel**
4. **Configure Environment Variables**
5. **Run Database Migrations**

## Free Services Used
- **Vercel**: Hosting (100GB bandwidth/month)
- **Supabase**: PostgreSQL Database (500MB free)
- **GitHub**: Source code repository
