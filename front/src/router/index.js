import Vue from 'vue';
import VueRouter from 'vue-router';
import ListDatabasesView from '@/views/ListDatabasesView.vue';

import SignInView from '@/views/SignInView.vue';
import SignUpView from '@/views/SignUpView.vue';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';

import ErrorView from '@/views/ErrorView.vue';

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
    /** ============================================== Databases */
    {
        path: '/databases',
        name: 'databases',
        component: ListDatabasesView
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

export default router;