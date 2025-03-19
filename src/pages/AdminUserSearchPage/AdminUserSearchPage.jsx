/** @jsxImportSource @emotion/react */
import axios from 'axios';
import * as s from './style';
import React, { useEffect, useState } from 'react';

const AdminUserSearchPage = () => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        allUsers();
    }, []);

    const allUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/admin/users");
            console.log(response);
            setUsers(response.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("error", error);
        }
    };

    const deleteUser = async (userId) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
    
        try {
            await axios.delete("http://localhost:8080/admin/users/{userId}");
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
                        {users.map((user, index) => (
                            <tr key={index} css={s.tableRow}>
                                <td css={s.tableCell}>{user.userId}</td>
                                <td css={s.tableCell}>{user.username}</td>
                                <td css={s.tableCell}>{user.email}</td>
                                <td css={s.tableCell}>{user.nickname}</td>
                                <td css={s.tableCell}>{user.roleType}</td>
                                <td css={s.tableCell}>{user.phoneNumber}</td>
                                <td css={s.tableCell}>{user.createdAt}</td>
                                <td css={s.tableCell}>{user.remainPoint}</td>
                                <td css={s.tableCell}>
                                    <button css={s.deleteButton} onClick={() => deleteUser(user.userId)}>🗑</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div css={s.pagination}>
                {[...Array(totalPages)].map((_, index) => (
                    <button key={index} css={s.pageButton}>{index + 1}</button>
                ))}
            </div>
        </div>
    );
};

export default AdminUserSearchPage;
