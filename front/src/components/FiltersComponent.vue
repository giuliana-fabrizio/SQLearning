<template>
    <div>
        <Modal v-model="display" :title="label" :modalStyle="modalStyle" class="p-3">
            <div class="mb-3">
                <p class="fw-bold mb-2">Nombre d'inscrits</p>

                <div class="row gx-2">
                    <div class="col-6">
                        <label class="form-label" for="id_min_peoples">Minimum</label>
                        <input class="form-control" type="number" min="0" name="min_peoples"
                            v-model="filters_db.min_people" @change="updateMaxPeople" id="id_min_peoples">
                    </div>
                    <div class="col-6">
                        <label class="form-label" for="id_max_peoples">Maximum</label>
                        <input class="form-control" type="number" :min="filters_db.min_people" name="max_peoples"
                            v-model="filters_db.max_people" id="id_max_peoples">
                    </div>
                </div>
            </div>

            <div v-if="filters_db.id_user != null" class="mb-3">
                <p class="fw-bold mb-2">Statut de votre travail</p>

                <div class="form-check mb-1">
                    <input @change="filters_db.work_status = true" class="form-check-input me-2" type="radio" name="work_status"
                        :checked="filters_db.work_status" id="id_already_work">
                    <label class="form-check-label" for="id_already_work">
                        Commencé
                    </label>
                </div>
                <div class="form-check">
                    <input @change="filters_db.work_status = false" class="form-check-input me-2" type="radio" name="work_status"
                        :checked="filters_db.work_status === false" id="id_never_work">
                    <label class="form-check-label" for="id_never_work">
                        Pas commencé
                    </label>
                </div>
            </div>

            <div class="d-flex justify-content-end">
                <button @click="resetFilters" class="btn me-2 pe-4 ps-4"
                    :style="{ background: purple.color_4 }">Annuler</button>
                <button @click="updateFilters" class="btn pe-4 ps-4 text-white"
                    :style="{ background: purple.color_10 }">Valider</button>
            </div>
        </Modal>

        <button @click="display = true" type="button" class="btn border border-2 mb-4 pe-4 ps-4 rounded-pill">
            <i class="bi bi-filter"></i>
            Filtrer
        </button>
    </div>
</template>

<script>
import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';

import { purple } from '@/utils/colors';

export default {
    name: "FiltersComponent",

    components: {
        'Modal': VueModal
    },

    props: {
        filters: {}
    },

    data: () => ({
        display: false,
        label: "Filtrer",

        filters_db: {
            min_people: undefined,
            max_people: undefined,
            work_status: undefined, // true if beginning ; false else
            id_user: localStorage.getItem('uid')
        },

        modalStyle: {
            borderRadius: '0.25rem',
            padding: '10px',
        },
        purple
    }),

    methods: {
        updateFilters() {
            this.$emit('filters', this.filters_db)
            this.display = false;
        },

        updateMaxPeople() {
            if (Number(this.filters_db.max_people) < Number(this.filters_db.min_people)) {
                this.filters_db.max_people = this.filters_db.min_people;
            }
        },

        resetFilters() {
            this.filters_db.min_people = undefined;
            this.filters_db.max_people = undefined;
            this.filters_db.work_status = undefined;
            this.updateFilters();
        }
    }
}
</script>