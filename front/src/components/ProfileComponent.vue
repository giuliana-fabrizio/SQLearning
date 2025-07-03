<template>
    <div>
        <AlertComponent :alert_type="alert.type" :message="alert.message" :show="alert.show" @close="closeAlert" />
        <form @submit.prevent="submit()" class="card p-4 bg-create-an-account">
            <fieldset>
                <div class="row gx-3">
                    <div class="col-sm-6 mb-3">
                        <label for="firstname" class="fw-bolder ps-0">Prénom</label>
                        <input id="firstname" type="text" v-model="user_property.firstname"
                            class="form-control text-center rounded-0 bg-create-an-account" required>
                    </div>

                    <div class="col-sm-6 mb-3">
                        <label for="name" class="fw-bolder ps-0">Nom</label>
                        <input id="name" type="text" v-model="user_property.name"
                            class="form-control text-center rounded-0 bg-create-an-account" required>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="field" class="fw-bolder ps-0">Secteur d'activité</label>
                    <select id="field" v-model="user_property.id_field"
                        class="form-control rounded-0 bg-create-an-account" required>
                        <option value="" disabled>Choisir...</option>
                        <option v-for="(field, index) in fields" :key="index" :value="field.id">
                            {{ field.name }}
                        </option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="mail" class="fw-bolder ps-0">Email</label>
                    <input id="mail" type="email" v-model="user_property.mail"
                        class="form-control text-center rounded-0 bg-create-an-account" required :disabled="user">
                </div>

                <div class="row gx-3">
                    <div class="col-sm-6 mb-3">
                        <label for="password" class="fw-bolder ps-0">Mot de passe</label>
                        <input @change="verifyPassword" id="password" type="password" minlength="8"
                            v-model="user_property.password"
                            class="form-control text-center rounded-0 bg-create-an-account" required>
                    </div>

                    <div class="col-sm-6 mb-3">
                        <label for="check_password" class="fw-bolder ps-0">Confirmer</label>
                        <input id="check_password" type="password" minlength="8" v-model="user_property.check_password"
                            class="form-control text-center rounded-0 bg-create-an-account" required>
                    </div>
                </div>

                <div v-if="user" class="mb-3">
                    <label for="avatar" class="fw-bolder ps-0">Avatar</label>
                    <input id="avatar" type="text" v-model="user_property.avatar"
                        class="form-control text-center rounded-0 bg-create-an-account">
                </div>

                <button type="submit" class="btn btn-submit mt-3 text-white w-100"
                    :style="{ background: purple.color_11 }">
                    Valider
                </button>
            </fieldset>
        </form>
    </div>
</template>

<script>
import axios from "axios";

import { purple } from "@/utils/colors";
import AlertComponent from "./AlertComponent.vue";

export default {
    name: "ProfileComponent",

    components: {
        AlertComponent
    },

    data: () => ({
        fields: [],
        port: 0,

        user_property: {
            avatar: "",
            firstname: "",
            name: "",
            id_field: "",
            mail: "",
            password: "",
            check_password: ""
        },

        alert: {
            type: "",
            message: "",
            show: false
        },
        isUserGood: false,

        purple
    }),

    props: {
        user: Object,
        submit_message: String,
        reset_message: String
    },

    created() {
        this.port = process.env.VUE_APP_SERVER_PORT;
        axios.get(`http://localhost:${this.port}/user/getFields`)
            .then(res => {
                this.fields = res.data.data;
            })
            .catch((error) => {
                console.error(`Error : ${error}`);
            });
    },

    watch: {
        submit_message: function (message, _) {
            if (message != "") {
                this.alert.type = "alert-danger";
                this.alert.message = message;
                this.alert.show = true;
            }
        }
    },

    methods: {
        submit() {
            if (this.isUserGood) {
                this.$emit('submit', this.user_property);
            } else {
                this.alert.show = true;
            }
        },

        verifyPassword() {
            const regex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#@$%&? "]).*$/;

            if (!regex.test(this.user_property.password)) {
                this.alert = {
                    type: "alert-warning",
                    message: "Le mot de passe doit contenir des caractères spéciaux (!#@$%&?), une majuscule, un nombre et doit faire minimum 8 caractères.",
                    show: true
                }
                this.isUserGood = false;
            } else {
                this.isUserGood = true;
            }
        },

        closeAlert() {
            this.alert.show = false;
            this.$emit("reset_message");
        }
    }
}
</script>