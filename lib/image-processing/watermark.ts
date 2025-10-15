import sharp from 'sharp';

export interface WatermarkOptions {
  text: string;
  opacity?: number;
  position?: 'center' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  fontSize?: number;
}

export async function addWatermark(
  imageBuffer: Buffer,
  options: WatermarkOptions = { text: 'Willem van den Berg - AIconic' }
): Promise<Buffer> {
  const {
    text,
    opacity = 0.3,
    position = 'center',
    fontSize = 48,
  } = options;

  const image = sharp(imageBuffer);
  const metadata = await image.metadata();
  const { width = 1000, height = 1000 } = metadata;

  // Create watermark text as SVG
  const svgWatermark = `
    <svg width="${width}" height="${height}">
      <defs>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
      </defs>
      <text
        x="${getX(position, width)}"
        y="${getY(position, height)}"
        font-family="Arial, sans-serif"
        font-size="${fontSize}"
        font-weight="600"
        fill="white"
        fill-opacity="${opacity}"
        text-anchor="${getAnchor(position)}"
        dominant-baseline="${getBaseline(position)}"
        filter="url(#blur)"
      >${text}</text>
      <text
        x="${getX(position, width)}"
        y="${getY(position, height)}"
        font-family="Arial, sans-serif"
        font-size="${fontSize}"
        font-weight="600"
        fill="white"
        fill-opacity="${opacity * 1.5}"
        text-anchor="${getAnchor(position)}"
        dominant-baseline="${getBaseline(position)}"
      >${text}</text>
    </svg>
  `;

  return image
    .composite([
      {
        input: Buffer.from(svgWatermark),
        top: 0,
        left: 0,
      },
    ])
    .toBuffer();
}

function getX(position: string, width: number): string {
  if (position.includes('center')) return `${width / 2}`;
  if (position.includes('right')) return `${width - 50}`;
  return '50';
}

function getY(position: string, height: number): string {
  if (position.includes('center')) return `${height / 2}`;
  if (position.includes('bottom')) return `${height - 50}`;
  return '50';
}

function getAnchor(position: string): string {
  if (position.includes('center')) return 'middle';
  if (position.includes('right')) return 'end';
  return 'start';
}

function getBaseline(position: string): string {
  if (position.includes('center')) return 'middle';
  if (position.includes('bottom')) return 'auto';
  return 'hanging';
}
