import Vue from 'vue';
import VueRouter from 'vue-router';
import ErrorView from '@/views/ErrorView.vue';
import SignInView from '@/views/SignInView.vue';
import SignUpView from '@/views/SignUpView.vue';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: "/login", // TODO
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

// router.beforeEach(async (to, from) => {
//     if (
//         // make sure the user is authenticated
//         !isAuthenticated &&
//         // ❗️ Avoid an infinite redirect
//         to.name !== 'Login'
//     ) {
//         // redirect the user to the login page
//         return { name: 'login' }
//     }
// })

export default router;