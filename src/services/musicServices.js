import axios from "axios";

export const musicServices = {
  getMusicList() {
    return axios({
      url: "http://localhost:3000/musicList",
      method: "GET",
    });
  },
};
