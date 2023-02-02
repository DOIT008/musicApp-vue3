<template>
  <div class="iconList">
    <ul class="iconList-container">
      <li
        class="iconList-item"
        v-for="(item, index) in iconListData"
        :key="index"
      >
        <div class="icon-wrapper">
          <i :class="item.icon"></i>
        </div>
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "iconList",
  setup() {
    const reactiveData = reactive({
      iconListData: [
        {
          title: "每日推荐",
          icon: "iconfont icon-rili",
        },
        {
          title: "私人FM",
          icon: "iconfont icon-FM_weixuanze",
        },
        {
          title: "歌单",
          icon: "iconfont icon-yinlegedan-",
        },
        {
          title: "排行榜",
          icon: "iconfont icon-paihangbang",
        },
        {
          title: "直播",
          icon: "iconfont icon-zhibo",
        },
      ],
    });
    return {
      ...toRefs(reactiveData),
    };
  },
});
</script>

<style scoped lang="scss">
ul,
li {
  list-style: none;
}
.iconList {
  padding: 0 0.3rem;
  .iconList-container {
    display: flex;
    justify-content: space-between;
    .iconList-item {
      font-size: 0.3rem;
      text-align: center;
      .icon-wrapper {
        width: 1rem;
        height: 1rem;
        background: #fa2114;
        color: #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.15rem;
        margin: 0 auto;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
