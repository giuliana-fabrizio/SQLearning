import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ErrorView from '@/views/ErrorView.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    }, {
        path: '*',
        name: 'error',
        component: ErrorView
    }
];

const router = new VueRouter({
    routes
});

export default router;