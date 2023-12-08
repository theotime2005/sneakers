import {createRouter, createWebHistory} from "vue-router";

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
        }
    ]
})

export default router