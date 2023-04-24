<template>
    <ul class="catalog__list">
        <products-list-item v-for="product in products"
            :key="product.id" :product="product">
        </products-list-item>
    </ul>
</template>
<script>
import ProductsListItem from '@/components/ProductsListItem.vue';

export default {
  props: ['products'],
  components: {
    ProductsListItem,
  },
};
</script>
