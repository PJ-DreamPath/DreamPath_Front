import { api } from "../configs/axiosConfig"

export const signupApi = async (signupInfo) => {

    return await api.post("/api/auth/signup", signupInfo);
}

export const loginApi = async (loginInfo) => {
    return await api.post("/", loginInfo);
}