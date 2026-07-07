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
                            <label for="file" class="ps-2 text-start w-100 label-form-database">
                                Base de données
                                <span class="fst-italic">(fichier .db)</span>
                                <span v-if="database_values.filename" class="fst-italic"> - actuellement : {{ database_values.filename }}</span>
                            </label>
                            <input @change="changeFile" type="file" id="file" accept=".db"
                                class="form-control ps-2 pt-0 rounded-0 bg-input-database input-database"
                                :required="!database_values.id">
                        </div>
                    </div>

                    <div class="d-md-none d-flex justify-content-center">
                        <div class="border-2 border-bottom w-75" style="border-color: #CAC4D0 !important;">
                        </div>
                    </div>

                    <div class="col-12 col-md-6">
                        <div class="questions-container">
                            <div v-for="(question, key) in database_values.questions" :key="key">
                                <div class="align-items-center d-flex justify-content-between mb-3">
                                    <h5 class="fw-bold mb-0 text-start">Question {{ key + 1 }}</h5>

                                    <div class="align-items-center d-flex">
                                        <button v-if="key > 0" @click="moveUpQuestion(key)" type="button" class="btn btn-action-db me-3">
                                            <img src="@/assets/move-up.png" class="img-action-db">
                                        </button>

                                        <button v-if="key + 1 < database_values.questions.length" @click="moveDownQuestion(key)" type="button" class="btn btn-action-db me-3">
                                            <img src="@/assets/move-down.png" class="img-action-db">
                                        </button>

                                        <button @click="removeQuestion(key)" type="button" class="btn btn-action-db">
                                            <img src="@/assets/remove.png" class="img-action-db">
                                        </button>
                                    </div>
                                </div>

                                <div class="mb-5" :style="{ background: purple.color_3 }">
                                    <label for="label" class="ps-2 text-start w-100 label-form-database">Intitulé de la
                                        question</label>
                                    <textarea id="label" v-model="question.label"
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
                            <button @click="addQuestion" type="button" class=" btn"
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
                best_answer: ""
            });
        },

        moveUpQuestion(key){
            const questionToMove = this.database_values.questions.splice(key, 1)[0];
            this.database_values.questions.splice(key - 1, 0, questionToMove);
        },

        moveDownQuestion(key){
            const questionToMove = this.database_values.questions.splice(key, 1)[0];
            this.database_values.questions.splice(key + 1, 0, questionToMove);
        },

        removeQuestion(key){
            this.database_values.questions.splice(key, 1);
        },

        submit() {
            this.$emit('submit', this.database_values);
        }
    }
}
</script>