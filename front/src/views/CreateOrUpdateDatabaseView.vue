<template>
    <div class="container">
        <div class="mt-5 mb-5">
            <AlertComponent :alert_type="alert.type" :message="alert.message" :show="alert.show" @close="closeAlert" />

            <TitleComponent title="Ajouter une base de données" />

            <FormDatabaseComponent @submit="submit" />
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

        alert: {
            type: "",
            message: "",
            show: false
        },

        purple
    }),

    created() {
        this.port = process.env.VUE_APP_SERVER_PORT;
    },

    methods: {
        submit(database) {
            axios.post(`http://localhost:${this.port}/database`, { database: database })
                .then(_ => {
                    this.uploadFile(database);
                })
                .catch(error => {
                    this.alert = {
                        type: 'alert-danger',
                        message: error.message,
                        show: true
                    }
                });
        },

        uploadFile(database) {
            const formData = new FormData();
            formData.append('file', database.file);

            axios.post(`http://localhost:${this.port}/database/upload`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(_ => { this.$router.push({ name: 'databases' }); })
                .catch(error => { console.error(error); });
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