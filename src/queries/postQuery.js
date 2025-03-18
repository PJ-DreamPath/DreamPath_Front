import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { postsApi } from '../apis/postApi';

// 페이지 조회
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

// 페이지 무한 스크롤 조회
export const useGetPostsInfinityScroll = (mentoring, search) =>
    useInfiniteQuery({
        queryKey: ['useGetPostsInfinityScroll', mentoring, search],
        queryFn: async ({ pageParam = 1 }) => {
            const params = {
                page: pageParam,
                limitCount: 16,
                order: search.order,
                searchTxt: search.searchTxt,
            };
            console.log('params', params);
            return await postsApi(mentoring, params);
        },
        retry: 0,
        refetchOnWindowFocus: false,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.data.nextPage || undefined;
        },
    });
