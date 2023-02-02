import { state } from "@/store/state";
const mutations = {
  // 重置当前播放的列表
  setPlayList(state, newList) {
    state.playList = newList;
  },
  setPlayIndex(state, index) {
    state.currentPlayIndex = index;
  },
  setPlayStatus(state, status) {
    state.playStatus = status;
  },
  setLyrics(state, lyrics) {
    state.lyrics = lyrics;
  },
  // 设置当前的播放时间
  setCurrentTime(state, currentTime) {
    state.currentTime = currentTime;
  },
};
export default mutations;
