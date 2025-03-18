import { api } from '../configs/axiosConfig';

export const postsApi = async (boardName, params) => {
    return await api.get(`/api/posts/${boardName}`, { params });
};

export const updateNoticePostApi = async (postId, notice) => 
    await api.put(`/api/posts/${postId}`, { title: notice.title, content: notice.content });

