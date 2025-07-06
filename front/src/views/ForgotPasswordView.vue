<template>
    <div>
        <img alt="background" src="../../public/images/background.png"
            class="img-fluid position-fixed w-100 img-create-an-account">

        <div class="d-flex justify-content-center position-relative pt-4">
            <div class="col-10 col-sm-8 col-md-6 col-lg-4 mt-5 mb-5">
                <h2 class="mb-5 text-center text-white">SQLEARNING</h2>
                <AlertComponent :alert_type="alert.type" :message="alert.message" :show="alert.show"
                    @close="closeAlert" />

                <div class="card p-4 bg-create-an-account">
                    <form @submit.prevent="submit()">
                        <fieldset>
                            <div class="mb-3">
                                <label for="mail" class="fw-bolder ps-0">Adresse mail</label>
                                <input id="mail" type="email" v-model="email"
                                    class="form-control text-center rounded-0 bg-create-an-account" required>
                            </div>

                            <button type="submit" class="btn btn-submit mt-3 text-white w-100"
                                :style="{ background: purple.color_11 }">
                                Envoyer
                            </button>
                        </fieldset>
                    </form>

                    <div class="text-end mt-3">
                        <router-link to="/login" class="fw-bolder text-decoration-none"
                            :style="{ color: purple.color_8 }">
                            Se connecter
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebase";

import { purple } from "@/utils/colors";
import AlertComponent from "@/components/AlertComponent.vue";

export default {
    name: "CreateAnAccountView",

    components: {
        AlertComponent
    },

    data: () => ({
        fields: [],
        port: 0,

        email: "",

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
        submit() {
            axios.get(`http://localhost:${this.port}/user/get_with_email/${this.email}`)
                .then(() => {
                    sendPasswordResetEmail(auth, this.email);
                    this.alert.type = "alert-success";
                    this.alert.message = 'Email de récupération envoyé ! Vérifiez votre messagerie.'
                    this.alert.show = true;
                })
                .catch((error) => {
                    error = error.response.data.data;
                    this.alert.type = "alert-danger";
                    this.alert.message = error.message + " " + error.details;
                    this.alert.show = true;
                });
        },

        closeAlert() {
            this.alert.type = "";
            this.alert.message = "";
            this.alert.show = false;
        }
    }
}
</script>