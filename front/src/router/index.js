import Vue from 'vue';
import VueRouter from 'vue-router';
import ErrorView from '@/views/ErrorView.vue';
import SignInView from '@/views/SignInView.vue';
import SignUpView from '@/views/SignUpView.vue';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';

Vue.use(VueRouter);

const routes = [
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
    }, {
        path: '*',
        name: 'error',
        component: ErrorView
    },
];

const router = new VueRouter({
    routes
});

export default router;