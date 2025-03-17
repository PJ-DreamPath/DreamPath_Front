/** @jsxImportSource @emotion/react */
import * as s from './style';
import { Link } from 'react-router-dom';
import React from 'react';

export default function SideMenuBox({}) {
  return (
    <ul css={s.sideMenuBox}>
      <li>
        <Link>내 정보 수정</Link>
      </li>
      <li>
        <Link>내 멘토링</Link>
      </li>
      <li>
        <Link>멘토링 신청 내역</Link>
      </li>
      <li>
        <Link>이용권 구매</Link>
      </li>
      <li>
        <Link>이용권 구매 내역</Link>
      </li>
      <li>
        <Link>포인트 충전 내역</Link>
      </li>
    </ul>
  );
}
