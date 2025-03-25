/**@jsxImportSource @emotion/react */
import { useSearchParams } from 'react-router-dom';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { useGetSearchPointPurchaseList } from '../../queries/pointQuery';
import Select from 'react-select';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

function PointPurchasePage(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1');

    const order = searchParams.get('order') || 'desc';
    const orderSelectOptions = [
        { value: 'desc', label: '최신순' },
        { value: 'asc', label: '오래된순' },
    ];

    const searchPointPurchaseList = useGetSearchPointPurchaseList({
        page,
        limitCount: 10,
        order,
    });

    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        if (!searchPointPurchaseList.isLoading) {
            const currentPage = searchPointPurchaseList?.data?.data.page || 1;
            const totalPages =
                searchPointPurchaseList?.data?.data.totalPages || 1;
            const startIndex = Math.floor((currentPage - 1) / 5) * 5 + 1;
            const endIndex =
                startIndex + 4 > totalPages ? totalPages : startIndex + 4;

            let newPageNumbers = [];
            for (let i = startIndex; i <= endIndex; i++) {
                newPageNumbers = [...newPageNumbers, i];
            }
            setPageNumbers(newPageNumbers);
        }
    }, [searchPointPurchaseList.data]);

    useEffect(() => {
        searchPointPurchaseList.refetch();
    }, [searchParams]);

    const handleSelectOnChange = (option) => {
        searchParams.set('order', option.value);
        setSearchParams(searchParams);
    };

    const handlePageNumbersOnClick = (pageNumber) => {
        searchParams.set('page', pageNumber);
        setSearchParams(searchParams);
    };

    return (
        <div css={s.container}>
            <div css={s.titleSelectBar}>
                <h2 css={s.title}>포인트 충전 내역</h2>
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
                            <th css={s.tableHeader}>포인트</th>
                            <th css={s.tableHeader}>결제금액</th>
                            <th css={s.tableHeader}>구매일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchPointPurchaseList?.data?.data.pointPurchaseSearchList.map(
                            (point, index) => (
                                <tr key={index} css={s.tableRow}>
                                    <td css={s.tableCell}>{point.pointName}</td>
                                    <td css={s.tableCell}>
                                        {Number(
                                            point.pointPrice
                                        ).toLocaleString()}
                                        원
                                    </td>
                                    <td css={s.tableCell}>{point.createdAt}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <div css={s.footer}>
                <div css={s.pageNumbers}>
                    <button
                        disabled={searchPointPurchaseList?.data?.data.firstPage}
                        onClick={() => handlePageNumbersOnClick(page - 1)}
                    >
                        <GoChevronLeft />
                    </button>
                    {pageNumbers.map((number) => (
                        <button
                            key={`point${number}`}
                            css={s.pageNum(page === number)}
                            onClick={() => handlePageNumbersOnClick(number)}
                        >
                            <span>{number}</span>
                        </button>
                    ))}
                    <button
                        disabled={searchPointPurchaseList?.data?.data.lastPage}
                        onClick={() => handlePageNumbersOnClick(page + 1)}
                    >
                        <GoChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PointPurchasePage;
