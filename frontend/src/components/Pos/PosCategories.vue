<template>
    <div class="w-full bg-white rounded-xl shadow-lg p-4 mb-4">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold">Danh mục</h2>
            <button @click="setCategory(0)"
                class="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
            </button>
        </div>
        <div class="flex flex-wrap gap-2">
            <button @click="setCategory(0)" class="px-4 py-2 rounded-lg whitespace-nowrap"
                :class="selectedCategory === 0 ? 'bg-indigo-100 text-indigo-700 font-medium' : 'bg-gray-100 hover:bg-gray-200'">
                Tất cả
            </button>
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

const { categories, setCategory, selectedCategory } = usePosStore()
</script>