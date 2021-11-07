import {atom} from 'recoil';

export const isLoginState = atom({
  key: 'login',
  default: false,
});

export const ProfileUrlState = atom({
  key: 'profileUrl',
  default: null,
});

export const postState = atom({
  key: 'posts',
  default: [],
});

export const commentState = atom({
  key: 'comments',
  default: [],
});
