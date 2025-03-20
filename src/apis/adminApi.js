import { api } from "../configs/axiosConfig";

export const getAdminUsers = async (params) => {
    return await api.get(`/api/admin/users`, {params});
};

export const getAdminPosts = async (params) => {
    return await api.get(`api/admin/posts`, {params});
}