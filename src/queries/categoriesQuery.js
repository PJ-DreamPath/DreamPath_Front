import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '../apis/categoriesApi';

export const useGetCategories = (boardId) =>
    useQuery({
        queryKey: ['useGetCategories', boardId],
        queryFn: async () => {
            return await categoriesApi(boardId);
        },
        retry: 0,
        enabled: !!boardId,
        staleTime: 1000 * 60 * 20,
        gcTime: 1000 * 60 * 10,
    });
