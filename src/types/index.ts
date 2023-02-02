// interface
interface Al {
  picUrl: string;
}
interface Value {
  id: number;
}
type Lrc = {
  lyric: string;
};
export interface ICurrentPlayInfo {
  al: Al;
  name: string;
  value: Value;
  id: number;
}

export interface IPlayState {
  playStatus: boolean;
  playList: Object[];
  playIndex: number;
}

export interface ILyric {
  code: number;
  lrc: Lrc;
}

export interface SearchReactiveData {
  count: number;
  searchText: string;
  historyList: string[];
}
