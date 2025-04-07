/** @jsxImportSource @emotion/react */
import axios from 'axios';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { api } from '../../configs/axiosConfig';
import { useGetAdminUsers } from '../../queries/adminQuery';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useUserMeQuery } from '../../queries/userQuery';
import { useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { userTotalCountAtom } from '../../atoms/userTotalAtom';

const AdminUserSearchPage = () => {
    const navigation = useNavigate();
    const pathNm = useParams();
    const loginUser = useUserMeQuery();

    const queryClient = useQueryClient();

    const [users, setUsers] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1');

    const [params, setParams] = useState({
        page: page,
        limitCount: 15,
        order: 'desc',
        searchText: '',
    });

    useEffect(() => {
        if(loginUser?.data?.data.roleName !== "ROLE_ADMIN") {
            navigation("/home");
        }
    }, [])

    useEffect(() => {
        setParams((prev) => ({
            ...prev,
            page: searchParams.get('page') || 1,
        }));
    }, [searchParams]);

    const adminUserList = useGetAdminUsers(params);
    const setUserTotalCount = useSetRecoilState(userTotalCountAtom);

    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        console.log("adminUserList", adminUserList);
        
        if (!adminUserList?.isLoading) {
            const currentPage = adminUserList?.data?.data.page || 1;
            const totalPages = adminUserList?.data?.data.totalPages || 1;
            const startIndex = Math.floor((currentPage - 1) / 5) * 5 + 1;
            const endIndex =
                startIndex + 4 > totalPages ? totalPages : startIndex + 4;

            let newPageNumbers = [];
            for (let i = startIndex; i <= endIndex; i++) {
                newPageNumbers = [...newPageNumbers, i];
            }
            setUserTotalCount(adminUserList.data.data.totalElements);
            setPageNumbers(newPageNumbers);
        }
    }, [adminUserList?.data]);

    const handlePageNumbersOnClick = (pageNumber) => {
        searchParams.set('page', pageNumber);
        setSearchParams(searchParams);
    };

    const deleteUser = async (userId) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        };

        api.delete(`/api/admin/users/${userId}`).then(async () => {

            const refetch22 = await adminUserList.refetch();

            console.log("Arefetch22",refetch22);
            


            alert('삭제되었습니다.');
            setUsers(users.filter((user) => user.userId !== userId));

        }).catch ( (error) =>  {
            console.error('삭제 오류', error);
            alert('삭제 실패! 다시 시도해주세요.');
        
        });
            
           
    }
        

    const { data } = useUserMeQuery();

    useEffect(() => {
        if (pathNm['*'] && pathNm['*'].includes('admin')) {
            if (data?.data?.roleName !== 'ROLE_ADMIN') {
                navigation('/');
                alert('권한이 없습니다.');
            }
        }
    }, [pathNm, data, navigation]);

    return (
        <div css={s.container}>
            <h2 css={s.title}>회원관리</h2>
            <div css={s.tableWrapper}>
                <table css={s.table}>
                    <thead>
                        <tr css={s.tableRowHeader}>
                            <th css={s.tableHeader}>username</th>
                            <th css={s.tableHeader}>이메일</th>
                            <th css={s.tableHeader}>닉네임</th>
                            <th css={s.tableHeader}>분류</th>
                            <th css={s.tableHeader}>휴대폰 번호</th>
                            <th css={s.tableHeader}>가입 날짜</th>
                            <th css={s.tableHeader}>결제 금액</th>
                            <th css={s.tableHeader}>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminUserList?.data?.data?.userList.map(
                            (user, index) => (
                                <tr key={`adminUsers${index}`} css={s.tableRow}>
                                    <td css={s.tableCell} className="name">
                                        {user.username}
                                    </td>
                                    <td css={s.tableCell}>{user.email}</td>
                                    <td css={s.tableCell} className="name">
                                        {user.nickname}
                                    </td>
                                    <td css={s.tableCell}>
                                        {user.userRoles.map(
                                            (role) => role.role.roleName
                                        )}
                                    </td>
                                    <td css={s.tableCell}>
                                        {user.phoneNumber}010-1234-1234
                                    </td>
                                    <td css={s.tableCell}>
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                    <td css={s.tableCell}>
                                        {Number(
                                            user.totalPrice
                                        ).toLocaleString()}
                                        원
                                    </td>
                                    <td css={s.tableCell}>
                                        <button
                                            css={s.deleteButton}
                                            onClick={async () =>{
                                                await deleteUser(user.userId).then(() => adminUserList.refetch());
                                            }
                                            }
                                        >
                                            <FaRegTrashCan />
                                        </button>
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
                        disabled={adminUserList?.data?.data.firstPage}
                        onClick={() => handlePageNumbersOnClick(page - 1)}
                    >
                        <GoChevronLeft />
                    </button>
                    {pageNumbers.map((number) => (
                        <button
                            key={`admimUserPage${number}`}
                            css={s.pageNum(page === number)}
                            onClick={() => handlePageNumbersOnClick(number)}
                        >
                            <span>{number}</span>
                        </button>
                    ))}
                    <button
                        disabled={adminUserList?.data?.data.lastPage}
                        onClick={() => handlePageNumbersOnClick(page + 1)}
                    >
                        <GoChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminUserSearchPage;
