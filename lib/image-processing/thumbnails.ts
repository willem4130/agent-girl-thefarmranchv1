import sharp from 'sharp';

export interface ThumbnailSizes {
  small: number; // 100px
  medium: number; // 400px
  large: number; // 800px
}

export const DEFAULT_THUMBNAIL_SIZES: ThumbnailSizes = {
  small: 100,
  medium: 400,
  large: 800,
};

export interface ThumbnailResults {
  small: Buffer;
  medium: Buffer;
  large: Buffer;
}

export async function generateThumbnails(
  imageBuffer: Buffer,
  sizes: ThumbnailSizes = DEFAULT_THUMBNAIL_SIZES
): Promise<ThumbnailResults> {
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();

  // Determine if image is portrait or landscape
  const isPortrait = (metadata.height || 0) > (metadata.width || 0);

  const [small, medium, large] = await Promise.all([
    image
      .clone()
      .resize(sizes.small, sizes.small, {
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: 80 })
      .toBuffer(),

    image
      .clone()
      .resize(
        isPortrait ? undefined : sizes.medium,
        isPortrait ? sizes.medium : undefined,
        {
          fit: 'inside',
          withoutEnlargement: true,
        }
      )
      .webp({ quality: 85 })
      .toBuffer(),

    image
      .clone()
      .resize(
        isPortrait ? undefined : sizes.large,
        isPortrait ? sizes.large : undefined,
        {
          fit: 'inside',
          withoutEnlargement: true,
        }
      )
      .webp({ quality: 90 })
      .toBuffer(),
  ]);

  return { small, medium, large };
}

export async function generateBlurPlaceholder(imageBuffer: Buffer): Promise<string> {
  const placeholder = await sharp(imageBuffer)
    .resize(20, 20, { fit: 'cover' })
    .blur()
    .webp({ quality: 20 })
    .toBuffer();

  return `data:image/webp;base64,${placeholder.toString('base64')}`;
}
