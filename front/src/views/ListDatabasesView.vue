<template>
    <div class="container">
        <TitleComponent title="Bases de données" />
        <div class="d-flex flex-column flex-sm-row justify-content-between mt-5">
            <FiltersComponent :filters="filters" @apply_filters="getDatabases" />

            <div class="d-none d-sm-block mb-4">
                <div class="align-items-center d-flex h-100 p-1 pe-3 ps-3 pe-md-5 ps-md-5 rounded-pill search-by-name">
                    <i class="bi bi-search" style="color: #828282"></i>
                    <input @input="searchByName" id="search" type="text" v-model="search_name"
                        class="rounded-pill text-center search-by-name" placeholder="Rechercher par nom">
                </div>
            </div>
            <!-- TODO v-if admin -->
            <button @click="() => { this.$router.push({ name: 'home' }); }"
                class="btn mb-4 pe-4 ps-4 rounded-pill text-white" :style="{ background: purple.color_11 }">
                <i class="bi bi-plus-circle me-1"></i>
                Ajouter
            </button>
        </div>
        <div v-for="(data, index) in filtered_databases" :key="index">
            <CardDatabaseComponent :data="data" />
        </div>
        <div v-if="filtered_databases.length === 0" class="mt-5">
            <p class="fw-bold text-center">Aucun résultat</p>
            <p>Modifiez ou supprimez certains de vos filtres</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { purple } from '@/utils/colors';
import TitleComponent from '@/components/TitleComponent.vue';
import FiltersComponent from '@/components/FiltersComponent.vue';
import CardDatabaseComponent from '@/components/CardDatabaseComponent.vue';

export default {
    name: 'ListDatabasesView',

    data: () => ({
        databases: [],
        filtered_databases: [],
        display_filter: false,
        port: 0,
        search_name: "",
        filters: {},

        purple
    }),

    components: {
        TitleComponent,
        FiltersComponent,
        CardDatabaseComponent
    },

    created() {
        this.port = process.env.VUE_APP_SERVER_PORT;
        this.getFiltersFromURL();
        this.getDatabases(this.filters);

        this.display_filter = this.$store.getters.getDisplayFilter;
    },

    methods: {
        getDatabases(filters_params) {
            this.filters = JSON.parse(JSON.stringify(filters_params));
            this.pushFiltersInURL();

            axios.get(`http://localhost:${this.port}/database?min_people=${this.filters.min_people}&max_people=${this.filters.max_people}&work_status=${this.filters.work_status}&id_user=${this.filters.id_user}`)
                .then(res => {
                    this.databases = res.data.data;
                    this.filtered_databases = this.databases;
                })
                .catch(error => {
                    console.error(`Error : ${error}`);
                });
        },

        searchByName(e) {
            this.filtered_databases = this.databases.filter(db => db.name.toLowerCase().includes(e.target.value.toLowerCase()));
        },

        getFiltersFromURL() {
            this.filters = this.$route.query;
            this.filters.work_status = Boolean(this.filters.work_status)
        },

        pushFiltersInURL() {
            const queries = {};

            if (this.filters.min_people) queries.min_people = this.filters.min_people;
            if (this.filters.max_people) queries.max_people = this.filters.max_people;
            if (this.filters.work_status || this.filters.work_status === false) queries.work_status = this.filters.work_status;
            if (this.filters.id_user) queries.id_user = this.filters.id_user;

            this.$router.push({
                name: 'databases',
                query: queries
            }).catch(_ => { });
        }
    }
}
</script>