/** @jsxImportSource @emotion/react */
import * as s from './style';
import React from 'react';

export default function Mainlayout({ children }) {
  return <div css={s.layout}>{children}</div>;
}
