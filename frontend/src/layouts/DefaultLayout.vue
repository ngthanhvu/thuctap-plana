<template>
    <div class="flex h-screen bg-gray-100">
        <Sidebar />
        <div class="flex-1 flex flex-col md:ml-64">
            <Navbar />
            <!-- Main content -->
            <div class="flex-1 p-6 bg-gray-50 mt-16">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import Sidebar from '../components/Layout/Sidebar.vue'
import Navbar from '../components/Layout/Navbar.vue'

import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isProductsMenuOpen = ref(false)
const isInventoryMenuOpen = ref(false)

const isProductsActive = computed(() => {
    return route.path.startsWith('/products')
})

const isInventoryActive = computed(() => {
    return route.path.startsWith('/inventory')
})

const toggleProductsMenu = () => {
    isProductsMenuOpen.value = !isProductsMenuOpen.value
}

const toggleInventoryMenu = () => {
    isInventoryMenuOpen.value = !isInventoryMenuOpen.value
}
</script>

<style scoped>
/* Remove the router-link-active style since we're using dynamic classes */
</style>