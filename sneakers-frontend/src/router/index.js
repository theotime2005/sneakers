import {createRouter, createWebHistory} from "vue-router";
import Login from "../views/Login.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import("../views/Home.vue")
        },
        {
            path: '/sneaker/:id',
            name: 'Show sneaker',
            component: () => import("../components/Sneaker.vue")
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import("../views/Login.vue")
        },
        {
            path: '/auth/register',
            name: 'Register',
            component: () => import("../views/Register.vue")
        },
        {
            path: '/collection',
            name: 'Collection',
            component: () => import("../views/Collection.vue")
        },
        {
            path: '/profil',
            name: 'Profil',
            component: () => import("../views/Profil.vue")
        },
        {
            path: '/wishlist',
            name: 'wishlist',
            component: () => import("../views/WishList.vue")
        }
    ]
})

export default router