import { UploadZone } from '@/components/admin/upload-zone';

export default function UploadPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Upload Media</h1>
        <p className="text-gray-600">
          Upload images and videos to your gallery. Images will be automatically watermarked and optimized.
        </p>
      </div>

      <UploadZone />

      <div className="glossy-card p-6">
        <h3 className="font-semibold mb-4">Upload Guidelines</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span><strong>Image formats:</strong> JPG, PNG, WebP, GIF, HEIC, AVIF</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span><strong>Video formats:</strong> MP4, MOV, WebM</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Images will be automatically watermarked with "Willem van den Berg - AIconic"</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Thumbnails (100px, 400px, 800px) generated automatically for images</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Upload multiple files at once (images and videos)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>All aspect ratios supported (portrait, landscape, square)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
