<template>
  <div class="search-container">
    <div class="input-wrapper">
      <i class="iconfont icon-zuojiantou" @click="$router.back()"></i>
      <input
        type="text"
        v-model="searchText"
        class="input-ele"
        placeholder="请输入歌手/歌名"
        @keyup.enter="handleSearch"
      />
    </div>
    <div class="search-history" v-if="historyList.length > 0">
      <label for="">历史</label>
      <div class="history-wrapper">
        <span
          class="search-item"
          v-for="(item, index) in historyList"
          :key="index"
          >{{ item }}</span
        >
      </div>
    </div>
    {{ searchText }}
  </div>
</template>

<script lang="ts">
import { onBeforeMount, reactive, toRefs } from "vue";
import { SearchReactiveData } from "@/types/index";
export default {
  name: "search",
  setup() {
    const state = reactive<SearchReactiveData>({
      count: 0,
      searchText: "",
      historyList: [],
    });
    // enter触发搜索
    function handleSearch() {
      let storage = JSON.parse(
        window.localStorage.getItem("searchHistory") || "[]"
      );
      storage.unshift(state.searchText);
      window.localStorage.setItem("searchHistory", JSON.stringify(storage));

      // 清空搜索过的数据
      state.searchText = "";
    }
    // 更新搜索过的数据
    onBeforeMount(() => {
      let storage = window.localStorage.getItem("searchHistory") || "[]";
      state.historyList = JSON.parse(storage);
    });
    return {
      ...toRefs(state),
      handleSearch,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-container {
  padding: 0.3rem;
  .input-wrapper {
    display: flex;
    .input-ele {
      width: 80%;
      margin-left: 0.3rem;
      border: 0 none;
      height: 0.8rem;
      border-bottom: 1px solid #ccc;
    }
  }
  .search-history {
    width: 100%;
    padding: 0.3rem 0;
    display: flex;
    label {
      font-weight: 600;
      font-size: 0.4rem;
      margin-right: 0.3rem;
      width: 1.5rem;
    }
    .history-wrapper {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .search-item {
        padding: 1px 0.15rem;
        background: #ccc;
        font-size: 12px;
        border-radius: 0.3rem;
        margin-right: 0.15rem;
        margin-bottom: 0.15rem;
      }
    }
  }
}
</style>
