<template>
    <nav v-if="routes.includes($route.path)" class="navbar m-0 p-0" style="background: #65558F;">
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
export default {
    data() {
        return {
            items: [
                { to: '/', icon: 'bi bi-house', label: 'Accueil' },
                { to: '/databases', icon: 'bi bi-clipboard-data', label: 'Bases de données' },
                { to: '/profile', icon: 'bi bi-person', label: 'Profil' },
            ],
            routes: []
        }
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

            const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = elem_active;
            const selector = this.$refs.horizontal_selector;

            selector.style.top = offsetTop + "px";
            selector.style.left = offsetLeft + "px";
            selector.style.height = offsetHeight + "px";
            selector.style.width = offsetWidth + "px";
        }
    }
}
</script>

<style>
#id_navbar {
    overflow: hidden;
}

#id_navbar li {
    list-style-type: none;
    float: left;
}

#id_navbar ul li a {
    font-size: 15px;
    padding: 20px 20px;
    transition-duration: 0.6s;
}

#id_navbar>ul>li.active>a {
    color: #65558F !important;
    background-color: transparent;
    transition: all 0.7s;
}

.horizontal_selector {
    top: 0px;
    left: 0px;
    transition-duration: 0.6s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    background-color: white;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin-top: 10px;
}

.horizontal_selector .right,
.horizontal_selector .left {
    position: absolute;
    width: 25px;
    height: 25px;
    background-color: #fff;
    bottom: 10px;
}

.horizontal_selector .right {
    right: -25px;
}

.horizontal_selector .left {
    left: -25px;
}

.horizontal_selector .right:before,
.horizontal_selector .left:before {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #65558F;
}

.horizontal_selector .right:before {
    bottom: 0;
    right: -25px;
}

.horizontal_selector .left:before {
    bottom: 0;
    left: -25px;
}
</style>