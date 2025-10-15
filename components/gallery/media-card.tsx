'use client';

import { useState } from 'react';
import { Image as ImageType } from '@prisma/client';
import { Play } from 'lucide-react';

interface MediaCardProps {
  media: ImageType;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  onClick: (media: ImageType, index: number) => void;
  columns?: number;
}

export function MediaCard({
  media,
  index,
  isHovered,
  onHover,
  onClick,
  columns = 4,
}: MediaCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isVideo = media.mimeType?.startsWith('video/');

  // Select appropriate thumbnail based on grid size for optimal quality
  const getThumbnailUrl = () => {
    // Large view (1-2 columns): use large (800px) or fallback to watermarked
    if (columns <= 2) {
      return media.thumbnailLarge || media.watermarkedUrl;
    }
    // Medium view (3-4 columns): use medium (400px)
    if (columns <= 4) {
      return media.thumbnailMedium || media.thumbnailLarge || media.watermarkedUrl;
    }
    // Small view (5-6 columns): use medium
    if (columns <= 6) {
      return media.thumbnailMedium || media.thumbnailSmall || media.watermarkedUrl;
    }
    // Very small (7-8 columns): use small (100px) or medium
    return media.thumbnailSmall || media.thumbnailMedium || media.watermarkedUrl;
  };

  const thumbnailUrl = getThumbnailUrl();

  return (
    <div
      className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(media, index)}
    >
      {/* Media Content */}
      {imageError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 text-gray-500">
          <svg
            className="w-16 h-16 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xs">Failed to load</p>
        </div>
      ) : (
        <>
          {/* Loading placeholder */}
          {isLoading && (
            <div className="absolute inset-0 animate-pulse bg-gray-200" />
          )}

          <img
            src={thumbnailUrl}
            alt={media.filename}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setImageError(true);
              setIsLoading(false);
            }}
          />

          {/* Video indicator */}
          {isVideo && (
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full p-2">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
          )}
        </>
      )}

      {/* Hover overlay with info */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white text-sm font-medium truncate mb-1">
            {media.filename}
          </p>
          <div className="flex items-center gap-2 text-white/80 text-xs">
            {media.width && media.height && (
              <span>{media.width} × {media.height}</span>
            )}
            {isVideo && <span className="ml-auto">Video</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
