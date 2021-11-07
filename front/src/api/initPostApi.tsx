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
    } catch (error) {
      console.log(error);
    }
  },

  getPostById: async (id: any) => {
    try {
      console.log('id3:', id);
      const {data} = await axios.get(`/api/post/${id}`);
      console.log('date3:', data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  postPostFavorite: async (id: any) => {
    try {
      const {data} = await axios.post(`/api/favorite`, {
        post_id: id,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
});
