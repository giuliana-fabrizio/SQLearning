<template>
    <div class="d-flex justify-content-center pt-4">
        <div class="col-10 col-sm-8 col-md-6 mt-5 mb-5">
            <AlertComponent :alert_type="alert.type" :message="alert.message" :show="alert.show" @close="closeAlert" />

            <Modal v-model="modal_psd.display" title="Confirmer votre mot de passe actuel" :modalStyle="modal_psd.style"
                class="p-3">

                <div class="mb-3">
                    <label for="password" class="form-label">Mot de passe</label>
                    <input id="password" type="password" minlength="8" v-model="modal_psd.value" class="form-control">
                </div>

                <div class="d-flex justify-content-end">
                    <button @click="cancelPassword" class="btn me-2 pe-4 ps-4"
                        :style="{ background: purple.color_4 }">Annuler</button>
                    <button @click="changePassword" class="btn pe-4 ps-4 text-white"
                        :style="{ background: purple.color_10 }">Valider</button>
                </div>
            </Modal>

            <!-- <h2 class="fw-bold mb-5 text-center" :style="{ color: purple.color_11 }">Mon profil</h2> -->
            <img v-if="avatar" :src="avatar" class="mb-5 icon-avatar">
            <i v-else class="bi bi-person mb-5 icon-avatar"></i>

            <ProfileComponent @alert="displayAlert" :current_user="current_user" @submit="submit" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';

import { purple } from "@/utils/colors";
import AlertComponent from "@/components/AlertComponent.vue";
import ProfileComponent from "@/components/ProfileComponent.vue";

export default {
    name: "ProfileView",

    components: {
        AlertComponent,
        'Modal': VueModal,
        ProfileComponent
    },

    data: () => ({
        port: 0,

        current_user: {},
        user_values: {},
        avatar: null,

        alert: {
            type: "",
            message: "",
            show: false
        },

        modal_psd: {
            display: false,
            value: "",
            style: {
                borderRadius: '0.25rem',
                padding: '10px',
            }
        },

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
                    this.updateAlert("alert-danger", "Erreur inconnue.", true);
                });
        },

        updateUser(user) {
            axios.put(`http://localhost:${this.port}/user`, { user: user })
                .then(response => {
                    this.loadUser(user.id);
                    this.updateAlert("alert-success", response.data.data, true);
                })
                .catch(_ => {
                    this.updateAlert("alert-danger", "Erreur inconnue.", true);
                });
        },

        submit(user) {
            if (!user.password) {
                this.updateUser(user);
                return;
            } else if (user.check_password != user.password) {
                this.updateAlert("alert-warning", "Les mots de passe ne correspondent pas.", true);
            } else {
                this.modal_psd.display = true;
                this.user_values = user;
            }
        },

        async changePassword() {
            if (!this.modal_psd.value) {
                this.updateAlert("alert-warning", "Veuillez saisir votre mot de passe actuel.", true);
                return;
            }
            this.modal_psd.display = false;

            const auth = getAuth();
            const firebase_user = auth.currentUser;
            const credential = EmailAuthProvider.credential(this.current_user.mail, this.modal_psd.value);

            try {
                await reauthenticateWithCredential(firebase_user, credential);
                await updatePassword(firebase_user, this.user_values.password);
                this.updateUser(this.user_values);
            } catch (error) {
                console.error(`Error update password : ${error}`)
                this.updateAlert("alert-danger", "Échec dans la modification des champs (problème rencontré au niveau du mot de passe).", true)
            }
        },

        cancelPassword() {
            this.modal_psd = {
                display: false,
                value: null,
            }
            this.updateUser(this.user_values);
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