import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import City from './views/City.vue'
import Login from './views/Login.vue'
import Registered from './views/Registered.vue'
import Msite from './views/Msite.vue'
import Search from './views/Search.vue'
import Order from './views/Order.vue'
import Mine from './views/Mine.vue'
import Shop from './views/Shop.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/city/:id',
            name: 'City',
            component: City
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/registered',
            name: 'Registered',
            component: Registered
        },
        {
            path: '/msite/:id',
            name: 'Msite',
            component: Msite
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
        },
        {
            path: '/order',
            name: 'Order',
            component: Order
        },
        {
            path: '/mine',
            name: 'Mine',
            component: Mine
        },
        {
            path: '/shop',
            name: 'Shop',
            component: Shop
        },
    ],
})
