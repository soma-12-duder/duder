export default (axios: any) => ({
  getProfile: async (token: string) => {
    axios.defaults.header['X-Auth-Token'] = token;
    try {
      const {data} = await axios.get('/member/profile');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
});
