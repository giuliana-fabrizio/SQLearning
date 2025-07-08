<template>
    <div>
        <form @submit.prevent="submit()" class="card rounded-0 rounded-top p-4" :class="form_class">
            <fieldset>
                <div class="row gx-3">
                    <div class="col-sm-6 mb-3">
                        <label for="firstname" class="fw-bolder ps-0">Prénom</label>
                        <input id="firstname" type="text" v-model="user_values.firstname"
                            class="form-control text-center rounded-0" :class="input_class" required>
                    </div>

                    <div class="col-sm-6 mb-3">
                        <label for="name" class="fw-bolder ps-0">Nom</label>
                        <input id="name" type="text" v-model="user_values.name"
                            class="form-control text-center rounded-0" :class="input_class" required>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="field" class="fw-bolder ps-0">Secteur d'activité</label>
                    <select id="field" v-model="user_values.id_field" class="form-control rounded-0"
                        :class="input_class" required>
                        <option value="" disabled>Choisir...</option>
                        <option v-for="(field, index) in fields" :key="index" :value="field.id">
                            {{ field.name }}
                        </option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="mail" class="fw-bolder ps-0">Email</label>
                    <input id="mail" type="email" v-model="user_values.mail" class="form-control text-center rounded-0"
                        :class="input_class" required :disabled="current_user">
                </div>

                <div class="row gx-3">
                    <div class="col-sm-6 mb-3">
                        <label for="password" class="fw-bolder ps-0">Mot de passe</label>
                        <input @change="verifyPassword" id="password" type="password" minlength="8"
                            v-model="user_values.password" class="form-control text-center rounded-0"
                            :class="input_class" :required="!current_user">
                    </div>

                    <div class="col-sm-6 mb-3">
                        {{ user_values.password && user_values.password != '' }}
                        <label for="check_password" class="fw-bolder ps-0">Confirmer</label>
                        <input id="check_password" type="password" minlength="8" v-model="user_values.check_password"
                            class="form-control text-center rounded-0" :class="input_class"
                            :required="!current_user || user_values.password && user_values.password != ''">
                    </div>
                </div>

                <AvatarsComponent v-if="current_user" class="mb-3" :avatar="user_values.avatar"
                    @resetAvatar="resetAvatar" />

                <button type="submit" class="btn mt-3 text-white w-100" :style="{ background: purple.color_11 }">
                    Valider
                </button>
            </fieldset>
        </form>
    </div>
</template>

<script>
import axios from "axios";

import { purple } from "@/utils/colors";
import AvatarsComponent from "./AvatarsComponent.vue";

export default {
    name: "ProfileComponent",

    components: {
        AvatarsComponent
    },

    data: () => ({
        fields: [],
        port: 0,
        show_avatars: false,

        user_values: {
            id: "",
            avatar: "",
            firstname: "",
            name: "",
            id_field: "",
            mail: "",
            password: "",
            check_password: ""
        },

        isUserGood: true,

        purple
    }),

    props: {
        current_user: Object,
        form_class: String,
        input_class: String
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
        current_user: function (current_user, _) { this.user_values = { ...current_user }; },
    },

    methods: {
        submit() {
            if (this.isUserGood) { this.$emit('submit', this.user_values); }
            else { this.alert.show = true; }
        },

        verifyPassword() {
            const regex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#@$%&? "]).*$/;

            if (this.user_values.password === '') {
                this.isUserGood = true;
            }
            else if (!regex.test(this.user_values.password)) {
                this.$emit("alert", {
                    type: "alert-warning",
                    message: "Le mot de passe doit contenir des caractères spéciaux (!#@$%&?), une majuscule, un nombre et doit faire minimum 8 caractères.",
                    show: true
                });
                this.isUserGood = false;
            }
            else {
                this.isUserGood = true;
            }
        },

        resetAvatar(avatar) { this.user_values.avatar = avatar; },
    }
}
</script>