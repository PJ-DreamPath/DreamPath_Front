import { useMutation } from "@tanstack/react-query";
import { updateNoticePostApi } from "../apis/postApi";

export const useNoticeUpdateMutation = () => useMutation(
    ({ postId, ...notice }) => updateNoticePostApi(postId, notice),
    { mutationKey: ["useNoticeUpdateMutation"], retry: 0 }
);
