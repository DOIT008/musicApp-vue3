<template>
  <router-view v-slot="{ Component }">
    <!-- <keep-alive> -->
    <component :is="Component" />
    <!-- </keep-alive> -->
  </router-view>
  <!-- player -->
  <player></player>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import player from "@/components/player.vue";
export default defineComponent({
  components: {
    player,
  },
  setup() {
    return {};
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
