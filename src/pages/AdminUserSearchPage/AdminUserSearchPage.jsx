/** @jsxImportSource @emotion/react */
import axios from 'axios';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { api } from '../../configs/axiosConfig';
import { useGetAdminUsers } from '../../queries/adminQuery';
import { FaRegTrashCan } from "react-icons/fa6";


const AdminUserSearchPage = () => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);


    const [params, setParams] = useState ({
         page: 1,
         limitCount: 15,
         order: "desc",
         searchText: ""
    });

    useEffect(() => {
        console.log(params)
    }, [params])

    const adminUserList = useGetAdminUsers(params);
    useEffect(() => {console.log(adminUserList)}, [adminUserList]);

    const deleteUser = async (userId) => {

        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        
        try {
            await api.delete(`/api/admin/users/${userId}`)
            alert("삭제되었습니다.");
            setUsers(users.filter(user => user.userId !== userId));
        } catch (error) {
            console.error("삭제 오류", error);
            alert("삭제 실패! 다시 시도해주세요.");
        }
    };

    return (
        <div css={s.container}>
            <h2 css={s.title}>회원관리</h2>
            <div css={s.tableWrapper}>
                <table css={s.table}>
                    <thead>
                        <tr css={s.tableRowHeader}>
                            <th css={s.tableHeader}>userId</th>
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
                        {adminUserList?.data?.data?.userList.map((user, index) => (
                            <tr key={`adminUsers${index}`} css={s.tableRow}>
                                <td css={s.tableCell}>{user.userId}</td>
                                <td css={s.tableCell} className='name'>{user.username}</td>
                                <td css={s.tableCell}>{user.email}</td>
                                <td css={s.tableCell} className='name'>{user.nickname}</td>
                                <td css={s.tableCell}>{user.userRoles.map((role) => 
                                     role.role.roleName
                                )}</td>
                                <td css={s.tableCell}>{user.phoneNumber}</td>
                                <td css={s.tableCell}>{user.createdAt}</td>
                                <td css={s.tableCell}>{Number(user.totalPrice).toLocaleString()}원</td>
                                <td css={s.tableCell}>
                                    <button css={s.deleteButton} onClick={() => deleteUser(user.userId)}><FaRegTrashCan /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div css={s.footer}>
                <div css={s.pageNumbers}>
                    <button onClick={() => {}}><GoChevronLeft /></button>
                    {

                          Array.from({ length: adminUserList?.data?.data?.totalPages }, (_, index) => <button
                                    key={`adminUserPage${index}`}
                                    css={s.pageNum(adminUserList?.data?.data?.page === index + 1)}
                                    onClick={() => {
                                        setParams((prev) => ({

                                            ...prev,
                                            page: index + 1
                                        }));
                                    }}
                            >
                                    <span>{index + 1}</span>
                            </button>
                          )
                      
                    }
                    <button onClick={() => {}}><GoChevronRight /></button>
                </div>
            </div>
        </div>
    );
};


export default AdminUserSearchPage;
