import { useMutation } from '@tanstack/react-query';
import { registPostApi } from '../apis/postApi';

export const useRegistPostMutation = () =>
    useMutation({
        mutationKey: ['useRegistPostMutation'],
        mutationFn: registPostApi,
        retry: 0,
    });
