<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <!-- <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-xl font-semibold text-gray-900">Danh sách thương hiệu</h1>
                <p class="mt-2 text-sm text-gray-700">Danh sách tất cả thương hiệu trong hệ thống</p>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <router-link to="brands/create"
                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto">
                    Thêm thương hiệu
                </router-link>
            </div>
        </div>

        Search and Filter -->
        <!-- <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <div class="relative">
                    <input type="text"
                        class="block w-[500px] rounded-md border-gray-300 pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-3"
                        placeholder="Tìm kiếm thương hiệu...">
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div> -->

        <!-- Table Component -->
        <BrandTable :brands="brands" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import BrandTable from './BrandTable.vue'

// Sample data
const brands = ref([
    {
        id: 1,
        name: 'Nike',
        logo: 'https://example.com/nike-logo.png'
    },
    {
        id: 2,
        name: 'Adidas',
        logo: 'https://example.com/adidas-logo.png'
    },
    {
        id: 3,
        name: 'Puma',
        logo: 'https://example.com/puma-logo.png'
    }
])
</script>

<style></style>