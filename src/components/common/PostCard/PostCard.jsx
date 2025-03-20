/** @jsxImportSource @emotion/react */
import moment from 'moment/moment';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import parse from 'html-react-parser';

const PostCard = React.forwardRef(
    (
        { status, viewCount, title, content, nickname, starPoint, createdAt },
        ref
    ) => {
        const [isRecruiting, setIsRecruiting] = useState();

        useEffect(() => {
            setIsRecruiting(status === 'recruiting' ? true : false);
        }, [status]);

        return (
            <div ref={ref} css={s.cardBox}>
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
                    <p>{parse(content)}</p>
                </div>

                <div css={s.infoBox}>
                    <div>
                        <p>{nickname}</p>
                        <div css={s.starBox}>
                            {Array.from({ length: starPoint }, (_, index) => (
                                <p key={`starPont_${index}`}>
                                    <FaStar />
                                </p>
                            ))}
                        </div>
                    </div>
                    <p>{moment(createdAt).format('YYYY-MM-DD')}</p>
                </div>
            </div>
        );
    }
);

export default PostCard;
