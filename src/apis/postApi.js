import { api } from '../configs/axiosConfig';

// 등록 C
export const registPostApi = async (formData) =>
    await api.post('/api/post', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

// 전체 조회 R
export const postsApi = async (boardId, params) => {
    return await api.get(`/api/posts/${boardId}`, { params });
};

// 상세 조회 R
export const postDetailApi = async (postId) => {
    return await api.get(`/api/post/${postId}`);
};

// 수정 U

// 삭제 D
export const delPostApi = async (postId) => {
    return await api.delete(`/api/posts/${postId}`);
};
