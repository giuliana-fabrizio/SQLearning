<template>
    <div class="container">
        <div class="mt-5 mb-5">
            <AlertComponent :alert_type="alert.type" :message="alert.message" :show="alert.show" @close="closeAlert" />

            <TitleComponent title="Ajouter une base de données" />

            <FormDatabaseComponent @submit="submit" :database="database" />
        </div>
    </div>
</template>

<script>
import axios from "axios";

import { purple } from "@/utils/colors";
import AlertComponent from "@/components/AlertComponent.vue";
import TitleComponent from "@/components/TitleComponent.vue";
import FormDatabaseComponent from "@/components/FormDatabaseComponent.vue";

export default {
    name: "CreateOrUpdateDatabaseView",

    components: {
        AlertComponent,
        TitleComponent,
        FormDatabaseComponent
    },

    data: () => ({
        port: 0,
        database: {
            id: "",
            name: "",
            description: "",
            filename: "",
            file: "",
            id_user: localStorage.getItem("uid"),
            questions: []
        },

        alert: {
            type: "",
            message: "",
            show: false
        },

        purple
    }),

    created() {
        this.port = process.env.VUE_APP_SERVER_PORT;
        const id = this.$route.params.id;

        if (id) {
            axios.get(`http://localhost:${this.port}/database/${id}`)
                .then(res => {
                    this.database = { ...res.data.data };
                })
                .catch(error => { console.error(error); });
        }
    },

    methods: {
        submit(database) {
            if (!this.$route.params.id) {
                this.uploadFile(database);
            } else {
                if (database.file) {
                    this.uploadFile(database);
                } else {
                    this.updateDatabase(database);
                }
            }
        },

        uploadFile(database) {
            const formData = new FormData();
            formData.append('file', database.file);

            axios.post(`http://localhost:${this.port}/database/upload`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            )
                .then(_ => {
                    if (!this.$route.params.id) {
                        this.createDatabase(database);
                    } else {
                        this.updateDatabase(database);
                    }
                })
                .catch(error => { this.updateAlert('alert-danger', error, true) });
        },

        createDatabase(database) {
            axios.post(`http://localhost:${this.port}/database`, { database: database })
                .then(_ => { this.$router.push({ name: 'databases' }); })
                .catch(error => {
                    this.updateAlert('alert-danger', error.response.data.data, true)
                });
        },

        updateDatabase(database) {
            axios.put(`http://localhost:${this.port}/database/${database.id}`, { database: database })
                .then(_ => { this.$router.push({ name: 'databases' }); })
                .catch(error => {
                    this.updateAlert('alert-danger', error.response.data.data, true)
                });
        },

        closeAlert() { this.updateAlert("", "", false); },

        displayAlert(alert) { this.alert = alert; },

        updateAlert(type, message, show) {
            this.alert = {
                type: type,
                message: message,
                show: show
            }
        }
    }
}
</script>