<template>
    <div>
        <img
            alt="background"
            src="../assets/background.png"
            class="img-fluid position-fixed w-100 img-create-an-account">
        <ProfileComponent />
    </div>
</template>

<script>
import ProfileComponent from '@/components/ProfileComponent.vue';

export default {
    name: 'CreateAnAccountView',
    components: {
        ProfileComponent
    }
}
</script>