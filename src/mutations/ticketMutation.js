import { useMutation } from "@tanstack/react-query"
import { ticketPurchaseApi } from "../apis/ticketApi"

export const useTicketPurchaseMutation = () => 
    useMutation({
        mutationKey: ['useTicketPurchaseMutation'],
        mutationFn: ticketPurchaseApi,
        retry: 0,
    });




