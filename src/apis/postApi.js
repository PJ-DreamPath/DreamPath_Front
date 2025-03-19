import { api } from '../configs/axiosConfig';

export const postsApi = async (boardName, params) => {
    return await api.get(`/api/posts/${boardName}`, { params });
};

export const registPostApi = async (formData) =>
    await api.post('/api/post', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
