import { api } from "../configs/axiosConfig";

export const getSearchPointPurchaseListApi = async (params) => await api.get("/api/point/purchase", {params});