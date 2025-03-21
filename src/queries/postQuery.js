import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { postDetailApi, postsApi } from '../apis/postApi';

// 페이지 조회
export const useGetPosts = (boardId, params) =>
    useQuery({
        queryKey: ['useGetPosts', boardId, params],
        queryFn: async () => {
            return await postsApi(boardId, params);
        },
        retry: 0,
        enabled: !!boardId,
        staleTime: 1000 * 60 * 20,
        gcTime: 1000 * 60 * 10,
    });

// 페이지 무한 스크롤 조회
export const useGetPostsInfinityScroll = (boardId, search) =>
    useInfiniteQuery({
        queryKey: ['useGetPostsInfinityScroll', boardId, search],
        queryFn: async ({ pageParam = 1 }) => {
            const params = {
                page: pageParam,
                limitCount: 16,
                order: search.order,
                searchTxt: search.searchTxt,
            };
            return await postsApi(boardId, params);
        },
        retry: 0,
        enabled: !!boardId,
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
        queryFn: async () => await postDetailApi(postId),
        retry: 0,
        enabled: !!postId,
        staleTime: 1000 * 60 * 20,
        gcTime: 1000 * 60 * 10,
    });
