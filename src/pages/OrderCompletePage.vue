<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ $store.state.orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart" v-if="$store.state.orderInfo.id">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина.
            На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ $store.state.orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ $store.state.orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ $store.state.orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ $store.state.orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{ $store.state.orderInfo.paymentType }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block" v-if="$store.state.orderInfo.basket.items">
          <ul class="cart__orders">
            <li class="cart__order"
              v-for="item in  $store.state.orderInfo.basket.items" :key="item.id">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.price * item.quantity | numberFormat }} ₽</b>
              <span>Артикул: {{ item.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
              <p>Доставка:
                  <b v-if="$store.state.orderInfo.deliveryType.price > 0">
                      {{ $store.state.orderInfo.deliveryType.price | numberFormat }} ₽
                  </b>
                  <b v-else>бесплатно</b>
              </p>
            <p>Итого: <b>{{ $store.state.orderInfo.basket.items.length }}</b>
              товара на сумму <b>{{ $store.state.orderInfo.totalPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  filters: {
    numberFormat,
  },
  created() {
    if (this.$store.state.orderInfo
        && this.$store.state.orderInfo.id === this.$route.params.orderId) {
      return;
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.orderId);
  },
};
</script>
