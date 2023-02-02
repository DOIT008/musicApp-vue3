<template>
  <div class="player">
    <div class="song-info">
      <img
        v-if="currentPlayInfo"
        class="song-img"
        :src="currentPlayInfo.al.picUrl"
        alt=""
        @click="showBigAlbum"
      />
      <div class="about-song">
        <p class="song-name" v-if="currentPlayInfo">
          {{ currentPlayInfo.name }}
        </p>
        <p class="song-lyrics">可以赏花切换哦</p>
      </div>
    </div>
    <div class="play-ctrl">
      <i
        class="iconfont icon-bofang play-btn"
        v-if="!playStatus"
        @click="play"
      ></i>
      <i class="iconfont icon-zanting play-btn" v-else @click="pause"></i>
      <i class="iconfont icon-liebiao"></i>
    </div>
    <audio id="audio" :src="musicUrl"></audio>
  </div>

  <playMusic
    v-show="visible"
    @hideAlbum="hideBigAlbum"
    :currentPlayInfo="currentPlayInfo"
    :playState="{ playStatus, playList, playIndex }"
    :currentTime="currentTime"
    @play="play"
    @pause="pause"
  ></playMusic>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { ILyric } from "@/types/index";
import playMusic from "./playMusic.vue";
import { getLyrics } from "@/api/index";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    playMusic,
  },
  name: "player",
  setup(props) {
    const currentTime = ref<number>(0);
    const visible = ref<boolean>(false);
    const timer = ref(null);
    const store = useStore();
    const playStatus = computed(() => store.state.playStatus);
    const audio = ref(null);
    const playList = computed(() => store.state.playList);
    const playIndex = computed(() => store.state.currentPlayIndex);
    const currentPlayInfo = computed(() => playList.value[playIndex.value]);
    const musicUrl = computed(() => {
      return currentPlayInfo.value
        ? `https://music.163.com/song/media/outer/url?id=${currentPlayInfo.value.id}.mp3`
        : "";
    });
    // 监控数据发生变化
    watch(
      () => playIndex.value,
      (newVal, oldVal) => {
        // console.log(play);
        setTimeout(() => {
          pause();
          play();
        }, 1000);
      }
    );
    // 获取歌词
    async function queryLyrics(id: number) {
      let res: ILyric = await getLyrics(id);
      if (res.code === 200) {
        store.commit("setLyrics", res.lrc.lyric);
      }
    }
    // 隐藏播放页
    function hideBigAlbum() {
      visible.value = false;
    }
    // 点击打开播放页
    function showBigAlbum() {
      visible.value = true;
      queryLyrics(currentPlayInfo.value.id);
    }
    // 播放音乐
    function play() {
      console.log("播放啦");
      audio.value.play();
      store.commit("setPlayStatus", true);
      // 获取当前的播放时间
      timer.value = setInterval(() => {
        store.commit("setCurrentTime", audio.value.currentTime);
      }, 1000);
    }
    function pause() {
      audio.value.pause();
      store.commit("setPlayStatus", false);
      clearInterval(timer.value);
    }
    onMounted(() => {
      // 初始化拿到audio标签,并赋值
      audio.value = document.querySelector("#audio");
    });

    return {
      playList,
      currentPlayInfo,
      musicUrl,
      play,
      playStatus,
      pause,
      visible,
      showBigAlbum,
      hideBigAlbum,
      playIndex,
      currentTime,
    };
  },
});
</script>

<style scoped lang="scss">
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 10px 30px 100px #888888;
  .song-info {
    display: flex;
    font-size: 0.35rem;
    .song-img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: 0.3rem;
    }
    .about-song {
      text-align: left;
      .song-lyrics {
        font-size: 12px;
        color: #ccc;
      }
    }
  }
  .play-ctrl {
    .play-btn {
      margin-right: 0.6rem;
    }
    .iconfont {
      font-size: 0.6rem;
    }
  }
}
</style>
