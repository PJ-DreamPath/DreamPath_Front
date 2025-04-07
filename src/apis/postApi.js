import { api } from '../configs/axiosConfig';

// 등록 C
export const registPostApi = async (formData) =>
    await api.post('/api/post', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

// 전체 조회 R
export const postsApi = async (boardId, params) =>
    await api.get(`/api/posts/${boardId}`, { params });

// 상세 조회 R
export const postDetailApi = async (postId) =>
    await api.get(`/api/post/${postId}`);

// 조회수 업데이트 U
export const postViewCountApi = async (postId) => 
    await api.put(`/api/post/${postId}`);

// 수정 U
export const updatePostApi = async (params) =>
    await api.put(`/api/posts/${params.postId}`, params.formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

// 삭제 D
export const delPostApi = async (postId) =>
    await api.delete(`/api/posts/${postId}`);

// 내 좋아요 조회
export const postsMyLikes = async (postId) =>
    await api.get(`/api/posts/${postId}/my/like`);

// 게시글 좋아요
export const postLikeApi = async (postId) =>
    await api.post(`/api/posts/${postId}/like`);

// 게시글 좋아요 취소
export const postLikeCancelApi = async (postId) =>
    await api.delete(`/api/posts/${postId}/like`);
