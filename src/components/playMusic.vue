<template>
  <div class="playMusic">
    <div class="music-player">
      <div class="playTop">
        <i class="iconfont icon-zuojiantou" @click="$emit('hideAlbum')"></i>
        <div class="songInfo">
          <h4 class="song-name">{{ currentPlayInfo.value }}</h4>
          <p class="singer">
            {{ currentPlayInfo.name }}
            <i class="iconfont icon-youjiantou"></i>
          </p>
        </div>
        <i class="iconfont icon-fenxiang"></i>
      </div>
      <div class="playContent" v-if="!showLyrics" @click="changeMode">
        <!-- off -->
        <img
          class="needle"
          :class="{
            off: !playState.playStatus,
          }"
          src="../assets/needle-ab.png"
          alt=""
          srcset=""
        />
        <div class="gap"></div>
        <div class="album" :class="{ animate: playState.playStatus }">
          <img class="album-avatar" :src="currentPlayInfo.al.picUrl" alt="" />
        </div>
      </div>
      <div class="playLyrics" v-else id="playLyrics" @click="changeMode">
        <div
          class="lyric-line"
          :class="{ active: index === currentIndex - 1 }"
          v-for="(ly, index) in lyric"
          :key="index"
        >
          {{ ly.content }}
        </div>
      </div>
      <div class="funcs-container">
        <i class="iconfont icon-shoucang"></i>
        <i class="iconfont icon-yunduanxiazai"></i>
      </div>
      <div class="playProgress">
        <div class="line">
          <div class="dot"></div>
        </div>
      </div>
      <div class="playFooter">
        <i class="iconfont icon-xunhuan"></i>
        <i class="iconfont icon-shangyishoushangyige" @click="playPre"></i>
        <i
          class="iconfont"
          :class="{
            'icon-zanting': playState.playStatus,
            'icon-bofang': !playState.playStatus,
            'play-status': true,
          }"
          @click="playMusic"
        ></i>
        <i class="iconfont icon-xiayigexiayishou" @click="playNext"></i>
        <i class="iconfont icon-liebiao"></i>
      </div>
    </div>
    <div
      class="playBack"
      :style="{ background: `url(${currentPlayInfo.al.picUrl})` }"
    ></div>
  </div>
</template>

<script lang="ts">
import { ICurrentPlayInfo, IPlayState } from "@/types/index";
import { ESTALE } from "constants";
import {
  defineComponent,
  onUpdated,
  PropType,
  ref,
  computed,
  watch,
  reactive,
  toRefs,
  nextTick,
} from "vue";
import { useStore } from "vuex";
interface IReactiveData {
  currentIndex: number;
}
export default defineComponent({
  props: {
    currentPlayInfo: {
      type: Object as PropType<ICurrentPlayInfo>,
      required: true,
      default: () => {
        return {
          al: {
            picUrl: "",
          },
          value: {
            id: 123,
          },
          name: "",
          id: 0,
        };
      },
    },
    playState: {
      type: Object as PropType<IPlayState>,
      required: true,
      default: () => {
        return {
          playStatus: false,
          playList: [],
          playIndex: 0,
        };
      },
    },
    currentTime: {
      type: Number,
      required: true,
    },
  },
  name: "playMusic",
  emits: ["hideAlbum", "play", "pause"],
  setup(props, context) {
    const reactiveData = reactive<IReactiveData>({
      currentIndex: -1,
    });
    const playLyricsNode = ref(null);
    const store = useStore();
    const lyricSource = computed(() => store.state.lyrics);
    const currentTime = computed(() => store.state.currentTime);
    const lyric = computed(() => {
      return lyricSource.value.split("\n").map((item) => {
        let _index = item.indexOf("]");
        let timeStr = item.slice(1, _index);
        let min = Number(timeStr.slice(0, 2));
        let second = Number(timeStr.slice(3, 5));
        let mill = Number(timeStr.slice(6));
        return {
          time: min * 60 * 1000 + second * 1000 + mill,
          content: item.slice(_index + 1),
        };
      });
    });
    // 改变播放模式
    function changeMode() {
      showLyrics.value = !showLyrics.value;
      if (showLyrics.value) {
        // dom更新需要一定的时间，所以不能立即获取时间
        nextTick(() => {
          playLyricsNode.value = document.querySelector("#playLyrics");
          console.log([playLyricsNode.value]);
        });
      }
    }
    // 隐藏唱片
    function hideAlbum() {
      context.emit("hideAlbum");
    }
    // 播放，暂停音乐
    function playMusic() {
      if (props.playState.playStatus) {
        context.emit("pause");
      } else {
        context.emit("play");
      }
    }
    // 播放上一首
    function playPre() {
      // i--,是先用后--，--i是先--后用
      let _index = props.playState.playIndex;
      if (_index >= 1) {
        store.commit("setPlayIndex", --props.playState.playIndex);
      } else {
        alert("已经是第一首了呢~");
      }
    }
    // 播放下一首
    function playNext() {
      // 同上
      let _index = props.playState.playIndex;
      if (_index < props.playState.playList.length - 1) {
        store.commit("setPlayIndex", ++props.playState.playIndex);
      } else {
        alert("已经是最后一首了呢~");
      }
    }
    // 监控当前的音乐的播放时间，决定哪一行歌词处于激活状态
    watch(
      () => currentTime.value,
      (newVal, oldVal) => {
        // 找到第一个歌词播放时间比当前真正的时间大的哪一个
        reactiveData.currentIndex = lyric.value.findIndex(
          (item) => item.time > newVal * 1000
        );
        let activeNode = document.querySelector(".lyric-line.active");
        if (activeNode) {
          let offsetTop = activeNode.offsetTop;
          playLyricsNode.value.scrollTop = offsetTop - 50;
        }
      },
      {
        immediate: true,
      }
    );
    const showLyrics = ref<boolean>(false);
    return {
      hideAlbum,
      playMusic,
      showLyrics,
      lyric,
      changeMode,
      ...toRefs(reactiveData),
      playPre,
      playNext,
    };
  },
});
</script>

<style scoped lang="scss">
@keyframes rotateAnimate {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
.playMusic {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  .music-player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    .playTop {
      padding: 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .iconfont {
        font-size: 0.5rem;
      }
      .songInfo {
        text-align: left;
        color: #333;
        width: 80%;
        .song-name {
          font-size: 0.4rem;
        }
        .singer {
          font-size: 12px;
          .icon-youjiantou {
            font-size: 0.2rem;
          }
        }
      }
    }
    .playContent {
      position: relative;
      margin: 0;
      .needle {
        position: absolute;
        width: 2.4rem;
        left: 4.8rem;
        z-index: 2;
        transform: rotate(10deg);
        transform-origin: top left;
        &.off {
          transform: rotate(-34deg);
          transform-origin: top left;
        }
      }
      .album {
        width: 6rem;
        height: 6rem;
        margin: 0 auto;
        background: url("../assets/album.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &.animate {
          animation: rotateAnimate 5s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        .album-avatar {
          width: 3.8rem;
          height: 3.8rem;
          border-radius: 50%;
        }
      }
      .gap {
        height: 2.5rem;
      }
    }
    .playLyrics {
      height: 12rem;
      overflow: auto;
      .lyric-line {
        font-size: 0.3rem;
        padding: 0.15rem;
        color: #fff;
        &.active {
          color: #ff0000;
        }
      }
    }
    .playProgress {
      position: absolute;
      left: 0;
      bottom: 2rem;
      width: 100%;
      .line {
        width: 90%;
        height: 2px;
        background: #ccc;
        border-radius: 1px;
        position: relative;
        margin: 0 auto;
        .dot {
          position: absolute;
          left: -1px;
          top: -1px;
          width: 6px;
          height: 6px;
          border-radius: 2px;
          background: #fff;
        }
      }
    }
    .playFooter {
      position: absolute;
      left: 0;
      bottom: 0.4rem;
      color: #efefef;
      padding: 0.3rem 2rem;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .iconfont {
        font-size: 0.6rem;
        &.play-status {
          font-size: 0.8rem;
        }
      }
    }
    .funcs-container {
      .iconfont {
        font-size: 0.5rem;
        color: #efefef;
      }
    }
  }
  .playBack {
    background-position: center;
    filter: blur(50px);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}
</style>
