<template>
    <div class="min-h-screen bg-gray-50 flex">
        <PosSidebar v-if="showSidebar" />

        <div class="flex-1 flex flex-col">
            <PosTopHeader />
            <div class="flex-1 p-6">
                <div v-if="currentView === 'pos'" class="flex gap-6 h-full">
                    <div class="flex-1 flex flex-col gap-4">
                        <PosCategories />
                        <PosProducts />
                    </div>
                    <div class="w-96">
                        <PosBill />
                    </div>
                </div>
                <div v-else class="text-center py-20">
                    <h2 class="text-2xl font-bold text-gray-600">{{ currentView.toUpperCase() }}</h2>
                    <p class="text-gray-500 mt-2">Tính năng đang được phát triển</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import PosTopHeader from './PosTopHeader.vue'
import PosSidebar from './PosSidebar.vue'
import PosCategories from './PosCategories.vue'
import PosProducts from './PosProducts.vue'
import PosBill from './PosBill.vue'
import { createPosStore } from '../../composables/usePos'
import { ref } from 'vue'

const store = createPosStore()
const { currentView } = store

const showSidebar = ref(true)
</script>

<style></style>