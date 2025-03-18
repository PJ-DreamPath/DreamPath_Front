import { api } from '../configs/axiosConfig';

export const boardsApi = async () => {
    return await api.get(`/api/boards`);
};
