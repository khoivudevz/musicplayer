import { createSlice } from "@reduxjs/toolkit";
import { musicData } from "../data/musicData/musicData";

const initialState = {
  currentIndex: 0,
  musicData,
  playing: false,
};

const musicSlice = createSlice({
  name: "Music Slice",
  initialState,
  reducers: {
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
  },
});
export const { setCurrentIndex, setPlaying } = musicSlice.actions;
export default musicSlice.reducer;
