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
  position: relative;

  &__container {
    display: flex;

    @media (max-width: 768.98px) {
      flex-wrap: wrap;
      flex-direction: column;
    }
  }

  margin-top: 30px;
}
</style>
