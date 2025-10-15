'use client';

import { useCallback, useState } from 'react';
import { Upload, X, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatFileSize } from '@/lib/utils';

interface UploadFile {
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
}

export function UploadZone() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );

    addFiles(droppedFiles);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);
    e.target.value = ''; // Reset input
  }, []);

  const addFiles = (newFiles: File[]) => {
    const uploadFiles: UploadFile[] = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'pending',
    }));

    setFiles((prev) => [...prev, ...uploadFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const uploadFiles = async () => {
    const pendingFiles = files.filter((f) => f.status === 'pending');

    for (let i = 0; i < pendingFiles.length; i++) {
      const fileIndex = files.findIndex((f) => f === pendingFiles[i]);

      // Update status to uploading
      setFiles((prev) => {
        const newFiles = [...prev];
        newFiles[fileIndex] = { ...newFiles[fileIndex], status: 'uploading', progress: 0 };
        return newFiles;
      });

      try {
        const formData = new FormData();
        formData.append('files', pendingFiles[i].file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        // Update status to success
        setFiles((prev) => {
          const newFiles = [...prev];
          newFiles[fileIndex] = { ...newFiles[fileIndex], status: 'success', progress: 100 };
          return newFiles;
        });
      } catch (error) {
        // Update status to error
        setFiles((prev) => {
          const newFiles = [...prev];
          newFiles[fileIndex] = {
            ...newFiles[fileIndex],
            status: 'error',
            error: 'Upload failed',
          };
          return newFiles;
        });
      }
    }

    // After all uploads complete, show success message
    const allSuccess = files.every((f) => f.status === 'success');
    if (allSuccess) {
      setTimeout(() => {
        window.location.href = '/gallery';
      }, 1500);
    }
  };

  const clearAll = () => {
    files.forEach((f) => URL.revokeObjectURL(f.preview));
    setFiles([]);
  };

  const pendingCount = files.filter((f) => f.status === 'pending').length;
  const successCount = files.filter((f) => f.status === 'success').length;

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          glossy-card border-2 border-dashed transition-all duration-200 cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-50/50 scale-[1.02]' : 'border-gray-300 hover:border-gray-400'}
        `}
      >
        <label className="flex flex-col items-center justify-center py-16 cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*,video/mp4,video/quicktime,video/webm"
            onChange={handleFileInput}
            className="hidden"
          />
          <Upload
            className={`w-16 h-16 mb-4 transition-colors ${
              isDragging ? 'text-blue-500' : 'text-gray-400'
            }`}
          />
          <p className="text-lg font-medium mb-2">
            {isDragging ? 'Drop files here' : 'Drag & drop images/videos here'}
          </p>
          <p className="text-sm text-gray-600 mb-4">or click to browse</p>
          <Button variant="glossy" type="button">
            Select Files
          </Button>
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <Card className="glossy-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">
                {files.length} {files.length === 1 ? 'File' : 'Files'} Selected
              </h3>
              <p className="text-sm text-gray-600">
                {successCount > 0 && (
                  <span className="text-green-600 font-medium">{successCount} uploaded ✓</span>
                )}
                {successCount > 0 && pendingCount > 0 && <span className="mx-2">•</span>}
                {pendingCount > 0 && <span>{pendingCount} pending</span>}
                {successCount > 0 && pendingCount === 0 && (
                  <span className="ml-2">Redirecting to gallery...</span>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              {pendingCount > 0 && (
                <Button
                  onClick={uploadFiles}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload {pendingCount} {pendingCount === 1 ? 'File' : 'Files'}
                </Button>
              )}
              <Button onClick={clearAll} variant="outline" size="sm">
                Clear All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((uploadFile, index) => (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden bg-gray-100"
              >
                <div className="aspect-square relative">
                  {uploadFile.file.type.startsWith('video/') ? (
                    <video
                      src={uploadFile.preview}
                      className="w-full h-full object-cover"
                      muted
                    />
                  ) : (
                    <img
                      src={uploadFile.preview}
                      alt={uploadFile.file.name}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Status Overlay */}
                  {uploadFile.status !== 'pending' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      {uploadFile.status === 'uploading' && (
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                      )}
                      {uploadFile.status === 'success' && (
                        <CheckCircle2 className="w-8 h-8 text-green-400" />
                      )}
                      {uploadFile.status === 'error' && (
                        <AlertCircle className="w-8 h-8 text-red-400" />
                      )}
                    </div>
                  )}

                  {/* Remove Button */}
                  {uploadFile.status === 'pending' && (
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="p-2">
                  <p className="text-xs font-medium truncate">
                    {uploadFile.file.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {formatFileSize(uploadFile.file.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
