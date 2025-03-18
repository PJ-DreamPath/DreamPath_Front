import { useQuery } from '@tanstack/react-query';
import { postsApi } from '../apis/postApi';

export const useGetPosts = (mentoring, params) =>
    useQuery({
        queryKey: ['useGetPosts', mentoring, params],
        queryFn: async () => {
            return await postsApi(mentoring, params);
        },
        retry: 0,
        staleTime: 1000 * 60 * 20,
        gcTime: 1000 * 60 * 10,
    });
