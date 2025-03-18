import { useMutation } from "@tanstack/react-query";
import { updateEmailApi, updateNicknameApi, updateProfileImageApi,  } from "../apis/userApi";

export const useUpdateProfileImageMutation = () => useMutation({
    mutationKey: ["useUpdateProfileImageMutation"],
    mutationFn: updateProfileImageApi,
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
