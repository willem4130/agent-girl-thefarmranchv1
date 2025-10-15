'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState } from 'react';
import { Image as ImageType } from '@prisma/client';
import Image from 'next/image';

interface VirtualGalleryProps {
  images: ImageType[];
  columns?: number;
  onImageClick?: (image: ImageType, index: number) => void;
}

export function VirtualGallery({
  images,
  columns = 4,
  onImageClick,
}: VirtualGalleryProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Calculate rows based on columns
  const rows = Math.ceil(images.length / columns);
  const itemsPerRow = columns;

  const rowVirtualizer = useVirtualizer({
    count: rows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 320, // Estimated row height
    overscan: 2, // Render 2 extra rows above/below viewport
  });

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-200px)] overflow-auto"
      style={{ contain: 'strict' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * itemsPerRow;
          const rowImages = images.slice(startIndex, startIndex + itemsPerRow);

          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {rowImages.map((image, colIndex) => {
                const imageIndex = startIndex + colIndex;
                const isHovered = hoveredIndex === imageIndex;

                return (
                  <div
                    key={image.id}
                    className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(imageIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => onImageClick?.(image, imageIndex)}
                  >
                    <Image
                      src={image.thumbnailMedium || image.watermarkedUrl}
                      alt={image.filename}
                      fill
                      className={`object-cover transition-transform duration-300 ${
                        isHovered ? 'scale-110' : 'scale-100'
                      }`}
                      sizes={`(max-width: 768px) 50vw, (max-width: 1200px) 33vw, ${100 / columns}vw`}
                    />

                    {/* Overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm font-medium truncate">
                          {image.filename}
                        </p>
                        {image.width && image.height && (
                          <p className="text-white/80 text-xs mt-1">
                            {image.width} × {image.height}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
