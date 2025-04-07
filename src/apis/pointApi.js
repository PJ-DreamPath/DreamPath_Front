import { api } from "../configs/axiosConfig";

export const getSearchPointPurchaseListApi = async (params) => await api.get("/api/point/purchase", {params});



export const pointChargeApi = async (params) => {
    return await api.post(`/api/point/purchase?pointId`, {
        pointId: params.pointId,
        mid: params.mid,
        status: params.status,
    
    })
}

