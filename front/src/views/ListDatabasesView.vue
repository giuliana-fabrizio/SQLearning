<template>
    <div class="container">
        <TitleComponent title="Bases de données" />
        <div class="d-flex flex-column flex-sm-row justify-content-between mt-5">
            <FiltersComponent @filters="applyFilters" />

            <div class="d-none d-sm-block mb-4">
                <div class="
                        align-items-center
                        d-flex
                        h-100
                        p-1
                        pe-3
                        ps-3
                        pe-md-5
                        ps-md-5
                        rounded-pill
                        search-by-name
                    ">
                    <i class="bi bi-search" style="color: #828282"></i>
                    <input id="search" type="text" v-model="search_name" class="rounded-pill text-center search-by-name"
                        placeholder="Rechercher par nom">
                </div>
            </div>
            <!-- TODO v-if admin -->
            <button @click="() => { this.$router.push({ name: 'home' }); }"
                class="btn mb-4 pe-4 ps-4 rounded-pill text-white" :style="{ background: purple.color_11 }">
                <i class="bi bi-plus-circle me-1"></i>
                Ajouter
            </button>
        </div>
        <div v-for="(data, index) in databases" :key="index">
            <CardDatabaseComponent :data="data" />
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
        display_filter: false,
        port: 0,
        search_name: "",

        purple
    }),

    components: {
        TitleComponent,
        FiltersComponent,
        CardDatabaseComponent
    },

    created() {
        this.port = process.env.VUE_APP_SERVER_PORT
        axios.get(`http://localhost:${this.port}/database/get`)
            .then(res => {
                this.databases = res.data.data;
            })
            .catch(error => {
                console.error(`Error : ${error}`);
            });

        this.display_filter = this.$store.getters.getDisplayFilter;
    },

    methods: {
        applyFilters(filters) {
            this.filters = JSON.parse(JSON.stringify(filters));
            console.log(this.filters, filters)

            axios.get(`http://localhost:${this.port}/database/get?min_people=${this.filters.min_people}&max_people=${this.filters.max_people}&work_status=${this.filters.work_status}`)
                .then(res => {
                    this.databases = res.data.data;
                })
                .catch(error => {
                    console.error(`Error : ${error}`);
                });
        }
    }
}
</script>