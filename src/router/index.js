import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderCompletePage from '@/pages/OrderCompletePage.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'main', component: MainPage },
  { path: '/product/:slug', name: 'product', component: ProductPage },
  { path: '/cart', name: 'cart', component: CartPage },
  { path: '/order', name: 'order', component: OrderPage },
  { path: '/complete/:orderId', name: 'complete', component: OrderCompletePage },
];

const router = new VueRouter({
  routes,
});

export default router;
