<template>
    <div class="w-full bg-white rounded-xl shadow-lg p-4 mb-4">
        <h2 class="text-lg font-bold mb-4">Danh mục</h2>
        <div class="flex flex-wrap gap-2">
            <button v-for="category in categories" :key="category.id" @click="setCategory(category.id)"
                class="px-4 py-2 rounded-lg whitespace-nowrap"
                :class="category.active ? 'bg-indigo-100 text-indigo-700 font-medium' : 'bg-gray-100 hover:bg-gray-200'">
                {{ category.name }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { usePosStore } from '../../composables/usePos'

const { categories, setCategory } = usePosStore()
</script>