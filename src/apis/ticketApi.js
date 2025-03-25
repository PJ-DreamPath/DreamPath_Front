import { api } from "../configs/axiosConfig";

export const getSearchTicketPurchaseListApi = async (params) => await api.get("/api/ticket/purchase", {params});

export const ticketPurchaseApi = async (params) => {
    console.log(params);
    
    return await api.put(`/api/ticket/renewal?ticketId=${params.ticketId}`);
}