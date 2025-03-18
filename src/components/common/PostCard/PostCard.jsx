/** @jsxImportSource @emotion/react */
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';

export default function PostCard({
    status,
    viewCount,
    title,
    content,
    nickname,
    starPoint,
    createdAt,
}) {
    const [isRecruiting, setIsRecruiting] = useState();

    useEffect(() => {
        setIsRecruiting(status === 'recruiting' ? true : false);
    }, [status]);

    return (
        <div css={s.cardBox}>
            <div css={s.top}>
                <span css={s.chip(isRecruiting)}>
                    {status === 'recruiting' ? '모집중' : '모집마감'}
                </span>
                <div css={s.heartBox}>
                    <FaHeart />
                    <span>{viewCount}</span>
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
                <p>{createdAt}</p>
            </div>
        </div>
    );
}
