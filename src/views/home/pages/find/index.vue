<template>
  <div class="find-container">
    <!-- banner -->
    <swiper :slides-per-view="1" :space-between="50" loop>
      <swiper-slide v-for="(banner, index) in bannerData" :key="index">
        <img :src="banner" alt="" srcset="" />
      </swiper-slide>
    </swiper>
    <!-- 图标列表 -->
    <iconList></iconList>
    <!-- 发现好歌单 -->
    <music-list></music-list>
  </div>
</template>

<script lang="ts">
import iconList from "./components/iconList.vue";
import musicList from "./components/musicList.vue";
import { getBanner } from "@/api/index";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
//
export default defineComponent({
  name: "find",
  components: {
    Swiper,
    SwiperSlide,
    iconList,
    musicList,
  },
  setup() {
    const reactiveData = reactive({
      bannerData: [],
    });
    // 获取banner数据
    async function queryBanner(type: number) {
      let res: any = await getBanner(type);
      reactiveData.bannerData = res.banners.map((item: any) => item.pic);
    }
    onMounted(() => {
      queryBanner(2);
    });
    return {
      ...toRefs(reactiveData),
    };
  },
});
</script>

<style scoped lang="scss">
.find-container {
  margin-top: 0.8rem;
  img {
    width: 100%;
  }
}
</style>
