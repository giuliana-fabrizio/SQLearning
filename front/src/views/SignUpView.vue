<template>
    <div>
        <img alt="background" src="@/assets/background.png"
            class="img-fluid position-fixed w-100 img-auth">

        <div class="d-flex justify-content-center position-relative pt-4">
            <div class="col-10 col-sm-8 col-md-6 col-lg-4 mt-5 mb-5">
                <h2 class="mb-5 text-center text-white">SQLEARNING</h2>

                <div>
                    <ProfileComponent :submit_message="message" @submit="submit" @reset_message="reset_message"
                        form_class="bg-form-auth" input_class="bg-input-auth" />

                    <div class="card rounded-0 rounded-bottom pb-4 bg-form-auth">
                        <div class="d-flex align-items-center justify-content-center">
                            <p class="m-0 me-3">Déjà inscrit ?</p>
                            <router-link to="/login" class="fw-bolder text-decoration-none"
                                :style="{ color: purple.color_8 }">Connectez-vous !</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

import { purple } from "@/utils/colors";
import ProfileComponent from "@/components/ProfileComponent.vue";

export default {
    name: "CreateAnAccountView",

    components: {
        ProfileComponent
    },

    data: () => ({
        message: "",
        port: 0,

        purple
    }),

    created() {
        this.port = process.env.VUE_APP_SERVER_PORT;
    },

    methods: {
        submit(user_to_create) {
            if (user_to_create.check_password != user_to_create.password) {
                this.message = "Les mots de passe ne correspondent pas.";
            } else {
                createUserWithEmailAndPassword(auth, user_to_create.mail, user_to_create.password)
                    .then((credential) => {
                        axios.post(`http://localhost:${this.port}/user`, { user: { ...user_to_create, id: credential.user.uid } })
                            .then(() => {
                                this.$router.push({ name: 'login' });
                            })
                            .catch((error) => {
                                error = error.response.data.data;
                                this.message = error.message + " " + error.details;
                            });
                    })
                    .catch((error) => {
                        this.message = error.message;
                    });
            }
        },

        reset_message() {
            this.message = "";
        }
    }
}
</script>