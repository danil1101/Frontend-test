<template>
  <div class="home">
    <div class="home__container">
      <Sidebar />
      <Catalog />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from "@/components/Sidebar.vue";
import Catalog from "@/components/Catalog.vue";
</script>

<style lang="scss" scoped>
.home {
  &__container {
    position: relative;
    display: flex;
  }

  margin-top: 30px;
}
</style>
