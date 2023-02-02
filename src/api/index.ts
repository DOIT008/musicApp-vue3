import request from "@/common/request";
// 获取【发现】头部的banner数据
export function getBanner(type: number) {
  return request({
    url: "/api/banner",
    method: "get",
    data: {
      type,
    },
  });
}
// 获取【发现】模块的"发现好歌单"数据
export function getMusicListData(limit: number) {
  return request({
    url: "/api/personalized",
    method: "get",
    data: {
      limit,
    },
  });
}

// 获取【发现】模块的"发现好歌单"歌单详情
export function getMusicDetail(id: number) {
  return request({
    url: "/api/playlist/detail",
    method: "get",
    data: {
      id,
    },
  });
}

// 获取歌词
export function getLyrics(id: number) {
  return request({
    url: "/api/lyric",
    method: "get",
    data: {
      id,
    },
  });
}
