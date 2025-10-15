# Farm Ranch Media Gallery

A high-performance Next.js image gallery application for managing and showcasing AI-generated images with watermarking, ratings, comments, and advanced organization features.

## 🚀 Features

### For Admins
- **Bulk Image Upload**: Drag & drop multiple images with progress tracking
- **Automatic Watermarking**: Images watermarked with "Willem van den Berg - AIconic"
- **Auto Thumbnail Generation**: 100px, 400px, and 800px thumbnails in WebP format
- **Folder Management**: Nested folder organization
- **Tag System**: Color-coded tags for categorization
- **Collections**: Group images into curated collections
- **Dashboard**: Stats and recent uploads overview

### For Users
- **Virtual Scrolling Gallery**: Smooth performance with 6K+ images
- **Flexible Grid**: 1-12 columns, adjustable on the fly
- **Lightbox Viewer**: Full-screen viewing with keyboard navigation
- **Rating System**: Numeric scores (1-10) with custom labels
- **Comments**: Rich text comments with edit history
- **Interest Marking**: Track images of interest (Interested → High Priority → Purchased)
- **Advanced Search & Filters**: Search by filename, folder, tags, ratings, dates

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI**: shadcn/ui + Tailwind CSS (white/glossy magazine theme)
- **Database**: Vercel Postgres + Prisma ORM
- **Storage**: Vercel Blob (CDN-backed)
- **Auth**: NextAuth.js v5
- **Image Processing**: Sharp (watermarking + thumbnails)
- **Virtual Scrolling**: TanStack Virtual
- **State Management**: Zustand + React Query
- **Lightbox**: yet-another-react-lightbox

## 📋 Prerequisites

- Node.js 18+ and npm
- Vercel account (for Postgres and Blob storage)
- Git

## 🔧 Setup Instructions

### 1. Clone and Install

\`\`\`bash
git clone <your-repo>
cd farmranchmedia2
npm install
\`\`\`

### 2. Set Up Vercel Postgres

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new Postgres database
3. Copy the connection strings

### 3. Set Up Vercel Blob Storage

1. In your Vercel project, go to Storage
2. Create a new Blob store
3. Copy the `BLOB_READ_WRITE_TOKEN`

### 4. Configure Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
# Database (from Vercel Postgres)
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NO_SSL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# Blob Storage (from Vercel Blob)
BLOB_READ_WRITE_TOKEN=

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here  # Generate with: openssl rand -base64 32

# Admin credentials
ADMIN_EMAIL=admin@farmranchmedia.com
ADMIN_PASSWORD=your-secure-password
\`\`\`

### 5. Initialize Database

\`\`\`bash
# Push schema to database
npm run db:push

# Open Prisma Studio to create admin user
npm run db:studio
\`\`\`

In Prisma Studio:
1. Open the **User** table
2. Create a new user with:
   - Email: `admin@farmranchmedia.com`
   - Password: Hash your password using bcrypt (see below)
   - Role: `ADMIN`

**Generate password hash:**
\`\`\`bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 10))"
\`\`\`

### 6. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Admin Workflow

1. **Login**: Navigate to `/login` and sign in with admin credentials
2. **Dashboard**: View stats and recent uploads at `/dashboard`
3. **Upload Images**: Go to `/upload` and drag & drop images
4. **Manage**: Organize images into folders, add tags, create collections

### User Workflow

1. **Browse Gallery**: Visit `/gallery` to browse all images
2. **Adjust Grid**: Use the grid controls to show 1-12 images per row
3. **Search**: Use the search bar to find specific images
4. **Lightbox**: Click any image for full-screen viewing
5. **Rate & Comment**: (Coming soon) Rate images and leave comments
6. **Mark Interest**: (Coming soon) Mark images you're interested in purchasing

## 📁 Project Structure

\`\`\`
farmranchmedia2/
├── app/
│   ├── (admin)/          # Admin-only routes
│   │   ├── dashboard/
│   │   ├── upload/
│   │   └── manage/
│   ├── (public)/         # Public routes
│   │   └── gallery/
│   ├── api/              # API routes
│   │   ├── auth/
│   │   ├── images/
│   │   └── upload/
│   └── login/
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── gallery/          # Gallery components
│   ├── admin/            # Admin components
│   └── shared/           # Shared components
├── lib/
│   ├── db/               # Prisma client
│   ├── image-processing/ # Sharp watermarking & thumbnails
│   ├── auth/             # Auth utilities
│   └── utils.ts          # Helper functions
├── prisma/
│   └── schema.prisma     # Database schema
└── public/               # Static assets
\`\`\`

## 🎨 Customization

### Watermark

Edit `/lib/image-processing/watermark.ts`:
\`\`\`typescript
const options = {
  text: 'Your Custom Text',
  opacity: 0.3,
  position: 'center', // or 'bottom-right', 'top-left', etc.
  fontSize: 48,
};
\`\`\`

### Thumbnail Sizes

Edit `/lib/image-processing/thumbnails.ts`:
\`\`\`typescript
export const DEFAULT_THUMBNAIL_SIZES = {
  small: 100,   // Modify as needed
  medium: 400,
  large: 800,
};
\`\`\`

### Theme Colors

Edit `/tailwind.config.ts` to adjust the color palette and glossy effects.

## 🚀 Deployment

### Deploy to Vercel

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and connect your database
\`\`\`

Vercel will automatically:
- Detect Next.js and configure build settings
- Link your Postgres database
- Set up Blob storage
- Deploy to a production URL

### Environment Variables on Vercel

Add all environment variables from `.env` in your Vercel project settings.

## 📊 Performance

- **Virtual Scrolling**: Handles 6K+ images smoothly
- **Lazy Loading**: Images load on-demand
- **WebP Format**: Thumbnails use WebP for 25-35% smaller files
- **CDN**: Vercel Blob provides global CDN distribution
- **Server Components**: Reduced JavaScript bundle size

## 🔒 Security

- NextAuth.js for authentication
- bcrypt password hashing
- Admin-only routes protected by middleware
- CSRF protection built into Next.js
- Vercel Blob access tokens

## 📝 TODO / Roadmap

- [ ] Rating system UI
- [ ] Comments system UI
- [ ] Interest marking UI
- [ ] Advanced filters (tags, folders, dates)
- [ ] Bulk editing tools
- [ ] Export collections
- [ ] Image metadata editor
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Public/private toggle per image

## 🐛 Troubleshooting

### Database connection issues
- Verify `POSTGRES_PRISMA_URL` is correct
- Run `npm run db:push` to sync schema

### Upload fails
- Check `BLOB_READ_WRITE_TOKEN` is set
- Verify image file size < 10MB (configurable in `next.config.ts`)

### Authentication issues
- Regenerate `NEXTAUTH_SECRET`
- Clear browser cookies
- Verify admin user exists in database

## 📄 License

MIT

## 👤 Author

Willem van den Berg - AIconic

---

Built with ❤️ using Next.js 15 and modern web technologies
