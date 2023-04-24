<template>
    <router-link class="header__cart" aria-label="Корзина с товарами" :to="{name: 'cart'}">
    <svg width="19" height="24">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ amount }}</span>
   </router-link>
</template>
<script>
export default {
  computed: {
    amount() {
      return this.$store.state.cartProducts.length;
    },
  },
};
</script>
