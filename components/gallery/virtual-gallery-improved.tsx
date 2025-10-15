'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState } from 'react';
import { Image as ImageType } from '@prisma/client';
import { MediaCard } from './media-card';

interface VirtualGalleryProps {
  images: ImageType[];
  columns?: number;
  onImageClick?: (image: ImageType, index: number) => void;
}

export function VirtualGalleryImproved({
  images,
  columns = 4,
  onImageClick,
}: VirtualGalleryProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Calculate rows based on columns
  const rows = Math.ceil(images.length / columns);
  const itemsPerRow = columns;

  // Dynamic row height based on column count
  const getRowHeight = () => {
    if (columns === 1) return 600; // Full width
    if (columns === 2) return 400;
    if (columns <= 4) return 320;
    return 250; // Smaller for 5+ columns
  };

  const rowVirtualizer = useVirtualizer({
    count: rows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => getRowHeight(),
    overscan: 3, // Render 3 extra rows for smoother scrolling
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
              className="grid gap-4 px-1"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {rowImages.map((image, colIndex) => {
                const imageIndex = startIndex + colIndex;

                return (
                  <MediaCard
                    key={image.id}
                    media={image}
                    index={imageIndex}
                    isHovered={hoveredIndex === imageIndex}
                    onHover={setHoveredIndex}
                    onClick={onImageClick || (() => {})}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
