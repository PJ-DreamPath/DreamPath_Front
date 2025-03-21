import { useMutation } from '@tanstack/react-query';
import { delPostApi, registPostApi } from '../apis/postApi';

export const useRegistPostMutation = () =>
    useMutation({
        mutationKey: ['useRegistPostMutation'],
        mutationFn: registPostApi,
        retry: 0,
    });

// 페이지 삭제
export const useDelPostMutation = () =>
    useMutation({
        mutationKey: ['useDelPostMutation'],
        mutationFn: delPostApi,
        retry: 0,
    });
