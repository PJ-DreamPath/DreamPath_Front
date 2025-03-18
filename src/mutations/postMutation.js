import { useMutation } from "@tanstack/react-query";
import { updateNoticePostApi } from "../apis/postApi";

export const useNoticeUpdateMutation = () => useMutation({
    mutationKey: ["useNoticeUpdateMutation"],
    mutationFn: updateNoticePostApi,
    retry:0,
 })