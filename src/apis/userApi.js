import { api } from '../configs/axiosConfig';

export const getUserMeApi = async () => await api.get('/api/user/me');

export const getMyMentoringApi = async (params) => {
    return await api.get(`/api/user/me/mentoring`, { params });
};

export const getMentoringApplyHistoryApi = async (params) => {
    return await api.get(`/api/mentoring/me/applyList`, {params});
};

export const updateProfileImgApi = async (formData) => {
    return await api.post('/api/user/profile/img', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
export const updateNicknameApi = async (nickname) =>
    await api.put('/api/user/profile/nickname', { nickname });
export const updatePasswordApi = async (password) =>
    await api.put('/api/user/profile/password', { password });
export const updateEmailApi = async (email) =>
    await api.put('/api/user/profile/email', { email });
export const deleteUserApi = async (user) =>
    await api.delete('api/user', { user });


export const sendUserAuthPhoneApi = async (params) => {
    
    return await api.post('/api/send-one', params);
}

export const updatePhoneNumberApi = async (params) => {
    return await api.put('/api/user/me/phoneNumber', params);
}

