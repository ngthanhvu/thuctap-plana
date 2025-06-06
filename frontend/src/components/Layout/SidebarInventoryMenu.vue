<template>
    <li>
        <div class="relative">
            <button @click="toggleMenu"
                class="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-700"
                :class="[isActive ? 'bg-gray-700' : '']">
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span class="ml-3">Kho & tồn kho</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform"
                    :class="{ 'rotate-180': isMenuOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div v-show="isMenuOpen" class="mt-2 ml-4 space-y-2">
                <router-link to="/inventory/stock" class="flex items-center p-2 rounded-lg hover:bg-gray-700"
                    :class="[$route.path === '/inventory/stock' ? 'bg-gray-700' : '']">
                    <span class="ml-3">Tồn kho</span>
                </router-link>
                <router-link to="/inventory/import" class="flex items-center p-2 rounded-lg hover:bg-gray-700"
                    :class="[$route.path === '/inventory/import' ? 'bg-gray-700' : '']">
                    <span class="ml-3">Nhập hàng</span>
                </router-link>
            </div>
        </div>
    </li>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)

const isActive = computed(() => {
    return route.path.startsWith('/inventory')
})

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}
</script>