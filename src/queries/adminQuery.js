import { useQuery } from "@tanstack/react-query";
import { getAdminPosts, getAdminUsers } from "../apis/adminApi";

export const useGetAdminUsers = (params) =>
    useQuery({
        queryKey: ['useGetAdminUsers', params],
        queryFn: async () => {
            return await getAdminUsers(params);
        },
        retry: 0,
        staleTime: 1000 * 60 * 20,
        gcTime: 1000 * 60 * 10,
    });

export const useGetAdminPost = (params) =>
    useQuery({
        queryKey: ['useGetAdminPost', params],
        queryFn: async () => {
            return await getAdminPosts(params);
        },
        retry: 0,
        staleTime: 1000 * 60 * 20,
        gcTime: 1000 * 60 * 10,
    });