<template>
    <div>
        <Modal v-model="modal_delete.display" title="Attention" :modalStyle="modal_delete.style" class="p-3">
            <p>Êtes-vous sûr de vouloir supprimer la database {{ data.name }} et toutes les questions qui y sont
                rattachées ?</p>
            <div class="d-flex justify-content-end">
                <button class="btn me-2 pe-4 ps-4" :style="{ background: purple.color_4 }">Non</button>
                <button @click="deleteDb" class="btn pe-4 ps-4 text-white"
                    :style="{ background: purple.color_10 }">Oui</button>
            </div>
        </Modal>

        <div :style="{ background: purple.color_1 }">
            <div class="p-3 row">
                <div class="col-sm-3 col-md-2 col-lg-1 d-none d-sm-block">
                    <!-- <img :src="'../../public/image/avatars'" alt="Image" class="w-100"> --> TODO
                </div>
                <div class="col-8 col-md-9 col-lg-10">
                    <p class="fs-5 mb-1">{{ data.name }}</p>
                    <p class="mb-1" style="color: #49454F">
                        {{ data.description.substring(0, 120) + "..." }}
                    </p>
                </div>
                <div class="align-items-start col-4 col-sm-1 d-flex justify-content-end">
                    <div data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Nombre d'inscrits"
                        class="badge me-1 rounded-circle badge-peoples" :style="{ background: purple.color_8 }">
                        <span class="text-white" style="font-size: small;">{{ data.peoples }}</span>
                    </div>

                    <div v-if="current_user === data.id_user || role === 1" class="dropdown dropdown-plus">
                        <a role="button" data-bs-toggle="dropdown" aria-expanded="false" class="dropdown-toggle-plus"
                            :style="{ color: purple.color_11 }">
                            <i class="bi bi-three-dots-vertical"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end  mt-2 p-0">
                            <li>
                                <button class="btn btn-sm dropdown-item text-success">
                                    <i class="bi bi-pencil-square me-2"></i>Éditer
                                </button>
                            </li>
                            <li>
                                <a @click="modal_delete.display = true" role="button"
                                    class="btn btn-sm dropdown-item text-danger">
                                    <i class="bi bi-trash me-2"></i>Supprimer
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="border-2 border-bottom mx-auto pb-2" style="border-color: #CAC4D0 !important; width: 95%">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';

import { purple } from '@/utils/colors';

export default {
    name: "CardDatabaseComponent",

    components: {
        'Modal': VueModal
    },

    data: () => ({
        port: 0,

        current_user: localStorage.getItem("uid"),
        role: localStorage.getItem("role"),

        modal_delete: {
            display: false,
            style: {
                borderRadius: '0.25rem',
                padding: '10px',
            }
        },

        purple
    }),

    props: {
        data: Object
    },

    mounted() {
        this.port = process.env.VUE_APP_SERVER_PORT;
        const tooltipTriggerList = [].slice.call(
            this.$el.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    },

    methods: {
        deleteDb() {
            this.modal_delete.display = false;
            axios.delete(`http://localhost:${this.port}/database/${this.data.id}`)
                .then(_ => {
                    this.$emit('getDatabases', {});
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
}
</script>