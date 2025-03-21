/** @jsxImportSource @emotion/react */
import axios from 'axios';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { api } from '../../configs/axiosConfig';
import { useGetAdminPost } from '../../queries/adminQuery';
import { FaRegTrashCan } from "react-icons/fa6";
import { useSearchParams } from 'react-router-dom';


const AdminPostSearchPage = () => {
    const [posts, getPosts] = useState([]);

        const [searchParams, setSearchParams] = useSearchParams();
        const page = parseInt(searchParams.get("page") || "1");


    const [params, setParams] = useState ({
         page: page,
         limitCount: 10,
         order: "desc",
         searchText: ""
    });

    useEffect(() => {
        setParams((prev) =>({
            ...prev,
            page: searchParams.get("page") || 1
        }))
    }, [searchParams])
    

    const adminPostList = useGetAdminPost(params);

    console.log("sadsadsa", adminPostList);
    


 const [pageNumbers, setPageNumbers] = useState([]);


    useEffect(() => {
            if (!adminPostList?.isLoading) {
                const currentPage = adminPostList?.data?.data.page || 1;
                const totalPages = adminPostList?.data?.data.totalPages || 1;
                const startIndex = Math.floor((currentPage - 1) / 5) * 5 + 1;
                const endIndex = startIndex + 4 > totalPages ? totalPages : startIndex + 4;
    
                let newPageNumbers = [];
                for (let i = startIndex; i <= endIndex; i++) {
                    newPageNumbers = [...newPageNumbers, i];
                }

                setPageNumbers(newPageNumbers);

                console.log("총 게시글 개수:", adminPostList?.data?.data?.totalElements);
                console.log("한 페이지당 게시글 수:", adminPostList?.data?.data?.limitCount);
                console.log("총 페이지 수:", adminPostList?.data?.data?.totalPages);
                console.log("현재 페이지:", adminPostList?.data?.data?.currentPage);
    
            }
        }, [adminPostList?.data]);



    const handlePageNumbersOnClick = (pageNumber) => {
        searchParams.set("page", pageNumber);
        setSearchParams(searchParams);
    }

    const deletePost = async (postId) => {

        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        
        try {
            await api.delete(`/api/admin/post/${postId}`)
            alert("삭제되었습니다.");
            getPosts(posts.filter(post => post.postId !== postId));
        } catch (error) {
            console.error("삭제 오류", error);
            alert("삭제 실패! 다시 시도해주세요.");
        }
    };

    console.log("🔍 API 응답 데이터:", adminPostList?.data?.data);

    return (
        <div css={s.container}>
            <h2 css={s.title}>게시글 관리</h2>
            <div css={s.tableWrapper}>
                <table css={s.table}>
                    <thead>
                        <tr css={s.tableRowHeader}>
                            <th css={s.tableHeader}>postId</th>
                            <th css={s.tableHeader}>제목</th>
                            <th css={s.tableHeader}>닉네임</th>
                            <th css={s.tableHeader}>게시판</th>
                            <th css={s.tableHeader}>업로드 날짜</th>
                            <th css={s.tableHeader}>댓글수</th>
                            <th css={s.tableHeader}>조회수</th>
                            <th css={s.tableHeader}>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminPostList?.data?.data?.postList?.map((post, index) => (
                            <tr key={`adminPost${index}`} css={s.tableRow}>
                                <td css={s.tableCell}>{post.postId}</td>
                                <td css={s.tableCell} className='titleName'>{post.title}</td>
                                <td css={s.tableCell} className='name'>{post.nickname}</td>
                                <td css={s.tableCell}>{post.boardName}</td>
                                <td css={s.tableCell}>{post.createdAt}</td>
                                <td css={s.tableCell}>{post.commentCount}</td>
                                <td css={s.tableCell}>{post.viewCount}</td>
                                <td css={s.tableCell}>
                                    <button css={s.deleteButton} onClick={() => deletePost(post.postId)}><FaRegTrashCan /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div css={s.footer}>
                           <div css={s.pageNumbers}>
                               <button disabled={adminPostList?.data?.data.firstPage} onClick={() => handlePageNumbersOnClick(page - 1)}><GoChevronLeft /></button>
                               {
                                   pageNumbers.map(number => 
                                       <button key={`adminPostPage${number}`} css={s.pageNum(page === number)} onClick={() => handlePageNumbersOnClick(number)}><span>{number}</span></button>
                                   )
                               }
                               <button disabled={adminPostList?.data?.data.lastPage} onClick={() => handlePageNumbersOnClick(page + 1)}><GoChevronRight /></button>
                           </div>
                       </div>
        </div>
    );
};


export default AdminPostSearchPage;
