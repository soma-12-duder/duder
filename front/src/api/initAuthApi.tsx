export default (axios: any) => ({
  getUserInfo: async (token?: string) => {
    // axios.defaults.headers.common['X-Auth-Token'] = token;
    try {
      const {data} = await axios.get('/api/me');
      return data;
    } catch (error) {
      console.log(error);
    }
  },
});
