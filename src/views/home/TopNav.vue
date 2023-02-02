<template>
  <div class="top">
    <div class="top-left">
      <i class="iconfont icon-31liebiao"></i>
    </div>
    <div class="top-center">
      <router-link to="/home/my">我的</router-link>
      <router-link to="/home/find">发现</router-link>
      <router-link to="/home/cloudVillage">云村</router-link>
      <router-link to="/home/video">视频</router-link>
    </div>
    <div class="top-right">
      <i class="iconfont icon-sousuo" @click="goSearch()"></i>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    function goSearch() {
      router.push("/search");
    }
    return {
      goSearch,
    };
  },
});
</script>

<style scoped lang="scss">
.top {
  display: flex;
  justify-content: space-between;
  .top-center {
    a {
      text-decoration: none;
      color: #333;
      margin: 0 0.25rem;
      font-size: 0.5rem;
    }
    .router-link-active {
      font-weight: 600;
      font-size: 0.6rem;
    }
  }
  .iconfont {
    font-size: 0.5rem;
  }
}
</style>
