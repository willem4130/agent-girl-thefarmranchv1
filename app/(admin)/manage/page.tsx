import { prisma } from '@/lib/db/prisma';
import { Card } from '@/components/ui/card';
import { Folder, Tag, Image as ImageIcon, Star } from 'lucide-react';

export default async function ManagePage() {
  // Fetch stats
  const [imageCount, folderCount, tagCount, ratingCount] = await Promise.all([
    prisma.image.count(),
    prisma.folder.count(),
    prisma.tag.count(),
    prisma.rating.count(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Manage Gallery</h1>
        <p className="text-gray-600 mt-2">
          Organize and manage your images, folders, and tags
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 glass">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ImageIcon className="w-6 h-6 text-blue-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Images</p>
              <p className="text-2xl font-bold">{imageCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 glass">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Folder className="w-6 h-6 text-purple-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Folders</p>
              <p className="text-2xl font-bold">{folderCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 glass">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Tag className="w-6 h-6 text-green-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tags</p>
              <p className="text-2xl font-bold">{tagCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 glass">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ratings</p>
              <p className="text-2xl font-bold">{ratingCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Placeholder for future features */}
      <Card className="p-8 glass text-center">
        <h2 className="text-xl font-semibold mb-2">Management Features Coming Soon</h2>
        <p className="text-gray-600">
          Bulk operations, folder management, tag editing, and more will be available here.
        </p>
      </Card>
    </div>
  );
}
