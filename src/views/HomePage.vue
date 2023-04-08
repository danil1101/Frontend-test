<template>
  <div class="home">
    <div class="home__container">
      <Sidebar @sendSort="handleSort" />
      <Catalog :sort="id" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from "../components/Sidebar.vue";
import Catalog from "@/components/Catalog.vue";
import { ref } from 'vue';

const id = ref('');

function handleSort(value: any) {
  id.value = value;
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  margin-top: 30px;

  &__container {
    display: flex;

    @media (max-width: 768.98px) {
      flex-wrap: wrap;
      flex-direction: column;
    }
  }

}
</style>
