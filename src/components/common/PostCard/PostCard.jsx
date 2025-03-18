/** @jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';

export default function PostCard({
    status,
    title,
    content,
    nickname,
    starPoint,
}) {
    const [isRecruiting, setIsRecruiting] = useState(
        status === 'recruiting' ? true : false
    );

    return (
        <div css={s.cardBox}>
            <div css={s.top}>
                <span css={s.chip(isRecruiting)}>{status}</span>
                <div css={s.heartBox}>
                    <FaHeart />
                    <span>13</span>
                </div>
            </div>
            <div css={s.titleBox}>
                <p>{title}</p>
                <p>{content}</p>
            </div>

            <div css={s.infoBox}>
                <div>
                    <p>{nickname}</p>
                    <div css={s.starBox}>
                        {Array.from({ length: starPoint }, (index) => (
                            <p key={`starPont_${index}`}>
                                <FaStar />
                            </p>
                        ))}
                    </div>
                </div>
                <p>2025-12-22</p>
            </div>
        </div>
    );
}
