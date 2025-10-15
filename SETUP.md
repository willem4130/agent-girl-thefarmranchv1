# 🚀 Quick Setup Guide

## Step 1: Environment Setup

You'll need to set up Vercel Postgres and Blob storage. Here's the quick guide:

### Option A: Use Vercel (Recommended for Production)

1. **Create Vercel Account**: Go to https://vercel.com/signup
2. **Create Postgres Database**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login and link project
   vercel link

   # Create Postgres database
   vercel storage create postgres
   ```

3. **Create Blob Storage**:
   ```bash
   vercel storage create blob
   ```

4. **Pull Environment Variables**:
   ```bash
   vercel env pull .env.local
   ```

### Option B: Local Development (SQLite + Local Storage)

For quick local testing without Vercel:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```

2. Comment out Vercel Blob in upload code (use local filesystem)

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Database Setup

```bash
# Push schema to database
npm run db:push
```

## Step 4: Create Admin User

### Using Prisma Studio (Easiest):
```bash
npm run db:studio
```

1. Open http://localhost:5555
2. Click "User" table
3. Add new record:
   - email: `admin@farmranchmedia.com`
   - name: `Admin`
   - role: `ADMIN`
   - password: Use the hash below

### Generate Password Hash:

```bash
node -e "console.log(require('bcryptjs').hashSync('changeme123', 10))"
```

Copy the output and use it as the password field.

## Step 5: Run Development Server

```bash
npm run dev
```

Visit:
- Homepage: http://localhost:3003
- Login: http://localhost:3003/login
- Dashboard: http://localhost:3003/dashboard (after login)
- Gallery: http://localhost:3003/gallery

## Step 6: Upload Your First Images

1. Login with admin credentials
2. Navigate to Upload page
3. Drag & drop images
4. Click "Upload"

## 🎉 Done!

Your gallery should now be running with:
- ✅ Automatic watermarking
- ✅ Thumbnail generation
- ✅ Virtual scrolling gallery
- ✅ Lightbox viewer

## Next Steps

- [ ] Customize watermark text in `lib/image-processing/watermark.ts`
- [ ] Adjust thumbnail sizes in `lib/image-processing/thumbnails.ts`
- [ ] Add more tags and folders via Prisma Studio
- [ ] Configure filters and search
- [ ] Deploy to Vercel

## Troubleshooting

**"MissingSecret" error:**
- Make sure `.env` has `AUTH_SECRET` set
- Restart the dev server

**Database connection failed:**
- Verify Postgres credentials in `.env`
- Run `npm run db:push` to sync schema

**Upload fails:**
- Check `BLOB_READ_WRITE_TOKEN` is set
- For local dev, implement filesystem fallback

**Port already in use:**
- Next.js will automatically use next available port (3001, 3002, etc.)
