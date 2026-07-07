<template>
    <nav :class="displayNavbar()"
        class="navbar m-0 p-0" :style="{ background: purple.color_11 }">
        <!-- TODO color utils -->
        <router-link to="/" class="fw-bold text-white text-decoration-none ps-2">SQLearning</router-link>

        <div id="id_navbar" class="position-relative">
            <div class="horizontal_selector position-absolute" ref="horizontal_selector">
                <div class="left"></div>
                <div class="right"></div>
            </div>
            <ul class="m-0">
                <li v-for="item in items" :key="item.to" :class="{ active: getClass(item) }" ref="nav_items">
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
import { purple } from '@/utils/colors';

export default {
    data() {
        return {
            isAuthenticated: !!localStorage.getItem('uid'),
            items: [],
            routes: [],

            purple
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
        displayNavbar() {
            if (
                this.$route.path === '/login' ||
                this.$route.path === '/register' ||
                this.$route.path === '/reset_password'
                // !this.routes.includes(this.$route.path)
            )
                return 'd-none';
            return '';
        },

        getClass(item) {
            if (this.$route.path === item.to) return true;

            for (const i of this.items) {
                if (i.label === item.label && i.children) {
                    for (const c of i.children) {
                        if (this.$route.path.includes(c)) return true;
                    }
                }
            }

            return false;
        },

        moveSelector() {
            const nav_items = this.$refs.nav_items;

            let activeIndex = 0;

            for (const id in this.items) {
                if (this.$route.path === this.items[id].to) activeIndex = id;

                if (this.items[id].children) {
                    for (const c of this.items[id].children) {
                        if (this.$route.path.includes(c)) activeIndex = id;
                    }
                }
            }

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
                {
                    to: '/databases',
                    icon: 'bi bi-clipboard-data',
                    label: 'Bases de données',
                    children: ["/create", "/edit"]
                },
                this.isAuthenticated ?
                    { to: '/profile', icon: 'bi bi-person', label: 'Profil' } :
                    { to: '/login', icon: 'bi bi-person', label: 'Se connecter' },
            ];

            this.routes = this.items.map(item => item.to);
        }
    }
}
</script>
