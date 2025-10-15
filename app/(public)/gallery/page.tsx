'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { VirtualGalleryImproved } from '@/components/gallery/virtual-gallery-improved';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Grid3x3, Grid2x2, LayoutGrid, Maximize2 } from 'lucide-react';
import { Image as ImageType } from '@prisma/client';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function GalleryPage() {
  const [columns, setColumns] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const { data: images = [], isLoading } = useQuery<ImageType[]>({
    queryKey: ['images'],
    queryFn: async () => {
      const response = await fetch('/api/images');
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      return data.images;
    },
  });

  const filteredImages = images.filter((image) =>
    image.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lightboxSlides = filteredImages.map((image) => ({
    src: image.watermarkedUrl,
    alt: image.filename,
    width: image.width || undefined,
    height: image.height || undefined,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Gallery</h1>
            <p className="text-gray-600">
              Browse {images.length} AI-generated images by Willem van den Berg
            </p>
          </div>

          {/* Grid Size Controls */}
          <Card className="glass p-4 flex items-center gap-2">
            <Label className="text-sm font-medium">Grid:</Label>
            <div className="flex gap-1">
              <Button
                variant={columns === 1 ? 'default' : 'outline'}
                size="icon"
                onClick={() => setColumns(1)}
                title="Single column"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button
                variant={columns === 2 ? 'default' : 'outline'}
                size="icon"
                onClick={() => setColumns(2)}
                title="2 columns"
              >
                <Grid2x2 className="w-4 h-4" />
              </Button>
              <Button
                variant={columns === 3 ? 'default' : 'outline'}
                size="icon"
                onClick={() => setColumns(3)}
                title="3 columns"
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={columns === 4 ? 'default' : 'outline'}
                size="icon"
                onClick={() => setColumns(4)}
                title="4 columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Input
                type="number"
                min="1"
                max="12"
                value={columns}
                onChange={(e) => setColumns(Number(e.target.value))}
                className="w-16 text-center"
              />
            </div>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="glass p-4">
          <Input
            type="search"
            placeholder="Search images by filename..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/50"
          />
        </Card>

        {/* Gallery */}
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : filteredImages.length === 0 ? (
          <Card className="glass p-16 text-center">
            <p className="text-gray-600">
              {searchTerm ? 'No images found matching your search' : 'No images yet'}
            </p>
          </Card>
        ) : (
          <VirtualGalleryImproved
            images={filteredImages}
            columns={columns}
            onImageClick={(image, index) => setLightboxIndex(index)}
          />
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={lightboxSlides}
      />
    </div>
  );
}
