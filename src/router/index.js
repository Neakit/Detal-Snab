import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogView from '../views/CatalogView.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import AuthView from '../views/AuthView.vue'
import AccountView from '../views/AccountView.vue'
import InfoView from '../views/InfoView.vue'
import PartsSearchView from '../views/PartsSearchView.vue'
import SuccessView from '../views/SuccessView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() { return { top: 0 } },
  routes: [
    { path: '/', component: HomeView, meta: { title: 'Главная' } },
    { path: '/catalog', component: CatalogView, meta: { title: 'Каталог' } },
    { path: '/parts', component: PartsSearchView, meta: { title: 'Поиск деталей' } },
    { path: '/search', redirect: (to) => ({ path: '/parts', query: to.query }) },
    { path: '/product/:id', component: ProductView, meta: { title: 'Карточка товара' } },
    { path: '/cart', component: CartView, meta: { title: 'Корзина' } },
    { path: '/checkout', component: CheckoutView, meta: { title: 'Оформление заказа', requiresAuth: true } },
    { path: '/order-success', component: SuccessView, meta: { title: 'Заказ оформлен' } },
    { path: '/login', component: AuthView, props: { mode: 'login' }, meta: { title: 'Вход' } },
    { path: '/register', component: AuthView, props: { mode: 'register' }, meta: { title: 'Регистрация' } },
    { path: '/account', component: AccountView, props: { section: 'dashboard' }, meta: { title: 'Личный кабинет', requiresAuth: true } },
    { path: '/account/profile', component: AccountView, props: { section: 'profile' }, meta: { title: 'Настройка профиля', requiresAuth: true } },
    { path: '/account/orders', component: AccountView, props: { section: 'orders' }, meta: { title: 'Заказы', requiresAuth: true } },
    { path: '/account/invoices', component: AccountView, props: { section: 'invoices' }, meta: { title: 'Счета', requiresAuth: true } },
    { path: '/about', component: InfoView, props: { page: 'about' }, meta: { title: 'О компании' } },
    { path: '/delivery', component: InfoView, props: { page: 'delivery' }, meta: { title: 'Доставка' } },
    { path: '/payment', component: InfoView, props: { page: 'payment' }, meta: { title: 'Оплата' } },
    { path: '/contacts', component: InfoView, props: { page: 'contacts' }, meta: { title: 'Контакты' } },
    { path: '/how-to-order', component: InfoView, props: { page: 'how-to-order' }, meta: { title: 'Как сделать заказ' } },
    { path: '/how-to-find', component: InfoView, props: { page: 'how-to-find' }, meta: { title: 'Как найти деталь' } },
    { path: '/news', component: InfoView, props: { page: 'news' }, meta: { title: 'Новости' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach((to) => {
  document.title = `${to.meta.title || 'Деталь Снаб'} — Деталь Снаб`
  if (to.meta.requiresAuth && !localStorage.getItem('ds-user')) return { path: '/login', query: { redirect: to.fullPath } }
})

export default router
