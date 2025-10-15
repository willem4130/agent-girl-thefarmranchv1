import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image as ImageIcon, Folder, Tag, Star } from 'lucide-react';

export default async function DashboardPage() {
  const [imageCount, folderCount, tagCount, ratingCount] = await Promise.all([
    prisma.image.count(),
    prisma.folder.count(),
    prisma.tag.count(),
    prisma.rating.count(),
  ]);

  const recentImages = await prisma.image.findMany({
    take: 6,
    orderBy: { uploadedAt: 'desc' },
    include: {
      folders: true,
      tags: true,
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your gallery overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glossy-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Images
            </CardTitle>
            <ImageIcon className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{imageCount}</div>
            <p className="text-xs text-gray-600 mt-1">
              Images in your gallery
            </p>
          </CardContent>
        </Card>

        <Card className="glossy-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Folders
            </CardTitle>
            <Folder className="w-5 h-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{folderCount}</div>
            <p className="text-xs text-gray-600 mt-1">
              Organized folders
            </p>
          </CardContent>
        </Card>

        <Card className="glossy-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tags
            </CardTitle>
            <Tag className="w-5 h-5 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tagCount}</div>
            <p className="text-xs text-gray-600 mt-1">
              Unique tags
            </p>
          </CardContent>
        </Card>

        <Card className="glossy-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ratings
            </CardTitle>
            <Star className="w-5 h-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{ratingCount}</div>
            <p className="text-xs text-gray-600 mt-1">
              Total ratings given
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Images */}
      <Card className="glossy-card">
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          {recentImages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No images uploaded yet</p>
              <p className="text-sm mt-1">Start by uploading your first image</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 hover:shadow-lg transition-all"
                >
                  <img
                    src={image.thumbnailMedium || image.watermarkedUrl}
                    alt={image.filename}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-medium truncate">
                        {image.filename}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
