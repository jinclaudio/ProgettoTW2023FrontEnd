import {createRouter, createWebHashHistory} from "vue-router";
import Homepage from "../components/Homepage.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import("../components/Login.vue")
        },
        {
            path: '/home',
            name: 'home',
            component: Homepage
        },
        // {
        //     path: '/',
        //     name: 'login',
        //     component: Login
        // },

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
        },
        {
            path: '/channel',
            name: 'channel',
            component: () => import('../components/Channels.vue')
        },
        {
            path: '/channel/:id',
            name: 'channel_squeals',
            component: () => import('../components/SquealList.vue')
        },
        {
            path: '/geo_squeals',
            name: 'geo_squeals',
            component: () => import('../components/MyPositions.vue')
        }

    ]
})
router.beforeEach( (to, _from, next) => {
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