import { api } from '../configs/axiosConfig';

export const postsApi = async (boardName, params) => {
    return await api.get(`/api/posts/${boardName}`, { params });
};
