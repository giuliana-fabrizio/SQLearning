<template>
    <div class="d-flex justify-content-center position-relative pt-4">
        <div class="col-10 col-sm-8 col-md-6 col-lg-4">
            <h2 class="mb-5 mt-5 text-center text-white">SQLEARNING</h2>
            <form class="p-4" style="background: #ccc;">
                <fieldset>
                    <div class="mb-3">
                        <label for="avatar" class="fw-bolder ps-0">Avatar</label>
                        <input
                            id="avatar"
                            type="text"
                            v-model="avatar"
                            class="form-control text-center rounded-0 bg-create-an-account"
                            required>
                    </div>

                    <div class="mb-3">
                        <label for="firstname" class="fw-bolder ps-0">Prénom</label>
                        <input
                            id="firstname"
                            type="text"
                            v-model="firstname"
                            class="form-control text-center rounded-0 bg-create-an-account"
                            required>
                    </div>

                    <div class="mb-3">
                        <label for="name" class="fw-bolder ps-0">Nom</label>
                        <input
                            id="name"
                            type="text"
                            v-model="name"
                            class="form-control text-center rounded-0 bg-create-an-account"
                            required>
                    </div>

                    <div class="mb-3">
                        <label for="field" class="fw-bolder ps-0">Secteur d'activité</label>
                        <select
                            id="field"
                            v-model="id_field"
                            class="form-control rounded-0 bg-create-an-account"
                            required>
                            <option value="" disabled>Choisir...</option>
                            <option
                                v-for="(field, index) in fields"
                                :key="index"
                                :value="field.id">
                                {{ field.name }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="mail" class="fw-bolder ps-0">Email</label>
                        <input
                            id="mail"
                            type="email"
                            v-model="mail"
                            class="form-control text-center rounded-0 bg-create-an-account"
                            required>
                    </div>

                    <div class="mb-4">
                        <label for="password" class="fw-bolder ps-0">Mot de passe</label>
                        <input
                            id="password"
                            type="text"
                            v-model="password"
                            class="form-control text-center rounded-0 bg-create-an-account"
                            required>
                    </div>

                    <button
                        @click="submit()"
                        class="btn btn-submit text-white w-100"
                        :style="{ background: purple.color_11 }">
                        Valider
                    </button>
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { purple } from "@/utils/colors";

export default {
    name: "ProfileComponent",

    data: () => ({
        fields: [],

        avatar: "",
        firstname: "",
        name: "",
        id_field: "",
        mail: "",
        password: "",

        purple
    }),

    props: {
        user: Object
    },

    created() {
        const port = process.env.VUE_APP_SERVER_PORT;
        axios.get(`http://localhost:${port}/user/getFields`)
            .then(res => {
                this.fields = res.data.data;
            })
            .catch((error) => {
                console.error(`Error : ${error}`);
            });
    },

    methods: {
        submit() {
            console.log(this.avatar, this.firstname, this.name, this.id_field, this.mail, this.password)
        }
    }
}
</script>