import { useMutation } from '@tanstack/react-query';
import {
    delPostApi,
    postLikeApi,
    postLikeCancelApi,
    postViewCountApi,
    registPostApi,
    updatePostApi,
} from '../apis/postApi';

export const useRegistPostMutation = () =>
    useMutation({
        mutationKey: ['useRegistPostMutation'],
        mutationFn: registPostApi,
        retry: 0,
    });

export const useUpdatePostMutation = () =>
    useMutation({
        mutationKey: ['useUpdatePostMutation'],
        mutationFn: updatePostApi,
        retry: 0,
    });

export const useUpdatePostViewCountMutation = () => 
    useMutation({
        mutationKey: ['useUpdatePostViewCountMutation'],
        mutationFn: postViewCountApi,
        retry: 0,
    })

// 페이지 삭제
export const useDelPostMutation = () =>
    useMutation({
        mutationKey: ['useDelPostMutation'],
        mutationFn: delPostApi,
        retry: 0,
    });

// 좋아요 클릭
export const usePostLikeMutation = () =>
    useMutation({
        mutationKey: ['usePostLikeMutation'],
        mutationFn: postLikeApi,
        retry: 0,
    });

export const usePostLikeCancelMutation = () =>
    useMutation({
        mutationKey: ['usePostLikeCancelMutation'],
        mutationFn: postLikeCancelApi,
        retry: 0,
    });
