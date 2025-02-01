<template>
    <div :style="{ background: purple.color_1 }">
        <div class="p-3 row">
            <img src="" alt="Image" class="col-1">
            <div class="col-10">
                <p class="fs-5 mb-1">{{ data.title }}</p>
                <p
                    class="mb-1 text-break"
                    style="color: #49454F">
                    {{ data.description }}
                </p>
            </div>
            <div class="align-items-start col-1 d-flex justify-content-end">
                <div
                    data-bs-toggle="tooltip"
                    data-bs-title="Nombre de personnes inscrites"
                    class="badge me-1 mt-1 ps-2 pe-2 rounded-circle"
                    :style="{ background: purple.color_8 }">
                    <span class="text-white">{{ data.peoples }}</span>
                </div>
                <button class="btn p-0">
                    <i class="bi bi-three-dots-vertical icon"></i>
                </button>
            </div>
        </div>
        <div
            class="border-2 border-bottom mx-auto pb-1"
            style="border-color: #CAC4D0 !important; width: 95%">
        </div>
    </div>
</template>

<script>
import { purple } from '@/utils/colors';

export default {
    name: "CardDatabaseComponent",

    data: () => ({
        purple
    }),

    props: {
        data: Object
    },

    mounted() {
        const tooltipTriggerList = [].slice.call(this.$el.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}
</script>