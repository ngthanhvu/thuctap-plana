<template>
    <div class="min-h-screen">
        <PosHeader />
        <div class="mx-auto p-5 h-[calc(100vh-4rem)]">
            <div class="flex flex-col lg:flex-row gap-4 h-full">
                <PosCategories />
                <PosProducts />
                <PosBill />
            </div>
        </div>
    </div>
</template>

<script setup>
import PosHeader from './PosHeader.vue'
import PosCategories from './PosCategories.vue'
import PosProducts from './PosProducts.vue'
import PosBill from './PosBill.vue'
import { createPosStore } from '../../composables/usePos'

// Khởi tạo store
createPosStore()
</script>

<style></style>