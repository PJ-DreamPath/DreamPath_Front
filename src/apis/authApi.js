import { api } from "../configs/axiosConfig"

export const signupApi = async (signupInfo) => {

    return await api.post("/api/auth/signup", signupInfo);
}

export const loginApi = async (loginInfo) => {
    try {
        const response = await api.post("/api/auth/login", loginInfo);
        console.log("✅ 로그인 응답 데이터:", response.data); // 응답 확인
        return response;
    } catch (error) {
        console.error("❌ 로그인 에러:", error.response?.data || error.message); // 에러 메시지 확인
        throw error;
    }
};
