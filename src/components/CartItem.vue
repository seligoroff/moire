<template>
<li class="cart__item product">
    <div class="product__pic">
      <img :src="item.color.gallery[0].file.url" width="120" height="120"
          alt="Название товара" v-if="item.color.gallery">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="`background-color: ${item.color.color.code}`"></i>
        {{ item.color.color.title }}
      </span>
    </p>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="reduce">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

        <label for="count"><input type="text" v-model="quantity"></label>

      <button type="button" aria-label="Добавить один товар" @click.prevent="add">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ item.product.price * item.quantity | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button"
          aria-label="Удалить товар из корзины" @click.prevent="remove">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
</li>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['item'],
  data() {
    return {};
  },
  methods: {
    reduce() {
      if (this.quantity > 1) {
        this.quantity -= 1;
      }
    },
    add() {
      this.quantity += 1;
    },
    remove() {
      this.$store.dispatch('removeCartItem', this.item.id);
    },
  },
  computed: {
    quantity: {
      get() {
        return this.item.quantity;
      },
      set(value) {
        console.log(value);
        this.$store.dispatch('updateCartItemAmount', { cartItem: this.item, quantity: value });
      },
    },
  },
  filters: {
    numberFormat,
  },
};
</script>
