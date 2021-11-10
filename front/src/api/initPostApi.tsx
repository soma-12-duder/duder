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
      console.log(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  getPostById: async (id: any) => {
    try {
      console.log('id3:', id);
      const {data} = await axios.get(`/api/post/${id}`);
      console.log('date3:', data);
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
        post_id: id,
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
});
