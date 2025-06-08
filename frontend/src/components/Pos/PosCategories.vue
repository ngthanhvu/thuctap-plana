<template>
    <div class="lg:w-1/6 bg-white rounded-xl shadow-lg p-4 h-full overflow-y-auto">
        <h2 class="text-lg font-bold mb-4">Danh mục</h2>
        <div class="space-y-2">
            <button v-for="category in categories" :key="category.id" @click="setCategory(category.id)"
                class="w-full text-left px-3 py-2 rounded"
                :class="category.active ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'">
                {{ category.name }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { usePosStore } from '../../composables/usePos'

const { categories, setCategory } = usePosStore()
</script>