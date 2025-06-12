<template>
    <div class="min-h-screen bg-gray-50 flex">
        <PosSidebar class="fixed left-0 top-0 z-10" />
        <div class="flex-1 flex flex-col ml-64"> <!-- Thêm ml-64 để tạo khoảng cách bằng với chiều rộng của sidebar -->
            <PosTopHeader class="sticky top-0 z-10" />
            <div class="flex-1 p-6">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import PosSidebar from '../components/Pos/PosSidebar.vue'
import PosTopHeader from '../components/Pos/PosTopHeader.vue'
import { createPosStore } from '../composables/usePos'

const store = createPosStore()
</script>