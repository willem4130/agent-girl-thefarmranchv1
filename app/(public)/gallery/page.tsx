'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { VirtualGalleryImproved } from '@/components/gallery/virtual-gallery-improved';
import { GridColumnsControl } from '@/components/gallery/grid-columns-control';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Image as ImageType } from '@prisma/client';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function GalleryPage() {
  const [columns, setColumnsInternal] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Load saved columns preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gallery-columns');
    if (saved) {
      const parsed = Number(saved);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 8) {
        setColumnsInternal(parsed);
      }
    }
  }, []);

  // Save columns preference with validation
  const setColumns = (value: number) => {
    const clamped = Math.min(Math.max(value, 1), 8);
    setColumnsInternal(clamped);
    localStorage.setItem('gallery-columns', String(clamped));
  };

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
          <GridColumnsControl
            columns={columns}
            onColumnsChange={setColumns}
            className="w-full md:w-80"
          />
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
