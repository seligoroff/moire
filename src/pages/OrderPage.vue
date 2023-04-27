<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
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

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart" v-if="items.length">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="makeOrder">
        <div class="cart__field">
          <div class="cart__data">
            <label class="form__label" for="name">
              <input class="form__input" type="text" v-model="orderForm.name"
                placeholder="Введите ваше полное имя">
              <span class="form__value">ФИО</span>
              <span class="form__error"
                v-if="orderFormErrors.name">{{ orderFormErrors.name }}</span>
            </label>

            <label class="form__label" for="address">
              <input class="form__input" type="text"
                   v-model="orderForm.address" placeholder="Введите ваш адрес">
              <span class="form__value">Адрес доставки</span>
              <span class="form__error"
                v-if="orderFormErrors.address">{{ orderFormErrors.address }}</span>
            </label>

            <label class="form__label" for="phone">
              <input class="form__input" type="tel"
                    v-model="orderForm.phone" placeholder="Введите ваш телефон">
              <span class="form__value">Телефон</span>
              <span class="form__error"
                v-if="orderFormErrors.phone">{{ orderFormErrors.phone }}</span>
            </label>

            <label class="form__label" for="email">
              <input class="form__input" type="email"
                    v-model="orderForm.email" placeholder="Введи ваш Email">
              <span class="form__value">Email</span>
              <span class="form__error"
                v-if="orderFormErrors.email">{{ orderFormErrors.email }}</span>
            </label>

            <label class="form__label" for="comment">
              <textarea class="form__input form__input--area" v-model="orderForm.comment"
                    placeholder="Ваши пожелания"></textarea>
              <span class="form__value">Комментарий к заказу</span>
              <span class="form__error"
                v-if="orderFormErrors.comment">{{ orderFormErrors.comment }}</span>
            </label>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="method in deliveries" :key="method.id">
                <label class="options__label" for="delivery"
                    @click.prevent="deliveryMethod = method.id"
                    @keydown.space="deliveryMethod = method.id">
                  <input class="options__radio sr-only" type="radio"
                    :value="method.id" v-model="deliveryMethod"
                    >
                  <span class="options__value">
                      {{ method.title }}
                      <b v-if="method.price > 0">{{ method.price | numberFormat }} ₽</b>
                      <b v-else>бесплатно</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="method in payments" :key="method.id"
                @click.prevent="paymentMethod = method.id"
                @keydown.space="paymentMethod = method.id">
                <label class="options__label" for="pay">
                  <input class="options__radio sr-only" type="radio"
                        :value="method.id" v-model="paymentMethod">
                  <span class="options__value">
                    {{ method.title }}
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in items" :key="item.id">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.price * item.quantity | numberFormat }} ₽</b>
              <span>Артикул: {{ item.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
              <p>Доставка:
                <b v-if="currentDeliveryMethod.price > 0">
                   {{ currentDeliveryMethod.price | numberFormat }} ₽
                </b>
                <b v-else>бесплатно</b>
              </p>
            <p>Итого:
                <b>{{ this.$store.state.cartProducts.length }}</b>
                товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="sendingError">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
      <p v-else>Вы еще ничего не заказали.</p>
  </main>
</template>
<script>
import axios from 'axios';
import numberFormat from '@/helpers/numberFormat';
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      orderForm: {},
      orderFormErrors: {},
      sendingError: false,
    };
  },
  computed: {
    currentDeliveryMethod() {
      return this.deliveries.find((item) => item.id === this.deliveryMethod);
    },
    items() {
      return this.$store.state.cartProductsData;
    },
    deliveries() {
      return this.$store.state.deliveries;
    },
    deliveryMethod: {
      get() {
        return this.$store.state.deliveryMethod;
      },
      set(value) {
        this.$store.commit('setDeliveryMethod', value);
        this.$store.dispatch('loadPayments', value);
      },
    },
    paymentMethod: {
      get() {
        return this.$store.state.paymentMethod;
      },
      set(value) {
        this.$store.commit('setPaymentMethod', value);
      },
    },
    payments() {
      return this.$store.state.payments;
    },
    userAcccessKey() {
      return this.$store.state.userAccessKey;
    },
    totalPrice() {
      const total = 0;
      return this.items.reduce((acc, currentValue) => acc
        + currentValue.price * currentValue.quantity, total)
        + parseInt(this.currentDeliveryMethod.price, 10);
    },
  },
  methods: {
    makeOrder() {
      console.log(this.orderForm);
      const data = {
        name: this.orderForm.name,
        address: this.orderForm.address,
        phone: this.orderForm.phone,
        email: this.orderForm.email,
        deliveryTypeId: this.deliveryMethod,
        paymentTypeId: this.paymentMethod,
        comment: this.orderForm.comment,
      };
      const req = () => axios.post(`${API_BASE_URL}/api/orders?userAccessKey=${this.userAcccessKey}`, data)
        .then((response) => {
          console.log(response);
          this.sendingError = false;
          this.sendingData = false;
          this.$store.commit('resetCart');
          this.formData = [];
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'complete', params: { orderId: response.data.id } });
        })
        .catch((e) => {
          this.sendingError = true;
          if (e.response.data.error) {
            this.orderFormErrors = e.response.data.error.request;
          }
        });
      setTimeout(req);
    },
  },
  filters: {
    numberFormat,
  },
  created() {
    this.$store.dispatch('loadDeliveries');
  },
};
</script>
