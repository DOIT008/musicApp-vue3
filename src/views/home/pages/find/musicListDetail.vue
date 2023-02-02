<template>
  <div class="musicListDetail">
    <div class="top-container">
      <div class="back-con" :style="topContainerStyle"></div>
      <div class="top-wrapper">
        <span class="top-left">
          <i class="iconfont icon-zuojiantou" @click="goBack"></i>
          歌单
        </span>
        <span class="top-right">
          <i class="iconfont icon-sousuo"></i>
          <i class="iconfont icon-gengduo-shuxiang"></i>
        </span>
      </div>
      <div class="middle-wrapper">
        <div class="back-wrapper">
          <img class="back-img" :src="playList.coverImgUrl" alt="" />
          <span class="back-icon-wrapper">
            {{ formatPlayCount(playList.playCount) }}</span
          >
        </div>
        <div class="desc-wrapper">
          <h4 class="title">{{ playList.name }}</h4>
          <div class="creator-info">
            <img
              v-if="playList.creator"
              class="avatar"
              :src="playList.creator.avatarUrl"
              alt=""
            />
            <span v-if="playList.creator" class="creator-name">{{
              playList.creator.nickname
            }}</span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
          <div class="sub-desc">
            <span>
              {{ playList.description }}
            </span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
      </div>
      <div class="func-wrapper">
        <!-- 讨论 -->
        <div class="func-item">
          <i class="iconfont icon-taolun"></i><br />
          <span>{{ playList.commentCount }}</span>
        </div>
        <!-- 分享 -->
        <div class="func-item">
          <i class="iconfont icon-fenxiang"></i><br />
          <span>{{ playList.shareCount }}</span>
        </div>
        <!-- 下载 -->
        <div class="func-item">
          <i class="iconfont icon-yunduanxiazai"></i><br />
          <span>下载</span>
        </div>
        <!-- 多选 -->
        <div class="func-item">
          <i class="iconfont icon-duoxuan"></i><br />
          <span>多选</span>
        </div>
      </div>
    </div>
    <div class="list-wrapper">
      <div class="list-top">
        <span class="play-all">
          <i class="iconfont icon-bofang"></i>
          <span>播放全部</span>
          <label for="" v-if="playList.tracks"
            >(共{{ playList.tracks.length }}首)</label
          >
        </span>
        <span class="collect">
          <i class="iconfont icon-jiahao1"></i> 收藏({{
            formatPlayCount(playList.subscribedCount)
          }})
        </span>
      </div>
      <div class="song-list-container">
        <ul class="song-list">
          <li
            class="song-item"
            @click="playThis(index)"
            v-for="(song, index) in tracks"
            :key="index"
          >
            <div class="song-info">
              <span class="order">{{ index + 1 }}</span>
              <div class="song-main-info">
                <div class="song-name">{{ song.name }}</div>
                <div class="other-info">
                  <span
                    class="song-tag"
                    v-for="(tag, _index) in playList.tags"
                    :key="_index"
                    >{{ tag }}</span
                  >
                  {{ song.al.name }}
                </div>
              </div>
            </div>
            <span class="ctrl-container">
              <i
                class="iconfont icon-bofang"
                v-if="listPlayedIndex !== index"
              ></i>
              <i class="iconfont icon-zanting" v-else></i>
              <i class="iconfont icon-gengduo-shuxiang"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRaw, toRefs, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMusicDetail } from "@/api/index";
import { useStore } from "vuex";
export default defineComponent({
  name: "musicListDetail",
  setup() {
    const listPlayedIndex = ref<number>(-1);
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    // 数据
    const reactiveData = reactive({
      playList: {},
      privileges: [],
      topContainerStyle: {
        "background-image": "",
        filter: "blur(40px)",
      },
      tracks: [],
    });
    // 播放选中的歌曲
    function playThis(index: number) {
      listPlayedIndex.value = index;
      store.commit("setPlayIndex", index);
    }
    // 获取歌单详情
    async function queryDetail(id: number) {
      let res: any = await getMusicDetail(id);
      console.log(res);
      if (res.code === 200) {
        reactiveData.playList = res.playlist;
        reactiveData.privileges = res.privileges;
        reactiveData.topContainerStyle = {
          "background-image": `url(${reactiveData.playList.coverImgUrl})`,
          filter: "blur(40px)",
        };
        reactiveData.tracks = res.playlist.tracks;
        console.log(reactiveData);
        // 修改播放区的播放列表
        store.commit("setPlayList", reactiveData.tracks);
        // 获取列表后播放状态改为false
        store.commit("setPlayStatus", false);
      }
    }
    // 返回上一页
    function goBack() {
      router.back();
    }
    // 格式化播放量
    function formatPlayCount(count: number) {
      if (count < 10000) {
        return count;
      } else if (count > 10000 && count < 100000000) {
        return `${(count / 10000).toFixed(0)}万`;
      } else {
        return `${(count / 100000000).toFixed(2)}亿`;
      }
    }
    // 挂载钩子
    onMounted(() => {
      let id = toRaw(route).query.value.id;
      queryDetail(id);
    });
    return {
      ...toRefs(reactiveData),
      formatPlayCount,
      goBack,
      playThis,
      listPlayedIndex,
    };
  },
});
</script>

<style scoped lang="scss">
.musicListDetail {
  .top-container {
    position: relative;
    width: 100%;
    .top-background {
      width: 100px;
      height: 100px;
    }
    .top-wrapper {
      color: #fff;
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: 0.4rem;
      padding: 0.3rem;
      .top-right {
        .icon-sousuo {
          margin-right: 0.4rem;
        }
      }
    }
    .middle-wrapper {
      display: flex;
      justify-content: space-between;
      padding: 0.3rem;
      .back-wrapper {
        position: relative;
        .back-img {
          width: 100px;
          height: 100px;
          border-radius: 5px;
        }
        .back-icon-wrapper {
          position: absolute;
          right: 5px;
          color: #fff;
          font-size: 12px;
          top: 5px;
        }
      }
      .desc-wrapper {
        color: #fff;
        display: flex;
        flex-wrap: wrap;
        margin: 0 0.24rem;
        .title {
          font-size: 0.4rem;
          text-align: left;
        }
        .creator-info {
          display: flex;
          align-items: center;
          padding: 0.1rem;
          .avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
          }
          .creator-name {
            font-size: 13px;
            margin-left: 0.15rem;
          }
          .iconfont {
            font-size: 0.3rem;
            margin-left: 0.2rem;
          }
        }
        .sub-desc {
          font-size: 12px;
          display: flex;
          align-items: center;
          span {
            text-align: left;
            display: inline-block;
            width: 90%;
            height: 30px;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .iconfont {
            font-size: 0.3rem;
          }
        }
      }
    }
    .func-wrapper {
      display: flex;
      justify-content: space-around;
      font-size: 12px;
      color: #fff;
      padding: 0.3rem 0;
      padding-bottom: 0.5rem;
      .func-item {
        .iconfont {
          font-size: 0.5rem;
        }
        span {
          font-size: 12px;
          color: #eee;
        }
      }
    }
  }
  .back-con {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .list-wrapper {
    margin-top: -0.3rem;
    border-radius: 0.3rem;
    background: #fff;
    position: relative;
    padding: 0.3rem;
    .list-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .play-all {
        font-size: 12px;
        .icon-bofang {
          margin-right: 0.3rem;
        }
        label {
          color: #ccc;
          font-size: 10px;
        }
      }
      .collect {
        font-size: 12px;
        padding: 0.1rem 0.2rem;
        background: #fe393c;
        border-radius: 0.5rem;
        color: #fff;
      }
    }
    .song-list-container {
      margin-top: 0.4rem;
      height: 9rem;
      overflow: auto;
      .song-list {
        font-size: 0.4rem;
        .song-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.3rem 0;
          .song-info {
            display: flex;
            align-items: center;
            .order {
              display: inline-block;
              width: 30px;
              height: 30px;
              line-height: 30px;
            }
            .song-main-info {
              font-weight: 700;
              text-align: left;
              font-size: 0.4rem;
              .song-name {
              }
              .other-info {
                font-size: 10px;
                font-weight: 500;
                margin-top: 5px;
                .song-tag {
                  color: #fe393c;
                  border: 1px solid #fe393c;
                  margin: 0 2px;
                  border-radius: 2px;
                }
              }
            }
          }
          .ctrl-container {
            color: #ccc;
            .icon-bofang,
            .icon-zanting {
              margin-right: 0.3rem;
            }
          }
        }
      }
    }
  }
}
</style>
