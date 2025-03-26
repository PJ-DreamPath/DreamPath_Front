/**@jsxImportSource @emotion/react */
import { alertTitleClasses } from '@mui/material';
import { useTicketPurchaseMutation } from '../../mutations/ticketMutation';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { usePointChargeMutation } from '../../mutations/pointMutation';

function PurchaseSectionPage(props) {
    
  const [ payments, setPayments] = useState([]);

  
  const ticketPurchase = useTicketPurchaseMutation();
  const pointCharge = usePointChargeMutation();

  const PAYSTATUS = {
    "PAID": "걸제완료",
    "FAILED": "결제실패",
  }

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




    const handlePointChargeButtonOnClick = async (e) => {
        const pointId = Number(e.target.value);
        const mid = "exampleMid";  // 사용자 머춴트아이디 넣어얄함함
        const status = true;
       
        await pointCharge.mutateAsync({pointId, mid, status})
        .then((response) => {
            console.log(response);
            Swal.fire("충전 완료");
       })
       .catch((error) => {
        console.error(error);
        Swal.fire("포인트 충전 실패");
    });
    }


    
    const handlePurchaseButtonOnClick = async (e) => {
    
        
        await ticketPurchase.mutateAsync({ticketId: Number(e.target.value)}).then((response) => {
             console.log(response);
             Swal.fire(response.data);
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
                        <button value ={1} onClick={handlePointChargeButtonOnClick}>구매</button>
                    </div>
                </div>
                <div css={s.option}>
                    <span>골드</span>
                    <span>10,000P</span>
                    <div css={s.optionButton}>
                        <span>11,000원</span>
                        <button value={2} onClick={handlePointChargeButtonOnClick}>구매</button>
                    </div>
                </div>
                <div css={s.option}>
                    <span>플래티넘</span>
                    <span>20,000P</span>
                    <div css={s.optionButton}>
                        <span>21,000원</span>
                        <button value={3} onClick={handlePointChargeButtonOnClick}>구매</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchaseSectionPage;