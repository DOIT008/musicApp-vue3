<template>
  <div class="music-list">
    <div class="top-title">
      <span class="title-left">发现好歌单</span>
      <span class="title-right get-more">查看更多</span>
    </div>
    <swiper :slides-per-view="3" :space-between="10">
      <swiper-slide
        v-for="(banner, index) in musicListData"
        :key="index"
        @click="goToDetail(banner.id)"
      >
        <div class="content-item">
          <img class="music-card" :src="banner.picUrl" alt="" />
          <span class="play-count">
            <i class="iconfont icon-bofang"></i>
            {{ formatPlayCount(banner.playCount) }}
          </span>
          <p class="music-desc">{{ banner.name }}</p>
        </div>
      </swiper-slide>
    </swiper>
    <div class="main-content"></div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { getMusicListData } from "@/api/index";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  name: "musicList",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const router = useRouter(); // 路由实例对象
    const reactiveData = reactive({
      musicListData: [],
    });
    // 获取歌单数据
    async function queryMusicListData(limit: number) {
      let res: any = await getMusicListData(limit);
      if (res.code === 200) {
        reactiveData.musicListData = res.result;
      } else {
        reactiveData.musicListData = [];
      }
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
    // 来到详情页
    function goToDetail(id) {
      router.push(`/musicListDetail?id=${id}&timeStr=${+Date.now()}`);
    }
    onMounted(() => {
      queryMusicListData(10);
    });
    return {
      ...toRefs(reactiveData),
      formatPlayCount,
      goToDetail,
    };
  },
});
</script>

<style scoped lang="scss">
.music-list {
  padding: 0.3rem 0;
  .top-title {
    display: flex;
    justify-content: space-between;
    padding: 0.15rem 0;
    .title-left {
      font-size: 0.4rem;
      font-weight: 600;
    }
    .title-right {
      font-size: 12px;
      border-radius: 0.3rem;
      border: 1px solid #ccc;
      padding: 0 5px;
      cursor: pointer;
      line-height: 0.52rem;
    }
  }
  .content-item {
    position: relative;
    display: inline-block;
    .music-card {
      width: 100%;
      height: auto;
    }
    .play-count {
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 12px;
      color: #fff;
      .iconfont {
        font-size: 12px;
      }
    }
    .music-desc {
      font-size: 12px;
    }
  }
}
</style>
