import { api } from "../configs/axiosConfig";

export const updateCommentApi = async (params) => 
    await api.put(`/api/comments/${params.commentId}`, params)

export const deleteCommentApi = async (params) => {
    return await api.delete(`/api/comments/${params.commentId}?userId=${params.userId}`)
}

export const saveCommentApi = async (params) => {
    return await api.post(`/api/comment`, params)
} 

export const getCommentsApi = async (postId, params) => {
    return await api.get(`/api/comments/${postId}`, {params});
};
    