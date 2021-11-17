import {atom} from 'recoil';

export const isLoginState = atom({
  key: 'login',
  default: false,
});

export const memberInfoState = atom({
  key: 'member',
  default: {
    id: 1,
    nickname: '지노',
    email: '',
    profile: '',
  },
});

export const postState = atom({
  key: 'posts',
  default: [],
});

export const commentState = atom({
  key: 'comments',
  default: [],
});
