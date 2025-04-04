/** @jsxImportSource @emotion/react */
import * as s from './style';
import React from 'react';

function Footer(props) {
    return (
        <footer css={s.layout}>
            <div css={s.job}>
                <div>취준생 대표 일자리</div>
                <div css={s.dreamPath}>드림패스</div>
            </div>

            <div css={s.nameAndEmail}>
                <div>김시욱</div>
                <div>mhm1404@naver.com</div>
            </div>

            <div css={s.nameAndEmail}>
                <div>김선혜</div>
                <div>tjsgp1401@naver.com</div>
            </div>

            <div css={s.nameAndEmail}>
                <div>홍문일</div>
                <div>child4564@gmail.com</div>
            </div>

            <div css={s.nameAndEmail}>
                <div>김수환</div>
                <div>email@naver.com</div>
            </div>

            <div css={s.nameAndEmailLast}>
                <div>차정민</div>
                <div>susua6536@naver.com</div>
            </div>
        </footer>
    );
}

export default Footer;
