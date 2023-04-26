<script setup>
import { reactive, computed, onMounted } from "vue";
import {
    mdiHandWaveOutline,
    mdiMenu,
    mdiMoonWaningCrescent,
    mdiWhiteBalanceSunny,
    mdiAccountCircle,
    mdiLoginVariant,
} from "@mdi/js";
import { useInterfaceStore } from "@/stores/interface";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

const ui = useInterfaceStore();
const state = reactive({
    wWidth: 0,
    expandNav: true,
});

onMounted(() => {
    state.vWidth = window.innerWidth;
    window.addEventListener("resize", () => {
        vWidth.value = window.innerWidth;
    });
});
</script>

<template>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div
            class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <router-link to="/" class="flex items-center">
                <img src="@/assets/img/logo.png" class="h-8 mr-3" alt="Logo" />
                <span
                    class="hidden md:inline-block self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                    >Colby Cooper</span
                >
            </router-link>
            <div class="flex md:order-2">
                <button
                    type="button"
                    class="inline-flex items-center gap-2.5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                    <svg-icon
                        :path="mdiHandWaveOutline"
                        type="mdi"
                        class="w-5 h-5" />
                    Get in touch
                </button>
                <button
                    type="button"
                    class="hidden md:inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 ml-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Client Login
                </button>
                <button
                    data-collapse-toggle="navbar-cta"
                    type="button"
                    class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-cta"
                    aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg-icon :path="mdiMenu" type="mdi" class="w-6 h-6" />
                </button>
            </div>
            <div
                class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                id="navbar-cta">
                <ul
                    class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <a
                            href="#"
                            class="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded md:bg-transparent md:text-purple-700 md:p-0 md:dark:text-purple-500"
                            aria-current="page"
                            >Home</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >About</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >Services</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >Projects</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >Contact</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="block md:hidden py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                            Client Login
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
