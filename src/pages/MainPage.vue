<template>
    <main class="content container">
    <div class="content__top">

      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ this.$store.state.totalCount }} товара
        </span>
      </div>
    </div>

    <div class="content__catalog">
        <aside class="filter">
            <form-filter></form-filter>
        </aside>
        <section class="catalog">
            <div v-if="loadingProducts">Данные загружаются...</div>
            <div v-else-if="loadingProductsError">Ошибка загрузки! {{ loadingProductsError }}</div>
            <products-list :products="products" v-else ></products-list>

            <pagination-control :current="currentPage" :pages="pages"
                v-if="pages > 1"></pagination-control>
         </section>
    </div>
  </main>

</template>

<script>
import FormFilter from '@/components/FormFilter.vue';
import PaginationControl from '@/components/PaginationControl.vue';
import ProductsList from '@/components/ProductsList.vue';

export default {
  components: {
    FormFilter,
    PaginationControl,
    ProductsList,
  },
  computed: {
    products() {
      return this.$store.state.productsData;
    },
    currentPage: {
      get() {
        return this.$store.state.currentPage;
      },
      set(page) {
        this.$store.commit('changePage', page);
      },
    },
    pages() {
      return this.$store.state.totalPages;
    },
    loadingProducts: {
      get() {
        return this.$store.state.loadingProducts;
      },
    },
    loadingProductsError: {
      get() {
        return this.$store.state.loadingProductsError;
      },
    },
  },
  created() {
    this.$store.dispatch('loadProducts');
  },
};
</script>
