<template>
    <nav :class="$route.path === '/login' ? 'd-none' : routes.includes($route.path) ? '' : 'd-none'"
        class="navbar m-0 p-0" style="background: #65558F;">
        <!-- TODO color utils -->
        <router-link to="/" class="fw-bold text-white text-decoration-none ps-2">SQLearning</router-link>

        <div id="id_navbar" class="position-relative">
            <div class="horizontal_selector position-absolute" ref="horizontal_selector">
                <div class="left"></div>
                <div class="right"></div>
            </div>
            <ul class="m-0">
                <li v-for="item in items" :key="item.to" :class="{ active: $route.path === item.to }" ref="nav_items">
                    <router-link :to="item.to" class="d-block d-flex text-decoration-none text-white position-relative">
                        <i class="me-md-2" :class="item.icon"></i>
                        <span class="d-none d-md-block">{{ item.label }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { AuthEvent } from '@/utils/auth';

export default {
    data() {
        return {
            isAuthenticated: !!localStorage.getItem('uid'),
            items: [],
            routes: []
        }
    },

    created() {
        this.updateItems();

        AuthEvent.$on('auth-changed', (auth) => {
            this.isAuthenticated = auth;
            this.updateItems();
        });
    },

    mounted() {
        this.routes = this.items.map(item => item.to);

        this.$nextTick(() => this.moveSelector());
        window.addEventListener('resize', () => {
            setTimeout(() => { this.moveSelector(); }, 500);
        });

        this.$watch(
            () => this.$route.path,
            () => this.$nextTick(() => this.moveSelector())
        );
    },

    methods: {
        moveSelector() {
            const nav_items = this.$refs.nav_items;

            let activeIndex = this.items.findIndex(item => item.to === this.$route.path);
            if (activeIndex === -1) { activeIndex = 0; }

            const elem_active = nav_items[activeIndex];

            if (elem_active) {
                const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = elem_active;
                const selector = this.$refs.horizontal_selector;

                selector.style.top = offsetTop + "px";
                selector.style.left = offsetLeft + "px";
                selector.style.height = offsetHeight + "px";
                selector.style.width = offsetWidth + "px";
            }
        },

        updateItems() {
            this.items = [
                { to: '/', icon: 'bi bi-house', label: 'Accueil' },
                { to: '/databases', icon: 'bi bi-clipboard-data', label: 'Bases de données' },
                this.isAuthenticated ?
                    { to: '/profile', icon: 'bi bi-person', label: 'Profil' } :
                    { to: '/login', icon: 'bi bi-person', label: 'Se connecter' },
            ]
        }
    }
}
</script>
