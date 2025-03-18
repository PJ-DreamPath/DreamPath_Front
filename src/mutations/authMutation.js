import { useMutation } from "@tanstack/react-query";
import { loginApi, signupApi } from "../apis/authApi";

export const useSignupMutation = () => useMutation({
    mutationKey: ["signupMutation"],
    mutationFn: signupApi,
    retry: 0,

})

export const useLoginMutation = () => useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: loginApi,
    retry: 0,
});


