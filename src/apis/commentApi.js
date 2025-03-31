import { api } from "../configs/axiosConfig";

export const updateCommentApi = async (commentId) => 
    await api.put(`/api/comments/${commentId}`)

export const deleteCommentApi = async (commentId) => 
    await api.delete(`/api/comments/${commentId}`)

export const saveCommentApi = async (params) => {
        console.log(params);
    return await api.post(`/api/comment`, params)
} 

export const getCommentsApi = async (postId, params) => {
    return await api.get(`/api/comments/${postId}`, {params});
};
    