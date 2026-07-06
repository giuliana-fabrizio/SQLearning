<template>
    <div class="mt-5">
        <form @submit.prevent="submit()">
            <fieldset>
                <div class="row g-5">
                    <div class="col-12 col-md-6">
                        <div class="mb-5" :style="{ background: purple.color_3 }">
                            <label for="name" class="ps-2 text-start w-100 label-form-database">Nom</label>
                            <input type="text" id="name" v-model="database_values.name"
                                class="form-control ps-2 pt-0 rounded-0 bg-input-database" required>
                        </div>

                        <div class="mb-5" :style="{ background: purple.color_3 }">
                            <label for="description"
                                class="ps-2 text-start w-100 label-form-database">Description</label>
                            <textarea id="description" v-model="database_values.description"
                                class="form-control ps-2 pt-0 rounded-0 bg-input-database textarea-database"
                                minlength="10" required></textarea>
                        </div>

                        <div :style="{ background: purple.color_3 }">
                            <label for="file" class="ps-2 text-start w-100 label-form-database">Base de données <span
                                    class="fst-italic">(fichier
                                    .db)</span></label>
                            <input @change="changeFile" type="file" id="file" accept=".db"
                                class="form-control ps-2 pt-0 rounded-0 bg-input-database input-database" required>
                        </div>
                    </div>

                    <div class="d-md-none d-flex justify-content-center">
                        <div class="border-2 border-bottom w-75" style="border-color: #CAC4D0 !important;">
                        </div>
                    </div>

                    <div class="col-12 col-md-6">
                        <div class="questions-container">
                            <div v-for="(question, key) in database_values.questions" :key="key">
                                <h5 class="fw-bold mb-3 text-start">Question {{ key + 1 }}</h5>
                                <div class="mb-5" :style="{ background: purple.color_3 }">
                                    <label for="label" class="ps-2 text-start w-100 label-form-database">Intitulé de la
                                        question</label>
                                    <textarea id="label" v-model="question.label"
                                        class="form-control ps-2 pt-0 rounded-0 bg-input-database textarea-database"
                                        required></textarea>
                                </div>

                                <div class="mb-5" :style="{ background: purple.color_3 }">
                                    <label for="label" class="ps-2 text-start w-100 label-form-database">Résultat
                                        attendu</label>
                                    <textarea id="label" v-model="question.expected_result"
                                        class="form-control ps-2 pt-0 rounded-0 bg-input-database textarea-database"
                                        required></textarea>
                                </div>

                                <div class="mb-5" :style="{ background: purple.color_3 }">
                                    <label for="label" class="ps-2 text-start w-100 label-form-database">Réponse
                                        optimale</label>
                                    <textarea id="label" v-model="question.best_answer"
                                        class="form-control ps-2 pt-0 rounded-0 bg-input-database textarea-database"
                                        required></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-end"
                            :class="database_values.questions?.length !== 0 ? 'mt-3' : ''">
                            <button @click="addQuestion" type="button"" class=" btn"
                                :style="{ border: `1px solid ${purple.color_11}`, color: purple.color_11 }">
                                Ajouter une question
                            </button>
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn mt-5 text-white w-100" :style="{ background: purple.color_11 }">
                    Valider
                </button>
            </fieldset>
        </form>
    </div>
</template>

<script>
import { purple } from "@/utils/colors";
import AvatarsComponent from "./AvatarsComponent.vue";

export default {
    name: "FormDatabaseComponent",

    components: {
        AvatarsComponent
    },

    data: () => ({
        port: 0,
        model: '',
        database_values: {},

        purple
    }),

    props: {
        database: Object
    },

    created() {
        this.database_values = { ...this.database };
    },

    watch: {
        database: function (database, _) { this.database_values = { ...database }; }
    },

    methods: {
        changeFile(e) {
            this.database_values.filename = e.target.files[0].name;
            this.database_values.file = e.target.files[0];
        },

        addQuestion() {
            this.database_values.questions.push({
                label: "",
                expected_result: "",
                best_answer: ""
            });
        },

        submit() {
            this.$emit('submit', this.database_values);
        }
    }
}
</script>