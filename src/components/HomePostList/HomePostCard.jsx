/** @jsxImportSource @emotion/react */
import moment from 'moment/moment';
import * as s from './homePostCardStyle';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import parse from 'html-react-parser';

const HomePostCard = React.forwardRef(
    (
        {
            status,
            likeCount,
            title,
            content,
            nickname,
            starPoint,
            createdAt,
            onClick,
        },
        ref
    ) => {
        const [isRecruiting, setIsRecruiting] = useState();

        useEffect(() => {
            setIsRecruiting(status === 'recruiting' ? true : false);
        }, [status]);

        return (
            <div ref={ref} css={s.cardBox} onClick={onClick}>
                <div css={s.top}>
                    <span css={s.chip(isRecruiting)}>
                        {status === 'recruiting' ? '모집중' : '모집마감'}
                    </span>
                    <div css={s.starBox}>
            
                            {Array.from({ length: starPoint }, (_, index) => (
                                <p key={`starPont_${index}`}>
                                    <FaStar />
                                </p>
                            ))}
                        </div>
                    <div css={s.heartBox}>
                        <FaHeart />
                        <span>{likeCount}</span>
                    </div>
                </div>
                <div css={s.titleBox}>
                    <p>{title}</p>
                    <div>{parse(content)}</div>
                </div>

                <div css={s.infoBox}>
                    <div>
                        <p>{nickname}</p>
                       
                    </div>
                    <p>{moment(createdAt).format('YYYY-MM-DD')}</p>
                </div>
            </div>
        );
    }
);

export default HomePostCard;
