<template>
    <li>
        <div class="relative">
            <button @click="toggleMenu"
                class="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-700"
                :class="[isActive ? 'bg-gray-700' : '']">
                <div class="flex items-center">
                    <Boxes class="h-5 w-5" />
                    <span class="ml-3">Sản phẩm</span>
                </div>
                <ChevronDown :class="{ 'rotate-180': isMenuOpen }" class="h-4 w-4 transition-transform" />
            </button>
            <div v-show="isMenuOpen" class="mt-2 ml-4 space-y-2">
                <router-link to="/products/list" class="flex items-center p-2 rounded-lg hover:bg-gray-700"
                    :class="[$route.path === '/products/list' ? 'bg-gray-700' : '']">
                    <span class="ml-3">Danh sách sản phẩm</span>
                </router-link>
                <router-link to="/products/categories" class="flex items-center p-2 rounded-lg hover:bg-gray-700"
                    :class="[$route.path === '/products/categories' ? 'bg-gray-700' : '']">
                    <span class="ml-3">Danh mục sản phẩm</span>
                </router-link>
                <router-link to="/products/brands" class="flex items-center p-2 rounded-lg hover:bg-gray-700"
                    :class="[$route.path === '/products/brands' ? 'bg-gray-700' : '']">
                    <span class="ml-3">Thương hiệu sản phẩm</span>
                </router-link>
            </div>
        </div>
    </li>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Boxes, ChevronDown } from 'lucide-vue-next'

const route = useRoute()
const isMenuOpen = ref(false)

const isActive = computed(() => {
    return route.path.startsWith('/products')
})

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}
</script>