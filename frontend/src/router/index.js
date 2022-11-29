import Vue from 'vue'
import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        redirect: 'shopList'
      },
      {
        path: 'shopList',
        name: 'ShopList',
        component: () => import('../views/ShopListView.vue'),
      },
      {
        path: 'productDetail',
        name: 'ProductDetail',
        component: () => import('../views/ProductDetailView.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/CartView.vue'),
      },
      {
        path: 'adminProductDetail',
        name: 'AdminProductDetail',
        component: () => import('../views/AdminProductDetailView.vue'),
      },
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
