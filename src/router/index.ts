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
        {
            path: '/user_detail',
            name: 'user_detail',
            component: () => import('../components/UserDetails.vue'),
            meta: { requiresAuth: true}
        },
        {
            path: '/new_post',
            name: 'new_post',
            component: () => import('../components/NewPost.vue'),
            meta: { requiresAuth: true}
        },
        {
            path: '/post_details/:id',
            name: 'squeal',
            component: () => import('../components/Squeal.vue')
        }

    ]
})
router.beforeEach( (to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (token === null) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router