<template>
    <div class="mt-5" style="max-width: max-content;">
        <h4 class="title text-start">{{ title }}</h4>
        <div class="border-2 border-bottom pb-1" style="border-color: #CAC4D0 !important;">
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
