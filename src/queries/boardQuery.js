import { useQuery } from '@tanstack/react-query';
import { boardsApi } from '../apis/boardApi';

// 페이지 조회
export const useGetBoards = () =>
    useQuery({
        queryKey: ['useGetBoards'],
        queryFn: async () => {
            return await boardsApi();
        },
        retry: 0,
        staleTime: 1000 * 60 * 20,
        gcTime: 1000 * 60 * 10,
    });
