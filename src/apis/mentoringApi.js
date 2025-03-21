import { api } from '../configs/axiosConfig';

// 멘토링 모집 상태 수정
export const mentoringStatusUpdateApi = async (postId) =>
    await api.put(`/api/mentoring/status?postId=${postId}`);
