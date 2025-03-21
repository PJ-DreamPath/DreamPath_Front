import { useQuery } from "@tanstack/react-query";
import { getUserMeApi } from "../apis/userApi";


export const useUserMeQuery = () => useQuery({

    queryKey: ["userMeQuery"],
    queryFn: getUserMeApi,
    retry: 0,
    staleTime: 1000 * 60 * 20,  
    gcTime: 1000 * 60 * 10,    
    
});