<template>
  <div class="home">
    <TopNav></TopNav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TopNav from "./TopNav.vue";
export default defineComponent({
  name: "home",
  components: {
    TopNav,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.home {
  padding: 0.3rem;
}
</style>
