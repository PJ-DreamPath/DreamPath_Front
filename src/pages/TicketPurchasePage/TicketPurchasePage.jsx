/**@jsxImportSource @emotion/react */
import { useSearchParams } from 'react-router-dom';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useGetSearchTicketPurchaseList } from '../../queries/ticketQuery';

function TicketPurchasePage(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1');

    const order = searchParams.get('order') || 'desc';
    const orderSelectOptions = [
        { value: 'desc', label: '최신순' },
        { value: 'asc', label: '오래된순' },
    ];

    const searchTicketPurchaseList = useGetSearchTicketPurchaseList({
        page,
        limitCount: 10,
        order,
    });

    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        if (!searchTicketPurchaseList.isLoading) {
            const currentPage = searchTicketPurchaseList?.data?.data.page || 1;
            const totalPages =
                searchTicketPurchaseList?.data?.data.totalPages || 1;
            const startIndex = Math.floor((currentPage - 1) / 5) * 5 + 1;
            const endIndex =
                startIndex + 4 > totalPages ? totalPages : startIndex + 4;

            let newPageNumbers = [];
            for (let i = startIndex; i <= endIndex; i++) {
                newPageNumbers = [...newPageNumbers, i];
            }
            setPageNumbers(newPageNumbers);
        }
    }, [searchTicketPurchaseList.data]);

    useEffect(() => {
        searchTicketPurchaseList.refetch();
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
                <h2 css={s.title}>티켓 구매 내역</h2>
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
                            <th css={s.tableHeader}>이용권</th>
                            <th css={s.tableHeader}>포인트</th>
                            <th css={s.tableHeader}>구매일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchTicketPurchaseList?.data?.data.ticketPurchaseHistoryList.map(
                            (ticket, index) => (
                                <tr key={index} css={s.tableRow}>
                                    <td css={s.tableCell}>
                                        {ticket.ticketName}
                                    </td>
                                    <td css={s.tableCell}>
                                        {Number(ticket.price).toLocaleString()}P
                                    </td>
                                    <td css={s.tableCell}>
                                        {ticket.createdAt}
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <div css={s.footer}>
                <div css={s.pageNumbers}>
                    <button
                        disabled={
                            searchTicketPurchaseList?.data?.data.firstPage
                        }
                        onClick={() => handlePageNumbersOnClick(page - 1)}
                    >
                        <GoChevronLeft />
                    </button>
                    {pageNumbers.map((number) => (
                        <button
                            key={`ticket${number}`}
                            css={s.pageNum(page === number)}
                            onClick={() => handlePageNumbersOnClick(number)}
                        >
                            <span>{number}</span>
                        </button>
                    ))}
                    <button
                        disabled={searchTicketPurchaseList?.data?.data.lastPage}
                        onClick={() => handlePageNumbersOnClick(page + 1)}
                    >
                        <GoChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TicketPurchasePage;
