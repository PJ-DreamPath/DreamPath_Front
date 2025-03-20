import { api } from "../configs/axiosConfig";

export const getSearchTicketPurchaseListApi = async (params) => await api.get("/api/ticket/purchase", {params});