<template>
    <div class="d-flex justify-content-center pt-4">
        <div class="col-10 col-sm-8 col-md-6 mt-5 mb-5">
            <!-- <h2 class="fw-bold mb-5 text-center" :style="{ color: purple.color_11 }">Mon profil</h2> -->
            <img v-if="avatar" :src="avatar" class="mb-5 icon-avatar">
            <i v-else class="bi bi-person mb-5 icon-avatar"></i>

            <ProfileComponent :user="current_user" :submit_message="message" @submit="submit"
                @reset_message="reset_message" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { purple } from "@/utils/colors";
import ProfileComponent from "@/components/ProfileComponent.vue";

export default {
    name: "ProfileView",

    components: {
        ProfileComponent
    },

    data: () => ({
        port: 0,

        current_user: {},
        avatar: null,
        message: "",

        purple
    }),

    created() {
        const uid = localStorage.getItem('uid');
        this.port = process.env.VUE_APP_SERVER_PORT;
        this.loadUser(uid);
    },

    methods: {
        loadUser(uid) {
            axios.get(`http://localhost:${this.port}/user/${uid}`)
                .then(response => {
                    this.current_user = response.data.data;
                    this.avatar = this.current_user.avatar ?
                        require(`@/assets/avatars/${this.current_user.avatar}.png`) :
                        null;
                })
                .catch(_ => {
                    this.message = 'Erreur inconnu'
                });
        },

        submit(user) {
            axios.put(`http://localhost:${this.port}/user`, { user: user })
                .then(response => {
                    this.loadUser(user.id);
                    this.message = response.data.data;
                })
                .catch(_ => {
                    this.message = 'Erreur inconnu'
                });
        },

        reset_message() {
            this.message = "";
        }
    }
}
</script>