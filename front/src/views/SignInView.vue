<template>
    <div>
        <img alt="background" src="../../public/images/background.png"
            class="img-fluid position-fixed w-100 img-auth">

        <div class="d-flex justify-content-center position-relative pt-4">
            <div class="col-10 col-sm-8 col-md-6 col-lg-4 mt-5 mb-5">
                <h2 class="mb-5 text-center text-white">SQLEARNING</h2>
                <AlertComponent :alert_type="alert.type" :message="alert.message" :show="alert.show"
                    @close="closeAlert" />

                <div class="card p-4 bg-form-auth">
                    <form @submit.prevent="submit()">
                        <fieldset>
                            <div class="mb-3">
                                <label for="mail" class="fw-bolder ps-0">Adresse mail</label>
                                <input id="mail" type="email" v-model="email"
                                    class="form-control text-center rounded-0 bg-input-auth" required>
                            </div>

                            <div class="mb-3">
                                <label for="password" class="fw-bolder ps-0">Mot de passe</label>
                                <input id="password" type="password" minlength="8" v-model="password"
                                    class="form-control text-center rounded-0 bg-input-auth" required>
                            </div>

                            <div class="text-end">
                                <router-link to="/reset_password" class="fw-bolder text-decoration-none"
                                    :style="{ color: purple.color_8 }">Mot de passe oublié ?</router-link>
                            </div>

                            <button type="submit" class="btn  mt-3 text-white w-100"
                                :style="{ background: purple.color_11 }">
                                Valider
                            </button>
                        </fieldset>
                    </form>

                    <div class="d-flex align-items-center justify-content-center mt-3">
                        <p class="m-0 me-3">Pas de compte ?</p>
                        <router-link to="/register" class="fw-bolder text-decoration-none"
                            :style="{ color: purple.color_8 }">Inscrivez-vous !</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";

import { purple } from "@/utils/colors";
import AlertComponent from "@/components/AlertComponent.vue";
import { AuthEvent } from "@/utils/auth";

export default {
    name: "CreateAnAccountView",

    components: {
        AlertComponent
    },

    data: () => ({
        fields: [],
        port: 0,

        email: "",
        password: "",

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
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((response_firebase) => {
                    this.closeAlert();

                    axios.get(`http://localhost:${this.port}/user/get_with_email/${this.email}`)
                        .then(response => {
                            localStorage.setItem('uid', response_firebase.user.uid);
                            localStorage.setItem('role', response.data.data.is_admin);
                            AuthEvent.$emit('auth-changed', true);
                            this.$router.push({ name: 'home' });
                        })
                        .catch(_ => {
                            this.alert.type = "alert-danger";
                            this.alert.message = 'Erreur inconnu'
                            this.alert.show = true;
                        });
                })
                .catch(() => {
                    this.alert.type = "alert-danger";
                    this.alert.message = 'Email ou mot de passe incorrect'
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