function state() {
  return {
    playList: [], // 当前歌单
    currentPlayIndex: 0, // 当前播放的是第几首歌，默认第一首
    playStatus: false, //当前的播放状态，是否播放
    lyrics: "",
    currentTime: 0,
  };
}
export default state;
