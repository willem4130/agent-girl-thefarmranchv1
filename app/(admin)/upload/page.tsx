import { UploadZone } from '@/components/admin/upload-zone';

export default function UploadPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Upload Images</h1>
        <p className="text-gray-600">
          Upload new images to your gallery. Images will be automatically watermarked and optimized.
        </p>
      </div>

      <UploadZone />

      <div className="glossy-card p-6">
        <h3 className="font-semibold mb-4">Upload Guidelines</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Supported formats: JPG, PNG, WebP, GIF</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Images will be automatically watermarked with "Willem van den Berg - AIconic"</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Thumbnails (100px, 400px, 800px) will be generated automatically</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>You can upload multiple images at once</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
