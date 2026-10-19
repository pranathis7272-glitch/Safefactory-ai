/**
 * Image Processing & Optimization Utility
 * Handles cross-browser image loading, file type detection, downscaling for high-resolution
 * camera uploads, and error diagnostics.
 */

export interface ProcessedImageResult {
  dataUrl: string;
  mimeType: string;
  fileName: string;
  fileSizeFormatted: string;
  width: number;
  height: number;
}

/**
 * Validates if the file is an image by MIME type or file extension.
 * Supports standard web formats, phone camera outputs, SVG, and modern formats.
 */
export function isValidImageFile(file: File): boolean {
  if (!file) return false;
  if (file.type && file.type.startsWith('image/')) return true;

  const validExts = /\.(jpe?g|png|webp|svg|gif|bmp|jfif|heic|heif|tiff?)$/i;
  return validExts.test(file.name);
}

/**
 * Format bytes into human readable string
 */
export function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Reads a File and ensures it is decoded and resized if necessary
 * (e.g. 12MP-48MP smartphone photos that are 10MB-30MB).
 * Downscales to max 1920px longest edge while preserving aspect ratio,
 * ensuring fast rendering in <img> and fast transmission to the server.
 */
export async function processAndOptimizeImage(file: File): Promise<ProcessedImageResult> {
  if (!isValidImageFile(file)) {
    throw new Error('Please select a valid image file (JPEG, PNG, WebP, or SVG).');
  }

  // Read data URL
  const rawDataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as binary string.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file from your device.'));
    reader.readAsDataURL(file);
  });

  // If SVG, don't rasterize or downscale
  if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
    return {
      dataUrl: rawDataUrl,
      mimeType: 'image/svg+xml',
      fileName: file.name,
      fileSizeFormatted: formatFileSize(file.size),
      width: 640,
      height: 400,
    };
  }

  // Load into HTMLImageElement to decode dimensions and optimize if high-res
  return new Promise<ProcessedImageResult>((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const MAX_DIM = 1920;
        let { width, height } = img;

        // Only downscale if larger than MAX_DIM or file is > 2MB
        if (width > MAX_DIM || height > MAX_DIM || file.size > 2 * 1024 * 1024) {
          if (width > height && width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (ctx) {
            // Draw smooth high-quality
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
            const quality = mime === 'image/jpeg' ? 0.88 : undefined;
            const optimizedDataUrl = canvas.toDataURL(mime, quality);

            resolve({
              dataUrl: optimizedDataUrl,
              mimeType: mime,
              fileName: file.name,
              fileSizeFormatted: formatFileSize(file.size),
              width,
              height,
            });
            return;
          }
        }

        // Return original dataUrl if already within reasonable bounds
        resolve({
          dataUrl: rawDataUrl,
          mimeType: file.type || 'image/jpeg',
          fileName: file.name,
          fileSizeFormatted: formatFileSize(file.size),
          width: img.width || 800,
          height: img.height || 600,
        });
      } catch (err) {
        // Fallback to rawDataUrl
        resolve({
          dataUrl: rawDataUrl,
          mimeType: file.type || 'image/jpeg',
          fileName: file.name,
          fileSizeFormatted: formatFileSize(file.size),
          width: img.width || 800,
          height: img.height || 600,
        });
      }
    };

    img.onerror = () => {
      // If decoding fails directly (e.g. some HEIC files without native browser decode)
      resolve({
        dataUrl: rawDataUrl,
        mimeType: file.type || 'image/jpeg',
        fileName: file.name,
        fileSizeFormatted: formatFileSize(file.size),
        width: 800,
        height: 600,
      });
    };

    img.src = rawDataUrl;
  });
}
