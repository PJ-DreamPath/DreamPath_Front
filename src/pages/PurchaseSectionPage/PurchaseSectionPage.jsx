/**@jsxImportSource @emotion/react */
import * as s from './style';
import React from 'react';

function PurchaseSectionPage(props) {
    return (
        <div css={s.container}>
            <div css={s.purchaseSection}>
                <h3>이용권 구매</h3>
                <div css={s.option}>
                    <span>실버(10회)</span>
                    <span>10,000 P</span>
                </div>
                <div css={s.option}>
                    <span>골드(20회)</span>
                    <span>13,000 P</span>
                </div>
                <div css={s.option}>
                    <span>플래티넘(30회)</span>
                    <span>17,000 P</span>
                </div>
            </div>
            <div css={s.purchaseSection}>
                <h3>포인트 충전</h3>
                <div css={s.option}>
                    <span>실버(5,000P)</span>
                    <span>6,000원</span>
                </div>
                <div css={s.option}>
                    <span>골드(10,000P)</span>
                    <span>11,000 P</span>
                </div>
                <div css={s.option}>
                    <span>플래티넘(20,000P)</span>
                    <span>21,000원</span>
                </div>
            </div>
        </div>
    );
}

export default PurchaseSectionPage;