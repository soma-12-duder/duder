import {atom} from 'recoil';

export const isLoginState = atom({
  key: 'login',
  default: false,
});

export const memberInfoState = atom({
  key: 'member',
  default: {
    id: 2,
    nickname: '승패',
    email: '',
    profile:
      'https://soma12-s3.s3.ap-northeast-2.amazonaws.com/profile/testbeen.png',
  },
});

export const postsState = atom({
  key: 'posts',
  default: [],
});

export const hotPostsState = atom({
  key: 'hotPosts',
  default: [],
});

export const myPostsState = atom({
  key: 'myPosts',
  default: [],
});

export const myFavoritePostsState = atom({
  key: 'myFavoritePosts',
  default: [],
});

export const postState = atom({
  key: 'post',
  default: {
    id: undefined,
    latitude: undefined,
    longtitude: undefined,
    content: undefined,
    view: undefined,
    favorite_state: false,
    member: {id: null, nickname: null, email: null, profile: null},
    comments: [],
    favorite_count: 0,
    comment_count: 0,
  },
});

export const commentState = atom({
  key: 'comment',
  default: {isClickCommentInput: false, comment_id: null},
});

export const isRefreshingState = atom({
  key: 'isRefreshing',
  default: false,
});

export const isProfileRefreshingState = atom({
  key: 'isProfileRefreshing',
  default: false,
});
