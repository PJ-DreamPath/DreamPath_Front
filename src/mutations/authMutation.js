import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../apis/authApi";

export const useSignupMutation = () => useMutation({
    mutationKey: ["signupMutation"],
    mutationFn: signupApi,
    retry: 0,
})
