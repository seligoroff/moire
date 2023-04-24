import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'main', component: MainPage },
  { path: '/product/:slug', name: 'product', component: ProductPage },
  { path: '/cart', name: 'cart', component: CartPage },
];

const router = new VueRouter({
  routes,
});

export default router;
