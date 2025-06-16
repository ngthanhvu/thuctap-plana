<template>
    <li>
        <div class="relative">
            <button @click="toggleMenu"
                class="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#EBF3FE] group transition duration-150"
                :class="[isActive ? 'bg-[#EBF3FE] text-[#1B67FE] border' : 'text-[#636C7C]']">
                <div class="flex items-center">
                    <Boxes class="h-5 w-5" :class="[isActive ? 'text-[#1B67FE]' : '']" />
                    <span class="ml-3">Sản phẩm</span>
                </div>
                <ChevronDown :class="[{ 'rotate-180': isMenuOpen }, isActive ? 'text-[#1B67FE]' : '']"
                    class="h-4 w-4 transition-transform" />
            </button>
            <div v-show="isMenuOpen" class="mt-2 ml-4 space-y-2">
                <router-link to="/products/list"
                    class="flex items-center p-2 rounded-lg hover:bg-[#EBF3FE] transition-colors duration-150"
                    :class="[$route.path === '/products/list' ? 'bg-[#EBF3FE] text-[#1B67FE] border' : 'text-[#636C7C]']">
                    <span class="ml-3">Danh sách sản phẩm</span>
                </router-link>
                <router-link to="/products/categories"
                    class="flex items-center p-2 rounded-lg hover:bg-[#EBF3FE] transition-colors duration-150"
                    :class="[$route.path === '/products/categories' ? 'bg-[#EBF3FE] text-[#1B67FE] border' : 'text-[#636C7C]']">
                    <span class="ml-3">Danh mục</span>
                </router-link>
                <router-link to="/products/brands"
                    class="flex items-center p-2 rounded-lg hover:bg-[#EBF3FE] transition-colors duration-150"
                    :class="[$route.path === '/products/brands' ? 'bg-[#EBF3FE] text-[#1B67FE] border' : 'text-[#636C7C]']">
                    <span class="ml-3">Thương hiệu </span>
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