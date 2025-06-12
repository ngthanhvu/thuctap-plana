<template>
    <div class="min-h-screen bg-gray-50 flex">
        <PosSidebar />
        <div class="flex-1 flex flex-col">
            <PosTopHeader />
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