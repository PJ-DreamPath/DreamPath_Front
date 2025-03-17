/** @jsxImportSource @emotion/react */
import * as s from './style';

export default function MentiMyPage() {
  return (
    <>
      

      <div css={s.pageContainer}>
        <section css={s.profileSection}>
          <h2>내 프로필</h2>
          <div css={s.profileContent}>
            <div css={s.profileImage}></div>
            <div css={s.nicknameBox}>
              <span>닉네임</span>
              <input type="text"/>
              <button>수정</button>
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
              <input type="text"/>
              <button>수정</button>
            </div>

            <div css={s.infoRow}>
              <span>비밀번호</span>
              <input type="password" placeholder="비밀번호를 설정해주세요." />
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
      </div>
    </>
  );
}
