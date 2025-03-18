/** @jsxImportSource @emotion/react */
import * as s from './style';

import { useUpdateProfileImageMutation } from '../../mutations/mypageMutation';
import { useUpdateEmailMutation, useUpdateNicknameMutation } from '../../mutations/mypageMutation';
import { useEffect, useState } from 'react';
import { useUserMeQuery } from '../../queries/userQuery';

export default function MyPage() {
  const loginUser = useUserMeQuery();
  const updateProfileImageMutation = useUpdateProfileImageMutation();
  const updateNicknameMutation = useUpdateNicknameMutation();
  const updateEmailMutation = useUpdateEmailMutation();

  const [ nicknameValue, setNicknameValue ] = useState("");
  const [ emailValue, setEmailValue ] = useState("");

  useEffect(() => {
    console.log(loginUser?.data?.nickname);
    setNicknameValue(loginUser?.data?.data.nickname || "");
  }, [loginUser.isFetched]);

  useEffect(() => {
    setEmailValue(loginUser?.data?.data.email || "");
  }, [loginUser.isFetched]);
  
  const handleProfileImageFileOnChange = async (e) => {
    const fileLiST = e.target.files;
    const file = fileLiST[0]

    const formData = new FormData();
    formData.append("file", file);

    await updateProfileImageMutation.mutateAsync(formData);
    loginUser.refetch();
  }

  const handleNicknameUpdateButtonOnClick = async () => {
    await updateNicknameMutation.mutateAsync(nicknameValue);



    loginUser.refetch();
  }

  const handleNicknameInputOnChange = (e) => {
    setNicknameValue(e.target.value);
  }
  
  const handleEmailupdateButtonOnClick = async () => {
    await updateEmailMutation.mutateAsync(emailValue);
  }

  const handleEmailInputOnChange = (e) => {
    setEmailValue(e.target.value);
  }

  return (
    <>
        
        <section css={s.profileSection}>
          <h2>내 프로필</h2>
          <div css={s.profileContent}>
            <div css={s.profileImage}>
               {
                  loginUser.isLoading || 
                  <img src={`http://localhost:8080/image/user/profile/${loginUser?.data?.data.profileIamge}`} alt="" />
               }
              <input type="file" onChange={handleProfileImageFileOnChange} />
               
            </div>
            <div css={s.nicknameBox}>
              <span>닉네임</span>
              <div>
                <input type="text" value={nicknameValue} onChange={handleNicknameInputOnChange}/>
              </div>
              <button onClick={handleNicknameUpdateButtonOnClick} disabled={loginUser?.data?.data.nickname === nicknameValue}>수정</button>
            </div>
          </div>
        </section>

        <section css={s.infoSection}>
          <div css={s.infoHeader}>
            <h2>기본 정보</h2>
            <button css={s.deleteBtn}>회원탈퇴</button>
          </div>

          <div css={s.infoContent}>
            <div css={s.infoRow}>
              <span>이메일</span>
              <input type="text" value={emailValue} onChange={handleEmailInputOnChange}/>
              <button onClick={handleEmailupdateButtonOnClick}>수정</button>
            </div>

            <div css={s.infoRow}>
              <span>비밀번호</span>
              <input type="password" placeholder="비밀번호를 설정해주세요." 
              name="password"
              />
              <button>설정</button>
            </div>

            <div css={s.infoRow}>
              <span>휴대폰 번호</span>
              <input type="tel" />
              <button>인증하기</button>
              <button>수정</button>
            </div>
          </div>
        </section>
   
    </>
  );
}
