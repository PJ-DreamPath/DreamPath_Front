/**@jsxImportSource @emotion/react */
import { useTicketPurchaseMutation } from '../../mutations/ticketMutation';
import * as s from './style';
import Swal from 'sweetalert2';
import { usePointChargeMutation } from '../../mutations/pointMutation';
import PortOne from '@portone/browser-sdk/v2';

import { v4 as uuid } from 'uuid';
import { useQueryClient } from '@tanstack/react-query';
import { useUserMeQuery } from '../../queries/userQuery';

function PurchaseSectionPage(props) {

    const ticketPurchase = useTicketPurchaseMutation();
    const pointCharge = usePointChargeMutation();
    const queryClient = useQueryClient();
    const loginUser = useUserMeQuery();


    //상품
    const products = [
        {
            productId: 1,
            productName: "실버",
            price: 6000,

        },
        {

            productId: 2,
            productName: "골드",
            price: 11000,

        },
        {

            productId: 3,
            productName: "플래티넘",
            price: 21000,

        },
    ];

    
    const handlePointChargeButtonOnClick = async (productId) => {
        const foundProduct = products.find((p) => p.productId === productId);
    
        if (!foundProduct) {
            Swal.fire("상품 선택 오류.");
            return;
        }
    
        const pointId = Number(productId);
    
        try {
            // 결제 요청
            const paymentResponse = await PortOne.requestPayment({
                storeId: import.meta.env.VITE_PORTONE_STOREID,
                paymentId: uuid(),
                orderName: foundProduct.productName,
                totalAmount: foundProduct.price,
                currency: "CURRENCY_KRW",
                payMethod: "EASY_PAY",
                channelKey: "channel-key-d6ca66bc-d6c7-47b5-bc38-ccace70e2046",
                customer: {
                    customerId: "userId",
                    fullName: "홍문일",
                },
                products: [
                    {
                        id: foundProduct.productId.toString(),
                        name: foundProduct.productName,
                        amount: foundProduct.price,
                        quantity: 1,
                    },
                ],
            });

            if (!!paymentResponse?.code) {
                throw new Error("결제 취소");
            }
    
            await pointCharge.mutateAsync({ pointId, mid: paymentResponse.paymentId});
            loginUser.refetch();
           
        } catch (error) {
            console.error("결제 처리 중 에러 발생:", error);
            Swal.fire("결제 실패");
        }
    };
    

const handlePurchaseButtonOnClick = async (e) => {


    await ticketPurchase.mutateAsync({ ticketId: Number(e.target.value) }).then((response) => {
        Swal.fire(response.data);
        loginUser.refetch();

    });

}


return (
    <div css={s.container}>
        <h3>이용권 구매</h3>
        <div css={s.purchaseSection}>

            <div css={s.option}>
                <span>실버</span>
                <span>10회</span>
                <div css={s.optionButton}>
                    <span>10,000P</span>
                    <button value={1} onClick={handlePurchaseButtonOnClick}>구매</button>
                </div>
            </div>
            <div css={s.option}>
                <span>골드</span>
                <span>20회</span>
                <div css={s.optionButton}>
                    <span>13,000P</span>
                    <button value={2} onClick={handlePurchaseButtonOnClick}>구매</button>
                </div>
            </div>
            <div css={s.option}>
                <span>플래티넘</span>
                <span>30회</span>
                <div css={s.optionButton}>
                    <span>17,000P</span>
                    <button value={3} onClick={handlePurchaseButtonOnClick}>구매</button>
                </div>
            </div>
        </div>
        <h3>포인트 충전</h3>
        <div css={s.purchaseSection}>
            <div css={s.option}>
                <span>실버</span>
                <span>5,000P</span>
                <div css={s.optionButton}>
                    <span>6,000원</span>
                    <button value={1} onClick={() => handlePointChargeButtonOnClick(1)}>구매</button>
                </div>
            </div>
            <div css={s.option}>
                <span>골드</span>
                <span>10,000P</span>
                <div css={s.optionButton}>
                    <span>11,000원</span>
                    <button value={2} onClick={() => handlePointChargeButtonOnClick(2)}>구매</button>
                </div>
            </div>
            <div css={s.option}>
                <span>플래티넘</span>
                <span>20,000P</span>
                <div css={s.optionButton}>
                    <span>21,000원</span>
                    <button value={3} onClick={() => handlePointChargeButtonOnClick(3)}>구매</button>
                </div>
            </div>
        </div>
    </div>
);

}
export default PurchaseSectionPage;