import { useMutation } from '@tanstack/react-query';
import { delPostApi, registPostApi } from '../apis/postApi';
import { mentoringStatusUpdateApi } from '../apis/mentoringApi';

export const useMentoringStatusUpdateMutation = () =>
    useMutation({
        mutationKey: ['useMentoringStatusUpdateMutation'],
        mutationFn: mentoringStatusUpdateApi,
        retry: 0,
    });

