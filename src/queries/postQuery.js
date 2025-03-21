import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { postDetailApi, postsApi } from '../apis/postApi';

// 페이지 조회
export const useGetPosts = (boardName, params) =>
    useQuery({
        queryKey: ['useGetPosts', boardName, params],
        queryFn: async () => {
            return await postsApi(boardName, params);
        },
        retry: 0,
        enabled: !!boardName,
        staleTime: 1000 * 60 * 20,
        gcTime: 1000 * 60 * 10,
    });

// 페이지 무한 스크롤 조회
export const useGetPostsInfinityScroll = (boardName, search) =>
    useInfiniteQuery({
        queryKey: ['useGetPostsInfinityScroll', boardName, search],
        queryFn: async ({ pageParam = 1 }) => {
            const params = {
                page: pageParam,
                limitCount: 16,
                order: search.order,
                searchTxt: search.searchTxt,
            };
            return await postsApi(boardName, params);
        },
        retry: 0,
        enabled: !!boardName,
        refetchOnWindowFocus: false,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.data.nextPage || undefined;
        },
    });

// 페이지 상세 조회
export const useGetPostDetail = (postId) =>
    useQuery({
        queryKey: ['useGetPostDetail', postId],
        queryFn: async () => {
            return await postDetailApi(postId);
        },
        retry: 0,
        staleTime: 1000 * 60 * 20,
        gcTime: 1000 * 60 * 10,
    });
