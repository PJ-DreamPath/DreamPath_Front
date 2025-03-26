import { useMutation } from "@tanstack/react-query"
import { pointChargeApi } from "../apis/pointApi"

export const usePointChargeMutation = () =>{
    return useMutation({
        mutationKey: [`usePointChargeMutation`],
        mutationFn: pointChargeApi,
        retry: 0,
    })
}