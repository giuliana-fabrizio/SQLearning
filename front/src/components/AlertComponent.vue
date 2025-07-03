<template>
    <div v-if="show" class="alert alert-dismissible fade show" :class="alert_type" role="alert">
        {{ message }}
        <button @click="$emit('close')" type="button" class="btn-close"></button>
    </div>
</template>

<script>
export default {
    name: "AlertComponent",

    props: {
        alert_type: String,
        message: String,
        hide: Boolean,
        show: Boolean,
    }
}
</script>