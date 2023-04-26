<script setup>
import { useInterfaceStore } from "@/stores/interface";
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import NavComponent from "./components/NavComponent.vue";

const ui = useInterfaceStore();

onMounted(() => {
    // init color theme
    if (
        localStorage.getItem("color-theme") === "dark" ||
        (!("color-theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        document.documentElement.classList.add("dark");
        ui.setTheme(true);
    } else {
        document.documentElement.classList.remove("dark");
        ui.setTheme(false);
    }
});
</script>

<template>
    <div
        class="min-h-screen  w-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300 ease-in-out">
        <NavComponent />
        <div
            class="flex-1 p-4 text-gray-800 dark:text-gray-100">
            <RouterView />
        </div>
    </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

body {
    font-family: "Inter", sans-serif;
}
</style>
