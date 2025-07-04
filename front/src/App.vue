<template>
    <div id="app">
        <NavbarComponent />
        <router-view />
    </div>
</template>

<script setup lang="ts">
import NavbarComponent from './components/NavbarComponent.vue';
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>