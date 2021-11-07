export default (axios: any) => ({
  getProfile: async (token: string) => {
    axios.defaults.headers.common['X-Auth-Token'] = token;
    console.log(token);
    try {
      const {data} = await axios.get('/api/me');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
});
