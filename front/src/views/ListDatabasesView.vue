<template>
    <div class="container">
        <TitleComponent title="Bases de données" />
        <div class="d-flex justify-content-between mt-5 mb-4">
            <button class="btn border border-2 ps-4 pe-4 rounded-pill">
                <i class="bi bi-filter"></i>
                Filtrer
            </button>
            <div
                class="align-items-center rounded-pill row text-center search-by-name"
                style="width: 35%">
                <i class="bi bi-search col-12 col-md-2" style="color: #828282"></i>
                <input
                    id="search"
                    type="text"
                    v-model="search_name"
                    class="col-12 col-md-10 search-by-name"
                    placeholder="Rechercher par nom">
            </div>
            <!-- TODO v-if admin -->
            <button
                class="btn ps-4 pe-4 rounded-pill text-white"
                :style="{ background: purple.color_11 }">
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
import CardDatabaseComponent from '@/components/CardDatabaseComponent.vue';

export default {
    name: 'ListDatabasesView',

    data: () => ({
        databases: [],
        port: 0,
        search_name: "",

        purple
    }),

    components: {
        TitleComponent,
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
        // this.data.description = this.data.description.slice(0, 300) + "...";
    }
}
</script>