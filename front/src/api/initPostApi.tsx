export default (axios: any) => ({
  getAllPosts: async (
    latitude: number,
    longitude: number,
    distance: string,
  ) => {
    try {
      const {data} = await axios.get('/api/post/get', {
        params: {latitude: latitude, longitude: longitude, distance: distance},
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  getAllHotPosts: async (
    latitude: number,
    longitude: number,
    distance: string,
  ) => {
    try {
      const {data} = await axios.get('/api/post/get/hot', {
        params: {latitude: latitude, longitude: longitude, distance: distance},
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  getPostById: async (id: any) => {
    try {
      const {data} = await axios.get(`/api/post/${id}`);
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  postPostFavorite: async (id: any) => {
    try {
      const {data} = await axios.post(`/api/favorite`, {
        post_id: id,
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  deletePostFavorite: async (id: any) => {
    try {
      const {data} = await axios.delete(`/api/favorite`, {
        data: {
          post_id: id,
        },
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  postComment: async (id: any, content: any) => {
    try {
      const {data} = await axios.post(`/api/comment`, {
        post_id: id,
        content: content,
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  postCommentOfComment: async (id: any, content: any, comment_id: any) => {
    try {
      const {data} = await axios.post(`/api/comment/${comment_id}`, {
        post_id: id,
        content: content,
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  enrollPost: async (
    latitude: any,
    longitude: any,
    photo_urls: any,
    title: any,
    content: any,
  ) => {
    try {
      const {data} = await axios.post(`/api/post/enroll`, {
        latitude: latitude,
        longitude: longitude,
        photo_urls: photo_urls,
        title: title,
        content: content,
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  },
});
