import { useQuery } from 'react-query';

interface AnimeData {
}

const useGetAnimeList = (type: string, page: number, limit: number, searchTerm: string) => {
  return useQuery<AnimeData[]>(['anime-list', type, page, searchTerm], async () => {
    const response = await fetch(`https://api.jikan.moe/v4/${type}?page=${page}&limit=${limit}&q=${searchTerm}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }, {
    keepPreviousData: true,
    enabled: !!searchTerm,
  });
};

export default useGetAnimeList;
