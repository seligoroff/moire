<template>
    <header class="header container">
    <div class="header__wrapper">
      <span class="header__info">Каталог</span>

      <a class="header__logo" href="#">
        <img src="img/svg/logo-moire.svg" :alt="logoTitle" width="116" height="34">
      </a>

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>

      <cart-widget></cart-widget>
    </div>
  </header>
</template>
<script>
import CartWidget from '@/components/CartWidget.vue';

export default {
  data() {
    return {
      logoTitle: 'Логотип интернет магазина Moire',
    };
  },
  components: {
    CartWidget,
  },
};
</script>
