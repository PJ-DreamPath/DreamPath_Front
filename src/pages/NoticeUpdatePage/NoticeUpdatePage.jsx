import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Quill from 'quill';

import "quill/dist/quill.snow.css";
import Swal from 'sweetalert2';
import { useNoticeUpdateMutation } from '../../mutations/postMutation';

function NoticeUpdatePage(props) {
    const noticeUpdateMutation = useNoticeUpdateMutation();

    const [quill, setQuill] = useState(null);
    const [title, setTitle ] = useState("");
    const [quillContent, setQuillContent] = useState("");


    const containerRef = useRef();

    useEffect(() => {
        const toolbarOptions = [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }, 'bold', 'italic', 'underline', 'strike'], 
            [{ 'color': [] }, { 'background': [] }],   
            [{ 'align': [] }],         
            ['link', 'image', 'video', 'formula'],
        ];

        const quill = new Quill(containerRef.current, {
            modules: {
                toolbar: toolbarOptions,
            },
            theme: "snow",
            placeholder:"Write, ENter your content..."
        });

        setQuill(quill);

        quill.on('text-change', () => {
            setQuillContent(quill.root.innerHTML)
        });
    }, [])

    const handleTitleOnChange = (e) => {
        setTitle(e.target.value);
    }

    const handleSaveOnClick = async () =>{
        if(!title){
            await Swal.fire({
                titleText: "제목을 입력하세요.",
                confirmButtonText: "확인",
            });
            return ;
        }
        if(!quill.root.innerText.trim()){
            await Swal.fire({
                titleText: "게시판 내용을 입력하세요.",
                confirmButtonText: "확인",
            });
            return ;
        }

        const notice = {
            title,
            content: quillContent,
        }
        const { postId } = useParams();

        const response = await noticeUpdateMutation.mutateAsync({ postId, ...notice });
        await Swal.fire({
            titleText: "게시글 작성완료",
            confirmButtonText: "확인",
        })
    }


    return (
        <div css={s.quillEditor}>
                <div css={s.quillTop}>
                    <input type="text"  placeholder='Enter notice title...' 
                    value={title} onChange={handleTitleOnChange}/>   
                    <button css={s.saveButton} onClick={handleSaveOnClick}>Save</button>
                </div>
            <div ref={containerRef}>

            </div>
        </div>
    );
}

export default NoticeUpdatePage;