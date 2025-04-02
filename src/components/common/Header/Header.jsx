/** @jsxImportSource @emotion/react */
import { Link, useNavigate } from 'react-router-dom';
import * as s from './style';
import React from 'react';

export default function Header({}) {
  const navigate = useNavigate();
  const handleImgOnClick = () => {
    navigate('/home');
  }
  return (
    <header css={s.header}>
      <h1 css={s.logo}>
        <img src={'/img/img_logo_white.svg'} onClick={handleImgOnClick} />
      </h1>

      <nav css={s.nav}>
        <Link to={'/service/mentoring'}>멘토링</Link>
        <Link to={'/communityboard'}>자유게시판</Link>
        <Link to={'/notice'}>공지사항</Link>
      </nav>
    </header>
  );
}
