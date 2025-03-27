/** @jsxImportSource @emotion/react */
import * as s from './style';
import React from 'react';

export default function TopContainer({ children }) {
  return <div css={s.container}>{children}</div>;
}
