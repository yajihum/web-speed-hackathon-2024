type Params = {
  format: 'avif' | 'webp' | 'png' | 'jpg' | 'jxl';
  imageId: string;
};

export function getImageUrl({ format, imageId }: Params): string {
  const url = new URL(`/images/${imageId}`, location.href);

  url.searchParams.set('format', format);
  return url.href;
}
