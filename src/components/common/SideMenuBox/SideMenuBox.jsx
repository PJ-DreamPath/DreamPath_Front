/** @jsxImportSource @emotion/react */
import * as s from './style';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useGetCategories } from '../../../queries/categoriesQuery';
import { useGetBoards } from '../../../queries/boardQuery';

/**
 * 사이드 메뉴를 사용하는 페이지마다 데이터가 다름
 */
export default function SideMenuBox({}) {
    const navigate = useNavigate();

    // path를 가져와서 마이페이지, cms 또는 멘토링 인지 구별 하기 위함
    const fullPath = useParams();

    // boardList
    const boardList = useGetBoards();
    const [board, setBoard] = useState({});
    useEffect(() => {
        if (
            fullPath['*'].includes('service/mentoring') ||
            fullPath['*'].includes('service/mypage') ||
            fullPath['*'].includes('service/admin')
        ) {
            if (boardList && boardList.data && boardList.data.data) {
                let newArray = boardList.data.data.filter((board) =>
                    fullPath['*'].includes(`service/${board.boardName}`)
                )[0];
                setBoard(newArray);
            }
        }
    }, [fullPath]);

    // 각 페이지 데이터 리스트
    const categories = useGetCategories(board.boardId);
    const [list, setList] = useState([]);

    useEffect(() => {
        if (categories && categories.data && categories.data.data)
            setList(categories.data.data);
    }, [categories.data]);

    return fullPath['*'].includes('mentoring') ||
        fullPath['*'].includes('mypage') ||
        fullPath['*'].includes('admin') ? (
        <ul css={s.sideMenuBox}>
            {list.map((category, idx) => (
                <li
                    key={`category_${idx}`}
                    onClick={() => {
                        if (fullPath['*'].includes('service/mentoring')) {
                        } else {
                            const to = boardList?.data?.data.find(
                                (name) =>
                                    name.boardNameKor === category.categoryName
                            ).boardName;

                            if (fullPath['*'].includes('service/mypage')) {
                                if (to === 'mypage') {
                                    navigate(`/service/mypage`);
                                    return;
                                }
                                navigate(`/service/mypage/${to}`);
                            } else if (
                                fullPath['*'].includes('service/admin')
                            ) {
                                if (to === 'admin') {
                                    navigate(`/service/admin`);
                                    return;
                                }
                                navigate(`/service/admin/${to}`);
                            }
                        }
                    }}
                >
                    <Link>{category.categoryName}</Link>
                </li>
            ))}
        </ul>
    ) : (
        <></>
    );
}
