import { useMutation } from '@tanstack/react-query';
import { registPostApi } from '../apis/postApi';

export const useRegistPostMutation = (notice) =>
    useMutation({
        mutationKey: ['useRegistPostMutation', notice],
        mutationFn: async () => await registPostApi(notice),
        retry: 0,
    });
