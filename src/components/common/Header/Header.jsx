/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import * as s from './style';
import React from 'react';

export default function Header({}) {
  return (
    <header css={s.header}>
      <h1 css={s.logo}>
        <img src={'../../public/img/img_logo_white.svg'} />
      </h1>

      <nav css={s.nav}>
        <Link to={'/mentoring'}>멘토링</Link>
        <Link to={'/communityBoard'}>자유게시판</Link>
        <Link to={'/notice'}>공지사항</Link>
      </nav>
    </header>
  );
}
