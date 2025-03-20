import { useQuery } from "@tanstack/react-query";
import { getSearchTicketPurchaseListApi } from "../apis/ticketApi";

export const useGetSearchTicketPurchaseList = (params) => useQuery({
    queryKey: ["useGetSearchTicketPurchaseList"],
    queryFn: async () => {
        return await getSearchTicketPurchaseListApi(params);
    },
    retry: 0,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 5,
})