import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL, PRODUCTS_PER_PAGE, DEFAULT_API_TIMEOUT_LIMIT } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingMaterials: false,
    loadingMaterialsError: '',
    loadingSeasons: false,
    loadingSeasonsError: '',
    loadingCategories: false,
    loadingCategoriesError: '',
    loadingProducts: false,
    loadingProductsError: '',
    cartProducts: [],
    cartProductsData: [],
    productsData: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    seasons: [],
    materials: [],
    categories: [],
    deliveries: [],
    deliveryMethod: null,
    payments: [],
    paymentMethod: null,
    orderInfo: {},
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
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => (
        {
          productId: item.product.id,
          quantity: item.quantity,
          colorId: item.color.color.id,
          sizeId: item.size.id,
        }
      ));
    },
    changeLoadingProductStatus(state) {
      state.loadingProducts = !state.loadingProducts;
    },
    setLoadingProductsError(state, message) {
      state.loadingProductsError = message;
    },
    changeLoadingCategories(state) {
      state.loadingCategories = !state.loadingCategories;
    },
    setLoadingCategoriesError(state, message) {
      state.loadingCategoriesError = message;
    },
    changeLoadingSeasons(state) {
      state.loadingSeasons = !state.loadingSeasons;
    },
    setLoadingSeasonsError(state, message) {
      state.loadingSeasonsError = message;
    },
    changeLoadingMaterials(state) {
      state.loadingMaterials = !state.loadingMaterials;
    },
    setLoadingMaterialsError(state, message) {
      state.loadingMaterialsError = message;
    },
    setDeliveries(state, items) {
      state.deliveries = items;
      state.deliveryMethod = items[0].id;
    },
    setDeliveryMethod(state, methodId) {
      state.deliveryMethod = methodId;
    },
    setPayments(state, items) {
      state.payments = items;
      state.paymentMethod = items[0].id;
    },
    setPaymentMethod(state, methodId) {
      state.paymentMethod = methodId;
    },
  },
  actions: {
    removeCartItem(context, cartItemId) {
      const req = () => axios.delete(
        `${API_BASE_URL}/api/baskets/products?userAccessKey=${context.state.userAccessKey}`,
        {
          data: {
            basketItemId: cartItemId,
          },
        },
      ).then((response) => {
        context.commit('updateCartProductData', response.data.items);
        context.commit('syncCartProducts');
      });
      setTimeout(req);
    },
    updateCartItemAmount(context, { cartItem, quantity }) {
      const req = () => axios.put(`${API_BASE_URL}/api/baskets/products?userAccessKey=${context.state.userAccessKey}`, {
        basketItemId: cartItem.id,
        quantity,
      }).then((response) => {
        console.log(response);
        context.commit('updateCartProductData', response.data.items);
        context.commit('syncCartProducts');
      });

      setTimeout(req);
    },
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
      context.commit('changeLoadingProductStatus');
      const queryParams = {
        ...context.state.filters,
        page: context.state.currentPage,
        limit: PRODUCTS_PER_PAGE,
      };
      const query = () => axios.get(
        `${API_BASE_URL}/api/products`,
        { params: queryParams },
      )
        .then((response) => context.commit('init', response.data))
        .then(() => {
          context.commit('changeLoadingProductStatus');
          context.commit('setLoadingProductsError', '');
        })
        .catch((e) => {
          context.commit('changeLoadingProductStatus');
          context.commit('setLoadingProductsError', e.message);
        });
      setTimeout(query, DEFAULT_API_TIMEOUT_LIMIT);
      return query;
    },
    loadMaterials(context) {
      context.commit('changeLoadingMaterials');
      const query = () => axios.get(`${API_BASE_URL}/api/materials`)
        .then((response) => {
          context.commit('changeLoadingMaterials');
          context.commit('setLoadingMaterialsError', '');
          context.commit('changeMaterialsList', response.data.items);
        }).catch((e) => {
          context.commit('changeLoadingMaterials');
          context.commit('setLoadingMaterialsError', e.message);
        });
      setTimeout(query, DEFAULT_API_TIMEOUT_LIMIT);
      return query;
    },
    loadSeasons(context) {
      context.commit('changeLoadingSeasons');
      const query = () => axios.get(`${API_BASE_URL}/api/seasons`)
        .then((response) => {
          context.commit('changeLoadingSeasons');
          context.commit('setLoadingSeasonsError', '');
          context.commit('changeSeasonsList', response.data.items);
        }).catch((e) => {
          context.commit('changeLoadingSeasons');
          context.commit('setLoadingSeasonsError', e.message);
        });
      setTimeout(query, DEFAULT_API_TIMEOUT_LIMIT);
      return query;
    },
    loadProductCategories(context) {
      context.commit('changeLoadingCategories');
      const query = () => axios.get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => {
          context.commit('changeLoadingCategories');
          context.commit('setLoadingCategoriesError', '');
          context.commit('changeCategoriesList', response.data.items);
        }).catch((e) => {
          context.commit('changeLoadingCategories');
          context.commit('setLoadingCategoriesError', e.message);
        });
      setTimeout(query, DEFAULT_API_TIMEOUT_LIMIT);
      return query;
    },
    loadDeliveries(context) {
      const req = () => axios.get(`${API_BASE_URL}/api/deliveries`)
        .then((response) => {
          context.commit('setDeliveries', response.data);
          context.dispatch('loadPayments');
        });
      setTimeout(req);
    },
    loadPayments(context) {
      const req = () => axios.get(`${API_BASE_URL}/api/payments`, {
        params: { deliveryTypeId: context.state.deliveryMethod },
      })
        .then((response) => {
          console.log(response);
          context.commit('setPayments', response.data);
        });
      setTimeout(req);
    },
    loadOrderInfo(context, orderId) {
      return axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      }).then((response) => {
        context.commit('updateOrderInfo', response.data);
      });
    },
  },
  modules: {
  },
});
