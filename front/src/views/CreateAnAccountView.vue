<template>
    <div>
        <img alt="background" src="../assets/background.png"
            class="img-fluid position-fixed w-100 img-create-an-account">

        <div class="d-flex justify-content-center position-relative pt-4">
            <div class="col-10 col-sm-8 col-md-6 col-lg-4 mt-5 mb-5">
                <h2 class="mb-5 text-center text-white">SQLEARNING</h2>
                <ProfileComponent :submit_message="message" @submit="submit" @reset_message="reset_message" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

import ProfileComponent from "@/components/ProfileComponent.vue";

export default {
    name: "CreateAnAccountView",

    components: {
        ProfileComponent
    },

    data: () => ({
        message: "",
    }),

    methods: {
        async submit(user) {
            const port = process.env.VUE_APP_SERVER_PORT;
            await axios.post(`http://localhost:${port}/user/create`, { user })
                .then(() => {
                    this.$router.push({ name: 'home' });
                })
                .catch((error) => {
                    error = error.response.data.data;
                    this.message = error.message + " " + error.details;
                });
        },

        reset_message() {
            this.message = "";
        }
    }
}
</script>