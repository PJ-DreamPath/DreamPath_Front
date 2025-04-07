/** @jsxImportSource @emotion/react */
import * as s from './style';
import {
    Link,
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useGetCategories } from '../../../queries/categoriesQuery';
import { useGetBoards } from '../../../queries/boardQuery';
import { useRecoilState } from 'recoil';
import { sideMenuBoxMentoringState } from '../../../atoms/sideMenuBox';
import { useQueryClient } from '@tanstack/react-query';

/**
 * 사이드 메뉴를 사용하는 페이지마다 데이터가 다름
 */
export default function SideMenuBox({}) {
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const loginUser = queryClient.getQueryData(['userMeQuery'])?.data;

    
    // path를 가져와서 마이페이지, cms 또는 멘토링 인지 구별 하기 위함
    const fullPath = useParams();

    // boardList
    const boardList = useGetBoards();
    const [board, setBoard] = useState({
        boardId: 0,
    });
    useEffect(() => {
        if (
            fullPath['*'] === 'service/mentoring' ||
            fullPath['*'].includes('mypage') ||
            fullPath['*'].includes('admin')
        ) {
            if (boardList && boardList.data && boardList.data.data) {
                let newArray = boardList.data.data.filter((board) =>
                    fullPath['*'].includes(`service/${board.boardName}`)
                )[0];

                setBoard(newArray);
            }
        }
    }, [fullPath, boardList.data]);

    useEffect(() => {
        if (
            fullPath['*'] === 'service/mentoring' ||
            fullPath['*'].includes('mypage') ||
            fullPath['*'].includes('admin')
        ) {
            boardList.refetch();
        }
    }, [fullPath]);

    // 각 페이지 데이터 리스트
    const categories = useGetCategories(board?.boardId);
    const [list, setList] = useState([]);

    useEffect(() => {
        categories.refetch();
    }, [board]);

    useEffect(() => {
        if (categories && categories.data && categories.data.data)
            setList(categories.data.data);
    }, [categories.data]);

    // 멘토링 페이지 일뗴만!
    // 검색 조건
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useRecoilState(sideMenuBoxMentoringState);
    useEffect(() => {
        if (fullPath['*'] === 'service/mentoring')
            setSearch({
                category: searchParams.get('category') || '',
                searchTxt: searchParams.get('searchTxt') || '',
            });
    }, [searchParams]);

    return fullPath['*'] === 'service/mentoring' ||
        fullPath['*'].includes('mypage') ||
        fullPath['*'].includes('admin') ? (
        !categories.isLoading ? (
            <ul css={s.sideMenuBox}>
                {list.map((category, idx) =>
                    loginUser.roleName === 'ROLE_MENTI' ? (
                        loginUser.roleName === category.type ||
                        category.type === 'mentoring' ? (
                            <li
                                key={`category_${idx}`}
                                css={s.click(
                                    (fullPath['*'] === 'service/mentoring' &&
                                        searchParams.get('category') ==
                                            category.categoryName) ||
                                        (category.categoryName === 'mypage' &&
                                            fullPath['*'] ===
                                                'service/mypage') ||
                                        (category.categoryName === 'admin' &&
                                            fullPath['*'] ===
                                                'service/admin') ||
                                        fullPath['*'] ===
                                            `service/mypage/${category.categoryName}` ||
                                        fullPath['*'] ===
                                            `service/admin/${category.categoryName}`
                                )}
                                onClick={() => {
                                    if (fullPath['*'] === 'service/mentoring') {
                                        if (
                                            searchParams.get('category') ==
                                            category.categoryName
                                        ) {
                                            searchParams.set('category', '');
                                            setSearchParams(searchParams);
                                        } else {
                                            searchParams.set(
                                                'category',
                                                category.categoryName
                                            );
                                            setSearchParams(searchParams);
                                        }
                                    } else {
                                        const to = boardList?.data?.data.find(
                                            (name) =>
                                                name.boardName ===
                                                category.categoryName
                                        ).boardName;

                                        if (fullPath['*'].includes('mypage')) {
                                            if (to === 'mypage') {
                                                navigate(`/service/mypage`);
                                                return;
                                            }
                                            navigate(`/service/mypage/${to}`);
                                        } else if (
                                            fullPath['*'].includes('admin')
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
                                <Link>{category.categoryNameKor}</Link>
                            </li>
                        ) : (
                            <></>
                        )
                    ) : (
                        <li
                            key={`category_${idx}`}
                            css={s.click(
                                (fullPath['*'] === 'service/mentoring' &&
                                    searchParams.get('category') ==
                                        category.categoryName) ||
                                    (category.categoryName === 'mypage' &&
                                        fullPath['*'] === 'service/mypage') ||
                                    (category.categoryName === 'admin' &&
                                        fullPath['*'] === 'service/admin') ||
                                    fullPath['*'] ===
                                        `service/mypage/${category.categoryName}` ||
                                    fullPath['*'] ===
                                        `service/admin/${category.categoryName}`
                            )}
                            onClick={() => {
                                if (fullPath['*'] === 'service/mentoring') {
                                    if (
                                        searchParams.get('category') ==
                                        category.categoryName
                                    ) {
                                        searchParams.set('category', '');
                                        setSearchParams(searchParams);
                                    } else {
                                        searchParams.set(
                                            'category',
                                            category.categoryName
                                        );
                                        setSearchParams(searchParams);
                                    }
                                } else {
                                    const to = boardList?.data?.data.find(
                                        (name) =>
                                            name.boardName ===
                                            category.categoryName
                                    ).boardName;

                                    if (fullPath['*'].includes('mypage')) {
                                        if (to === 'mypage') {
                                            navigate(`/service/mypage`);
                                            return;
                                        }
                                        navigate(`/service/mypage/${to}`);
                                    } else if (
                                        fullPath['*'].includes('admin')
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
                            <Link>{category.categoryNameKor}</Link>
                        </li>
                    )
                )}
            </ul>
        ) : (
            <></>
        )
    ) : (
        <></>
    );
}
