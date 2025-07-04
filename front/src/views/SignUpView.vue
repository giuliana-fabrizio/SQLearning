<template>
    <div>
        <img alt="background" src="../../public/images/background.png"
            class="img-fluid position-fixed w-100 img-create-an-account">

        <div class="d-flex justify-content-center position-relative pt-4">
            <div class="col-10 col-sm-8 col-md-6 col-lg-4 mt-5 mb-5">
                <h2 class="mb-5 text-center text-white">SQLEARNING</h2>
                <div class="card p-4 bg-create-an-account">
                    <ProfileComponent :submit_message="message" @submit="submit" @reset_message="reset_message" />

                    <div class="d-flex align-items-center justify-content-center mt-3 auth-actions">
                        <p class="m-0 me-3">Déjà inscrit ?</p>
                        <router-link to="/login" class="fw-bolder text-decoration-none"
                            :style="{ color: purple.color_8 }">Connectez-vous !</router-link>
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

        purple
    }),

    methods: {
        submit(user_to_create) {
            if (user_to_create.check_password != user_to_create.password) {
                this.message = "Les mots de passe ne correspondent pas.";
            } else {
                createUserWithEmailAndPassword(auth, user_to_create.mail, user_to_create.password)
                    .then(async (credential) => {
                        // const user = credential.user; TODO

                        const port = process.env.VUE_APP_SERVER_PORT;
                        await axios.post(`http://localhost:${port}/user/create`, { user: { ...user_to_create, id: credential.user.uid } })
                            .then(() => {
                                this.$router.push({ name: 'home' });
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