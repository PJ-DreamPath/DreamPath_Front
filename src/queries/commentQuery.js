import { useQuery } from "@tanstack/react-query";
import { getCommentsApi } from "../apis/commentApi";


export const usegGetCommentsQuery = (postId, params) => 
    useQuery({
        queryKey: ["usegGetCommentsQuery", postId, params],
        queryFn: async () => {
            
            return await getCommentsApi(postId, params)},
        enabled: postId !== 0,
        staleTime: 0,
        gcTime: 0
    });

