import { css } from '@emotion/react';

export const global = css`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');

    * {
        color: #333;
    }

    html,
    body,
    #root {
        margin: 0;
        padding: 0;

        height: 100vh;
        overflow-y: auto;

        font-family: 'Noto Sans KR', serif;
        font-size: 62.5%; /** 1rem을 10Ppx로 변환 */
        font-weight: 400;
    }

    #root {
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #fafafa;
    }

    .MuiPickersCalendarHeader-labelContainer,
    .MuiPickersYear-yearButton,
    .MuiDayCalendar-root button,
    .MuiDayCalendar-root span {
        font-size: 1.5rem !important;
    }

    .MuiOutlinedInput-notchedOutline {
        border-color: #aaa !important;
    }
`;
