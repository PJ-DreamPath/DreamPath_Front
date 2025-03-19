import { useQuery } from "@tanstack/react-query";
import { getSearchPointPurchaseListApi } from "../apis/pointApi";

export const useGetSearchPointPurchaseList = (params) => useQuery({
    queryKey: ["useGetSearchPointPurchaseList"],
    queryFn: async () => {
        return await getSearchPointPurchaseListApi(params);
    },
    retry: 0,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 5,
})