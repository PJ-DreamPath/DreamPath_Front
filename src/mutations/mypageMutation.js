import { useMutation } from "@tanstack/react-query";
import { deleteUserApi, updateEmailApi, updateNicknameApi, updatePasswordApi, updateProfileImgApi,  } from "../apis/userApi";

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
