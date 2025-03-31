
import { useMutation } from "@tanstack/react-query";
import { deleteCommentApi, saveCommentApi, updateCommentApi } from "../apis/commentApi";

export const useUpdateCommentMutation = () => useMutation({
    mutationKey: ["useUpdateCommentMutation"],
    mutationFn: updateCommentApi,
    retry: 0,
});

export const useDeleteCommentMutation = () => useMutation({
    mutationKey: ["useDeleteCommentMutation"],
    mutationFn: deleteCommentApi,
    retry: 0,
});

export const useSaveCommentMutation = () => useMutation({
    mutationKey: ["useSaveCommentMutation"],
    mutationFn: saveCommentApi,
    retry: 0,
})