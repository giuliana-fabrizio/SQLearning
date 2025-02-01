<template>
    <div class="mt-5">
        <h4 class="title">{{ title }}</h4>
        <div
            class="border-2 border-bottom pb-1 w-25"
            style="border-color: #CAC4D0 !important;">
        </div>
    </div>
</template>

<script>
export default {
    name: 'TitleComponent',
    props: {
        title: String
    }
}
</script>
