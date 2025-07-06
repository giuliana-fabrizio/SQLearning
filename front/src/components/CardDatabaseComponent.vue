<template>
    <div :style="{ background: purple.color_1 }">
        <div class="p-3 row">
            <div class="col-sm-3 col-md-2 col-lg-1 d-none d-sm-block">
                <!-- <img :src="'../../public/image/avatars'" alt="Image" class="w-100"> --> TODO
            </div>
            <div class="col-8 col-md-9 col-lg-10">
                <p class="fs-5 mb-1">{{ data.name }}</p>
                <p
                    class="mb-1"
                    style="color: #49454F">
                    {{ data.description.substring(0, 120) + "..." }}
                </p>
            </div>
            <div class="align-items-start col-4 col-sm-1 d-flex justify-content-end">
                <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="Nombre d'inscrits"
                    class="badge me-1 mt-1 ps-2 pe-2 rounded-circle"
                    :style="{ background: purple.color_8 }">
                    <span class="text-white" style="font-size: small;">{{ data.peoples }}</span>
                </div>
                <button class="btn p-0">
                    <i class="bi bi-three-dots-vertical icon"></i>
                </button>
            </div>
        </div>
        <div
            class="border-2 border-bottom mx-auto pb-2"
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
        const tooltipTriggerList = [].slice.call(
            this.$el.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}
</script>