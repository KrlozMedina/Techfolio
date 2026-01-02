import useSWRInfinite from 'swr/infinite';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useGallery = (category: string | null) => {
  const getKey = (pageIndex: number, prev: any) => {
    if (prev && !prev.hasMore) return null;
    return `/api/v2/gallery?page=${pageIndex + 1}${category ? `&category=${category}` : ''}`;
  };

  const { data, size, setSize, isLoading } = useSWRInfinite(getKey, fetcher);

  const images = data?.flatMap(page => page.data) ?? [];
  const hasMore = data?.[data.length - 1]?.hasMore ?? false;

  return { images, loadMore: () => setSize(size + 1), isLoading, hasMore };
};
