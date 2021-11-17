export default (axios: any) => ({
  findAllChatrooms: async () => {
    try {
      const {data} = await axios.get('/api/chatroom/all');
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  findAllChatMessage: async (room_id: any) => {
    try {
      const {data} = await axios.get(`/chat/room/${room_id}/all`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  findLastChatMessage: async (room_id: any) => {
    try {
      const {data} = await axios.get(`/chat/room/${room_id}/last`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  chatWithOpponent: async (opponent_id: any) => {
    try {
      const {data} = await axios.post(`/api/chatroom`, {
        opponent_id,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
});
