import { api } from "../configs/axiosConfig";

export const mentoringCategoriesApi = async () => {
    return await api.get(`/api/mentoring/categories`);
};
