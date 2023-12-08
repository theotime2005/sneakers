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
            path: '/auth',
            name: 'login',
            component: () => import("../views/Login.vue")
        }
    ]
})

export default router