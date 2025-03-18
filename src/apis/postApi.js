import { api } from '../configs/axiosConfig';

export const postsApi = async (boardName, params) => {
    return await api.get(`/api/posts/${boardName}`, { params });
};

export const updateNoticePostApi = async (notice) => await api.post(`/api/notice/${notice.categoryName}`, {title: notice.title, content: notice.content});

