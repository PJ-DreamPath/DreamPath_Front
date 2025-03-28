import { useMutation } from "@tanstack/react-query";
import { deleteUserApi, sendUserAuthPhoneApi, updateEmailApi, updateNicknameApi, updatePasswordApi, updatePhoneNumberApi, updateProfileImgApi,  } from "../apis/userApi";

export const useUpdateProfileImageMutation = () => useMutation({
    mutationKey: ["useUpdateProfileImageMutation"],
    mutationFn: updateProfileImgApi,
    retry: 0,
});

export const useUpdateNicknameMutation = () => useMutation({
    mutationKey: ["useUpdateNicknameMutation"],
    mutationFn: updateNicknameApi,
    retry: 0,
});

export const useUpdateEmailMutation = () => useMutation({
    mutationKey: ["useUpdateEmailMutation"],
    mutationFn: updateEmailApi,
    retry: 0,
});

export const useUpdatePasswordMutation = () => useMutation({
    mutationKey: ["useUpdatePasswordMutation"],
    mutationFn: updatePasswordApi,
    retry: 0,
});

export const userDeleteUserMutation = () => useMutation({
    mutationKey: ["userDeleteUserMutation"],
    mutationFn: deleteUserApi,
    retry: 0,
});

export const useSendAuthPhoneMutation = () => useMutation({
    mutationKey: ["useSendAuthPhoneMutation"],
    mutationFn: sendUserAuthPhoneApi,
    retry: 0,
})

export const useConfirmPhoneNumberMutation = () => useMutation({
    mutationKey: ["useConfirmPhoneNumberMutation"],
    mutationFn: updatePhoneNumberApi,
    retry: 0,
})
