/** @jsxImportSource @emotion/react */
import * as s from './style';

import { userDeleteUserMutation, useUpdatePasswordMutation, useUpdateProfileImageMutation } from '../../mutations/mypageMutation';
import { useUpdateEmailMutation, useUpdateNicknameMutation } from '../../mutations/mypageMutation';
import { useEffect, useState } from 'react';
import { useUserMeQuery } from '../../queries/userQuery';
import { useNavigate } from 'react-router-dom';

 function MyPage(props) {
  const navigate = useNavigate();
  const loginUser = useUserMeQuery();
  const updateProfileImageMutation = useUpdateProfileImageMutation();
  const updateNicknameMutation = useUpdateNicknameMutation();
  const updateEmailMutation = useUpdateEmailMutation();
  const updatePasswordMutation = useUpdatePasswordMutation();
  const deleteUserMutation = userDeleteUserMutation();

  const [ nicknameValue, setNicknameValue ] = useState("");
  const [ emailValue, setEmailValue ] = useState("");
  const [ passwordValue, setPasswordValue ] = useState("");
  const [ userValue, setUserValue ] =useState("");

  

  useEffect(() => {
    console.log(loginUser);
    setNicknameValue(loginUser?.data?.data.nickname || "");
  }, [loginUser.isFetched]);
  
  const handleProfileImageFileOnChange = async (e) => {
    console.log({element:e.target});
    const fileLiST = e.target.files;
    const file = fileLiST[0]

    const formData = new FormData();
    formData.append("file", file);

    await updateProfileImageMutation.mutateAsync(formData);
    loginUser.refetch();
  }

  const handleNicknameInputOnChange = (e) => {
    setNicknameValue(e.target.value);
  }

  const handleNicknameUpdateButtonOnClick = async () => {
    await updateNicknameMutation.mutateAsync(nicknameValue);

    loginUser.refetch();
  };

  const handleEmailInputOnChange = (e) => {

    setEmailValue(e.target.value);

  };
  
  const handleEmailUpdateButtonOnClick = async () => {

      await updateEmailMutation.mutateAsync(emailValue);

      loginUser.refetch();
     
};


const handlePasswordInputOnChange = (e) => {

  setPasswordValue(e.target.value);
}

  const handlePasswordUpdateButtonOnClick = async () => {
    await updatePasswordMutation.mutateAsync(passwordValue);

    loginUser.refetch();
  };

 
  const handleUserDeleteButtonOnClick = async () => {
  
    await deleteUserMutation.mutateAsync(userValue);    

    localStorage.removeItem("AccessToken");
    window.location.reload();
    navigate("/")
 
  };



  return (
    <>
        
        <section css={s.profileSection}>
          <h2>내 프로필</h2>
          <div css={s.profileContent}>
            <label css={s.profileImage}>
               {
                  loginUser.isLoading || 
                  <img src={`http://localhost:8080/image/user/profile/${loginUser?.data?.data.profileImg}`} alt="" />
               }
              <input type="file" onChange={handleProfileImageFileOnChange} />
               
            </label>
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
            <button onClick={handleUserDeleteButtonOnClick} css={s.deleteBtn}>회원탈퇴</button>
          </div>

          <div css={s.infoContent}>
            <div css={s.infoRow}>
              <span>이메일</span>
              <input type="email" value={emailValue} onChange={handleEmailInputOnChange}/>
              <button onClick={handleEmailUpdateButtonOnClick} disabled={loginUser?.data?.data.email === emailValue}>수정</button>
            </div>

            

            <div css={s.infoRow}>
              <span>비밀번호</span>
              <input type="password" value={passwordValue} onChange={handlePasswordInputOnChange} placeholder="비밀번호를 설정해주세요." 
              name="password"
              />
              <button onClick={handlePasswordUpdateButtonOnClick} disabled={loginUser?.data?.data.password === passwordValue}>설정</button>
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


export default MyPage;