import { useQuery } from "@tanstack/react-query";
import { getCommentsApi } from "../apis/commentApi";

export const useUserInfo = () => {
    useQuery({
        queryKey: ["userMeQuery"],
        queryFn: fetchUserInfo,
        staleTime: 1000 * 60 * 5, 
    });
};

export const usegetCommentsQuery = (params) => 
    useQuery({
        queryKey: ["usegetCommentsQuery", params],
        queryFn: async () => await getCommentsApi(params),

        retry: 0,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5
    });

