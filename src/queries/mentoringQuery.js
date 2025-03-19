import { useQuery } from '@tanstack/react-query';
import { mentoringCategoriesApi } from '../apis/mentoringApi';

// 페이지 조회
export const useGetMentoringCategories = () =>
    useQuery({
        queryKey: ['useGetMentoringCategories'],
        queryFn: async () => {
            return await mentoringCategoriesApi();
        },
        retry: 0,
        staleTime: 1000 * 60 * 20,
        gcTime: 1000 * 60 * 10,
    });
