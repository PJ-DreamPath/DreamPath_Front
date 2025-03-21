import { useMutation } from '@tanstack/react-query';
import { delPostApi, registPostApi } from '../apis/postApi';
import { mentoringApplyApi, mentoringStatusUpdateApi } from '../apis/mentoringApi';

export const useMentoringStatusUpdateMutation = () =>
    useMutation({
        mutationKey: ['useMentoringStatusUpdateMutation'],
        mutationFn: mentoringStatusUpdateApi,
        retry: 0,
    });

export const useMentoringApplyMutation = () => 
    useMutation({
        mutationKey: ['useMentoringApplyMutation'],
        mutationFn: mentoringApplyApi,
        retry: 0,
    })

