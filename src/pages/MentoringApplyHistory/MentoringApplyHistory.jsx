/** @jsxImportSource @emotion/react */
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import Select from 'react-select';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { GrView } from 'react-icons/gr';
import { FcLike } from 'react-icons/fc';
import { useGetMentoringApplyHistoryQuery } from '../../queries/userQuery';

function MentoringApplyHistory(props) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1');
    const searchText = searchParams.get('searchText') || '';
    const order = searchParams.get('order') || 'desc';
    const orderSelectOptions = [
        { value: 'desc', label: '최신순' },
        { value: 'asc', label: '오래된순' },
    ];
    

    const mentoringHistoryQuery = useGetMentoringApplyHistoryQuery({
        page,
        limitCount: 10,
        order,
        searchText,
    });

   
    const [searchInputValue, setSearchInputValue] = useState('');
    const handleSearchButtonOnClick = () => {
        searchParams.set('page', 1);
        searchParams.set('searchText', searchInputValue);
        setSearchParams(searchParams);
    };

    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        if (!mentoringHistoryQuery.isLoading) {
            const currentPage = mentoringHistoryQuery?.data?.data.page || 1;
            const totalPages = mentoringHistoryQuery?.data?.data.totalPages || 1;
            const startIndex = Math.floor((currentPage - 1) / 5) * 5 + 1;
            const endIndex = startIndex + 4 > totalPages ? totalPages : startIndex + 4;

            let newPageNumbers = [];
            for (let i = startIndex; i <= endIndex; i++) {
                newPageNumbers = [...newPageNumbers, i];
            }
            setPageNumbers(newPageNumbers);
            
        }
    }, [mentoringHistoryQuery.data]);

    useEffect(() => {
        mentoringHistoryQuery.refetch();
    }, [searchParams]);

    const handleSelectOnChange = (option) => {
        searchParams.set('order', option.value);
        setSearchParams(searchParams);
    };

    const handlePageNumbersOnClick = (pageNumber) => {
        searchParams.set('page', pageNumber);
        setSearchParams(searchParams);
    };

    const handleTitleOnClick = (postId) => {
        navigate(`/service/mentoring/${postId}`);
    };

    return (
        <div css={s.container}>
            <div css={s.titleSelectBar}>
                <h2 css={s.title}>멘토링 신청 내역</h2>
                <div css={s.searchTextContainer}>
                    <div css={s.searchInputBox}>
                        <input
                            type="text"
                            value={searchInputValue}
                            onChange={(e) => setSearchInputValue(e.target.value)}
                        />
                        <button
                            css={s.emptyButton}
                            onClick={handleSearchButtonOnClick}
                        >
                            <BiSearch />
                        </button>
                    </div>
                </div>
                <Select
                    options={orderSelectOptions}
                    styles={{
                        control: (style) => ({
                            ...style,
                            width: '15rem',
                            height: '4rem',
                            minHeight: 'unset',
                            fontSize: '1.3rem',
                            boxSizing: 'border-box',
                        }),
                        dropdownIndicator: (style) => ({
                            ...style,
                            padding: '0.3rem',
                        }),
                    }}
                    value={orderSelectOptions.find(
                        (option) => option.value === order
                    )}
                    onChange={handleSelectOnChange}
                />
            </div>
            <div css={s.tableWrapper}>
                <table css={s.table}>
                    <thead>
                        <tr css={s.tableRowHeader}>
                            <th css={s.tableHeader}>제목</th>
                            <th css={s.tableHeader}>작성자</th>
                            <th css={s.tableHeader}>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mentoringHistoryQuery?.data?.data.myMentoringSearchList.map(
                            (my, index) => (
                                <tr key={`MentoringApplyHistory${index}`} css={s.tableRow}>
                                    <td
                                        css={s.tableCell}
                                        onClick={() => handleTitleOnClick(my.postId)}
                                    >
                                        {my.title}
                                    </td>
                                    <td css={s.tableCell}>
                                        {my.mento}
                                    </td>
                                    <td css={s.tableCell}>{my.createdAt}</td>
                                    
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <div css={s.footer}>
                <div css={s.pageNumbers}>
                    <button
                        disabled={mentoringHistoryQuery?.data?.data.firstPage}
                        onClick={() => handlePageNumbersOnClick(page - 1)}
                    >
                        <GoChevronLeft />
                    </button>
                    {pageNumbers.map((number) => (
                        <button
                            key={`myMentoring${number}`}
                            css={s.pageNum(page === number)}
                            onClick={() => handlePageNumbersOnClick(number)}
                        >
                            <span>{number}</span>
                        </button>
                    ))}
                    <button
                        disabled={mentoringHistoryQuery?.data?.data.lastPage}
                        onClick={() => handlePageNumbersOnClick(page + 1)}
                    >
                        <GoChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MentoringApplyHistory;
