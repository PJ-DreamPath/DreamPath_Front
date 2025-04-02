import { atom } from 'recoil';

export const sideMenuBoxMentoringState = atom({
    key: 'sideMenuBoxMentoringState',
    default: {
        order: 'desc',
        status: '',
        category: '',
        searchTxt: '',
    },
});
