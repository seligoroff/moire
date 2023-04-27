<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link"  :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item" v-if="product">
          <router-link class="breadcrumbs__link"  :to="{name: 'main'}">
            {{ product.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item"  v-if="product">
          <a class="breadcrumbs__link">
             {{ product.title }}
          </a>
        </li>
      </ul>
    </div>
    <p v-if="loadingProduct">Загузка...</p>
    <p v-else-if="loadingProductError">Ошибка! {{ loadingProductError }}</p>
    <section class="item" v-else-if="product" >
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img :src="currentProductData.gallery[0].file.url"
               :alt="product.title" v-if="currentProductData.gallery">
          <placeholder-image :title="product.title" v-else></placeholder-image>
        </div>
        <ul class="pics__list" v-show="false">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" src="img/product-square-2.jpg" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="img/product-square-3.jpg" alt="Название товара">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click.prevent="reduce">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                  <label for="count"><input type="text" v-model="amount"></label>

                <button type="button" aria-label="Добавить один товар" @click.prevent="add">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>
              <b class="item__price">
                {{ product.price | numberFormat }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="color in product.colors"
                    :key="color.id" @click.prevent="changeColor(color)"
                    @keyup.space="changeColor(color)">
                    <label class="colors__label" for="color-item">
                      <input class="colors__radio sr-only" type="radio"
                            v-model="currentColor" :value="color.color.id" >
                      <span class="colors__value"
                        :style="'background-color:' + color.color.code + ';'"
                         >
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select" for="category">
                  <select class="form__select" type="text" v-model="currentSize">
                    <option v-for="size in product.sizes"
                        :value="size.id" :key="size.id">
                        {{ size.title }}</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
            {{ product.content }}
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import axios from 'axios';
import numberFormat from '@/helpers/numberFormat';
import PlaceholderImage from '@/components/PlaceholderImage.vue';
import { API_BASE_URL, DEFAULT_API_TIMEOUT_LIMIT } from '@/config';

export default {
  data() {
    return {
      loadingProduct: false,
      loadingProductError: '',
      product: null,
      currentColor: null,
      currentProductData: null,
      currentSize: null,
      amount: 1,
    };
  },
  methods: {
    addToCart() {
      const data = {
        productId: this.product.id,
        colorId: this.currentColor,
        sizeId: this.currentSize,
        quantity: this.amount,
      };
      this.$store.dispatch('addProductToCart', data);
    },
    setProduct(product) {
      this.product = product;
      [this.currentProductData] = product.colors;
      this.currentColor = product.colors[0].color.id;
      this.currentSize = this.product.sizes[0].id;
    },
    loadProduct() {
      this.loadingProduct = true;
      const req = () => axios.get(`${API_BASE_URL}/api/products/${this.$route.params.slug}`)
        .then((response) => {
          this.setProduct(response.data);
          this.loadingProduct = false;
          this.loadingProductError = '';
        }).catch((e) => {
          this.loadingProduct = false;
          this.loadingProductError = e.message;
        });
      setTimeout(req, DEFAULT_API_TIMEOUT_LIMIT);
    },
    changeColor(color) {
      console.log(color);
      this.currentColor = color.color.id;
      this.currentProductData = color;
    },
    reduce() {
      if (this.amount > 1) {
        this.amount -= 1;
      }
    },
    add() {
      this.amount += 1;
    },
  },
  filters: {
    numberFormat,
  },
  components: {
    PlaceholderImage,
  },
  created() {
    this.loadProduct();
  },
};
</script>
