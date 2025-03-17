/**@jsxImportSource @emotion/react */
import * as s from './style';
import { TiAttachmentOutline } from "react-icons/ti";
import React from 'react';

function MainUserBox(props) {

    // roleId 1 : 멘티, roleId 2 : 멘토
    // const roleId = 2;
    const roleId = 1;

    return (
        <div css={s.body}>
            <div css={s.mainUserBox}>
                <div css={s.profileImg}>
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALwAyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgMFBAEH/8QAKhABAAIBAgIKAwEBAAAAAAAAAAECAwQRIXEUIjEzQUJRcoGRMlJhsRP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2ImZ2hbXS5beXbmCkdPQsvrX7QtpctfLvyBSPZiYnaXgAAAAAAAAAAAAAAAAAAC3BgtmnhwrHbKOHHOXJFY+WpSsUrFaxtEAjixUxR1Y+fFMAAAQy4qZY60fPiz8+C2GePGs9ktN5esXrNbRvEgyBPNjnFkms/CAAAAAAAAAAAAAAAAAO/Q02xzfxs6VenjbBTksAAAAAABza6m+OL+NXA1NRG+C/JlgAAAAAAAAAAAAAAAA1NPO+CnJY5tDffHNPGrpAAAAAABXqJ2wX5Mt366+2OKeNnAAAAAAAAAAAAAAAAACeHJOLJFo+WpS0XrFqzvEshbgz2wzw41ntgGmIYstMsdWfjxTAAAeXtFKza07RCOXLTFHWn48Wfnz2zTx4VjsgEc2ScuSbT8IAAAAAAAAAAAAAAAAAAJVpa/41meULa6XNPliOcgpiZid4W11OWvm35p9Cyetfs6Fk/an3IHTcvpX6QtqctvNtyT6Fk/an3J0LJ+1PuQc8zMzvLx09CyetftG2lzR5YnlIKBK1LU/KsxzhEAAAAAAAAAAAAAHTptNOTrX4U/0FWLDfLPVjh6y7cWkx04260/1dWIrEREbRD0CIiI2gAAAAAAACYiY2lRl0mO/GvVn+LwGXlw3xT1o4esK2vaItExMbxLh1OmnH1qcaf4DmAAAAAAAAB7WJtaIjtkF2lw/9bbz+Mdv9aMcI2hHFSMdIrHgkAAAAAAAAAAAAATxjaQBnarD/AMrbx+M9n8UNbLSMlJrPiyrRNbTE9sA8AAAAAAdWhpvkm89lYcrR0VdsET6zuC8AAAAAAAAAAAAAAABw66m2SLx2Wh3KNbXfBM+k7gzgAAAAAGpp42wU5Mtq4e5x+2ATAAAAAAAAAAAAAAAAV6iN8F+SxDN3N/bIMoAAAAABq4e5x+2GU1cPc4/bAJgAAAAAAAAAAAAAAAIZu5v7ZTQzdzf2yDKAAAB//9k=" />
                    <div>
                        <p>닉네임</p>
                        <p>2000.01.01 가입</p>
                    </div>
                </div>
                    {roleId === 2 ? ( 
                        <>
                            <div>
                                <div css={s.starPoint}>
                                    <p>멘토</p>
                                    <p>⭐️⭐️⭐️⭐️⭐️</p>
                                </div>
                                <div css={s.mentoringButton}>
                                    <button><TiAttachmentOutline /> 내가 등록한 멘토링 <span>3</span></button>
                                    <button><TiAttachmentOutline /> 등록 가능한 멘토링 개수 <span>17</span></button>
                                </div>
                                <div css={s.footerButton}>
                                    <button>마이페이지</button>
                                    <button>멘토링 등록</button>
                                </div>
                            </div>
                        </>
                        ) 
                        :
                        (
                            <>
                                <div css={s.mentiBox}>
                                    <p>멘티</p>
                                    <button css={s.mentiMentoringButton}><TiAttachmentOutline /> 멘토링 신청 내역 <span>3</span></button>
                                    <button css={s.myPageButton}>마이페이지</button>
                                </div>
                            </>
                        )}
                <button css={s.logoutButton}>로그아웃</button>
            </div>
        </div>
    );
}

export default MainUserBox;