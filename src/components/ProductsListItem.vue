<template>
    <li class="catalog__item" >
    <router-link class="catalog__pic"
        :to="{ name: 'product', params: {slug: product.slug }}"
        >
      <img :src="currentProductData.gallery[0].file.url"  :alt="product.title"
           v-if="currentProductData.gallery">
      <placeholder-image :title="product.title"  v-else ></placeholder-image>

    </router-link>

    <h3 class="catalog__title">
      <router-link href="#"
        :to="{ name: 'product', params: {slug: product.slug }}"
        >{{ product.title }}</router-link>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="colorItem in product.colors" :key="colorItem.id">
        <label class="colors__label" for="color-1">
<input class="colors__radio sr-only" type="radio" :title="colorItem.color.title"
       v-model="currentColor" :value="colorItem.id">
          <span class="colors__value" :style="getColorStyle(colorItem)"
            @click="changeColor(colorItem)" @keyDown="changeColor(colorItem)">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';
import PlaceholderImage from '@/components/PlaceholderImage.vue';

export default {
  data() {
    return {
      currentProductData: this.product.colors[0],
      currentColor: this.product.colors[0].id,
    };
  },
  props: ['product'],
  filters: {
    numberFormat,
  },
  methods: {
    getColorStyle(obj) {
      return `background-color: ${obj.color.code}`;
    },
    changeColor(color) {
      this.currentColor = color.id;
    },
  },
  watch: {
    currentColor() {
      this.currentProductData = this.product.colors.find((color) => color.id === this.currentColor);
    },
  },
  components: {
    PlaceholderImage,
  },
};
</script>
