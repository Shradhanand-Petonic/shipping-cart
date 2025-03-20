import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductGrid.vue';
import CartPage from '../components/CartPage.vue';


const routes = [
  { path: '/', component: ProductList },
  { path: '/cart', component: CartPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
