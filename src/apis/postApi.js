import { api } from '../configs/axiosConfig';

export const postsApi = async (boardName, params) => {
    return await api.get(`/api/posts/${boardName}`, { params });
};

export const registPostApi = async (data) =>
    await api.put(`/api/post`, { data });
