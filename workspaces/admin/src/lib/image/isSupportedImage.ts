import { fileTypeFromBuffer } from 'file-type';

const SUPPORTED_MIME_TYPE_LIST = ['image/webp'];

export async function isSupportedImage(image: File): Promise<boolean> {
  const fileType = await fileTypeFromBuffer(await image.arrayBuffer());
  if (SUPPORTED_MIME_TYPE_LIST.includes(fileType?.mime ?? '')) {
    return true;
  }

  return false;
}
