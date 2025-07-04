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

                            <div class="mb-3">
                                <label for="password" class="fw-bolder ps-0">Mot de passe</label>
                                <input id="password" type="password" minlength="8" v-model="password"
                                    class="form-control text-center rounded-0 bg-create-an-account" required>
                            </div>

                            <div class="text-end auth-actions">
                                <router-link to="/register" class="fw-bolder text-decoration-none"
                                    :style="{ color: purple.color_8 }">Mot de passe oublié ?</router-link>
                            </div>

                            <button type="submit" class="btn btn-submit mt-3 text-white w-100"
                                :style="{ background: purple.color_11 }">
                                Valider
                            </button>
                        </fieldset>
                    </form>

                    <div class="d-flex align-items-center justify-content-center mt-3 auth-actions">
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
import { signInWithEmailAndPassword } from "firebase/auth";
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
        password: "",

        alert: {
            type: "",
            message: "",
            show: false
        },

        purple
    }),

    methods: {
        submit() {
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((data) => {
                    this.closeAlert();
                    // TODO session storage
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