<template>
  <div class="no-content">
    <img src="../../assets/404.png" alt="404" srcset="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.no-content {
  margin-top: 6rem;
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 4rem;
  }
}
</style>
