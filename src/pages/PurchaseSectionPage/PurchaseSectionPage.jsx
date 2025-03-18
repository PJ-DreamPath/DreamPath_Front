/**@jsxImportSource @emotion/react */
import * as s from './style';
import React from 'react';

function PurchaseSectionPage(props) {
    return (
        <div css={s.container}>
            <h3>이용권 구매</h3>
            <div css={s.purchaseSection}>
                
                <div css={s.option}>
                    <span>실버</span>
                    <span>10회</span>
                    <div css={s.optionButton}>
                        <span>10,000P</span>
                        <button>구매</button>
                    </div>
                </div>
                <div css={s.option}>
                    <span>골드</span>
                    <span>20회</span>
                    <div css={s.optionButton}>
                        <span>13,000P</span>
                        <button>구매</button>
                    </div>
                </div>
                <div css={s.option}>
                    <span>플래티넘</span>
                    <span>30회</span>
                    <div css={s.optionButton}>
                        <span>17,000P</span>
                        <button>구매</button>
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
                        <button>구매</button>
                    </div>
                </div>
                <div css={s.option}>
                    <span>골드</span>
                    <span>10,000P</span>
                    <div css={s.optionButton}>
                        <span>11,000원</span>
                        <button>구매</button>
                    </div>
                </div>
                <div css={s.option}>
                    <span>플래티넘</span>
                    <span>20,000P</span>
                    <div css={s.optionButton}>
                        <span>21,000원</span>
                        <button>구매</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchaseSectionPage;