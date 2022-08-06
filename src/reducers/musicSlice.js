import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { musicServices } from "../services/musicServices";

const initialState = {
  musicList: [],
};

const musicSlice = createSlice({
  name: "Music Slice",
  initialState,
  reducers: {
    // ccc: (state, action) => {
    //   state.zzz = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMusicList.fulfilled, (state, action) => {
        state.musicList = action.payload;
      })
      .addCase(getMusicList.rejected, (state, action) => {
        console.log("err");
      });
  },
});
// export const { ccc } = musicSlice.actions;

export const getMusicList = createAsyncThunk("getMusicList", async () => {
  const response = await musicServices.getMusicList();
  return response.data;
});

export default musicSlice.reducer;
