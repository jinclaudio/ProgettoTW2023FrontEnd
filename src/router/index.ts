import {createRouter, createWebHistory} from "vue-router";

import Homepage from "../components/Homepage.vue";
// import Login from "../components/Login.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Homepage
        },
        {
            path: '/login',
            name: 'login',
            component: () => import("../components/Login.vue")
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../components/Register.vue')
        },

    ]
})

export default router