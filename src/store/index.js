import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL, PRODUCTS_PER_PAGE, DEFAULT_API_TIMEOUT_LIMIT } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    cartProductsData: [],
    productsData: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    seasons: [],
    materials: [],
    categories: [],
    filters: {},
  },
  getters: {
  },
  mutations: {
    init(state, data) {
      state.productsData = data.items;
      state.totalCount = data.pagination.total;
      state.totalPages = data.pagination.pages;
      state.currentPage = data.pagination.page;
    },
    changePage(state, pageNumber) {
      state.currentPage = pageNumber;
      this.dispatch('loadProducts');
    },
    changeSeasonsList(state, list) {
      state.seasons = list;
    },
    changeMaterialsList(state, list) {
      state.materials = list; console.log(list);
    },
    changeCategoriesList(state, list) {
      state.categories = list;
    },
    changeFilters(state, filters) {
      console.log(filters);
      state.filters = filters;
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((i) => i.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductData(state, items) {
      console.log(['updateCartProductData', items]);
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => (
        {
          productId: item.product.id,
          amount: item.quantity,
        }
      ));
    },
  },
  actions: {
    addProductToCart(
      context,
      {
        productId, colorId, sizeId, quantity,
      },
    ) {
      return axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        colorId,
        sizeId,
        quantity,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    loadCart(context) {
      return axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }

          context.commit('updateCartProductData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    loadProducts(context) {
      const queryParams = {
        ...context.state.filters,
        page: context.state.currentPage,
        limit: PRODUCTS_PER_PAGE,
      };

      return setTimeout(
        () => axios.get(
          `${API_BASE_URL}/api/products`,
          { params: queryParams },
        )
          .then((response) => context.commit('init', response.data)),
        DEFAULT_API_TIMEOUT_LIMIT,
      );
    },
    loadMaterials(context) {
      return setTimeout(
        () => axios.get(`${API_BASE_URL}/api/materials`)
          .then((response) => context.commit('changeMaterialsList', response.data.items)),
        DEFAULT_API_TIMEOUT_LIMIT,
      );
    },
    loadSeasons(context) {
      return setTimeout(
        () => axios.get(`${API_BASE_URL}/api/seasons`)
          .then((response) => context.commit('changeSeasonsList', response.data.items)),
        DEFAULT_API_TIMEOUT_LIMIT,
      );
    },
    loadProductCategories(context) {
      return setTimeout(
        () => axios.get(`${API_BASE_URL}/api/productCategories`)
          .then((response) => context.commit('changeCategoriesList', response.data.items)),
        DEFAULT_API_TIMEOUT_LIMIT,
      );
    },
  },
  modules: {
  },
});
