import { api } from '../configs/axiosConfig';

export const categoriesApi = async (boardId) => {
    return await api.get(`/api/category/list?boardId=${boardId}`);
};
