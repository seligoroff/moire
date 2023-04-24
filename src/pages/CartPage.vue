<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          3 товара
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">

              <cart-item v-for="item in items" :item="item" :key="item.id"></cart-item>

          </ul>
        </div>

        <div class="cart__block" v-if="items.length">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{totalPrice | numberFormat}} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>

</template>
<script>
import CartItem from '@/components/CartItem.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  computed: {
    items() {
      return this.$store.state.cartProductsData;
    },
    totalPrice() {
      const total = 0;
      return this.$store.state.cartProductsData.reduce(
        (accumulator, currentValue) => currentValue.price * currentValue.quantity + accumulator,
        total,
      );
    },
  },
  components: {
    CartItem,
  },
  filters: {
    numberFormat,
  },
};
</script>
