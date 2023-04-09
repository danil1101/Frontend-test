<template>
  <header class="header">
    <div class="header__container">
      <div class="header__menu">
        <router-link to="/" class="header__logo">Shop</router-link>
        <router-link to="/cart" class="header__cart cart">
          <img src="/Frontend-test/icon/cart.svg" class="cart__image" alt="">
          <div class="cart__count">{{ cartStore.totalQuantity }}</div>
        </router-link>
      </div>
    </div>
  </header>
  <router-view />
</template>

<script lang="ts" setup>
import { useCartStore } from "@/stores/CartStore";
const cartStore = useCartStore();
</script>


<style lang="scss" scoped>
@import "./style.scss";



.header {
  background-color: $colorLight;

  color: #fff;

  &__menu {
    display: flex;
    align-items: center;
    padding: 15px 0;
    justify-content: space-between;
  }

  &__logo {
    font-size: 23px;
  }

}

.cart {
  position: relative;


  &__count {
    top: -5px;
    left: 18px;
    border-radius: 50%;
    padding: 0 3px;
    background: #000;
    font-size: 10px;
    font-weight: 700;
    color: #fff;
    position: absolute;
  }
}
</style>
