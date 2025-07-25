import Vue from 'vue';
import VueRouter from 'vue-router';
import ListDatabasesView from '@/views/ListDatabasesView.vue';

import SignInView from '@/views/SignInView.vue';
import SignUpView from '@/views/SignUpView.vue';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import ProfileView from '@/views/ProfileView.vue';

import ErrorView from '@/views/ErrorView.vue';
import CreateOrUpdateDatabaseView from '@/views/CreateOrUpdateDatabaseView.vue';

Vue.use(VueRouter);

const routes = [
    /** ============================================== Authentication */
    {
        path: "/login",
        name: "login",
        component: SignInView
    }, {
        path: "/reset_password",
        name: "reset_password",
        component: ForgotPasswordView
    }, {
        path: "/register",
        name: "register",
        component: SignUpView
    },
    /** ============================================== Profile */
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView
    },
    /** ============================================== Databases */
    {
        path: '/databases',
        name: 'databases',
        component: ListDatabasesView
    },
    {
        path: '/databases/create',
        name: 'create_db',
        component: CreateOrUpdateDatabaseView
    },
    /** ============================================== Error */
    {
        path: '*',
        name: 'error',
        component: ErrorView
    },
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, _, next) => {
    const uid = localStorage.getItem("uid") ? true : false;

    if (to.name === "profile" && !uid) {
        next('/');
    }

    if ((to.name === "login" || to.name === "reset_password" || to.name === "register") && uid) {
        next('/');
    }
    next();
})

export default router;