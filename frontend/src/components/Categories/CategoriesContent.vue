<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <!-- <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-xl font-semibold text-gray-900">Danh sách danh mục</h1>
                <p class="mt-2 text-sm text-gray-700">Danh sách tất cả danh mục trong hệ thống</p>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <router-link to="categories/create"
                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto">
                    Thêm danh mục
                </router-link>
            </div>
        </div> -->

        <!-- Search and Filter -->
        <!-- <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <div class="relative">
                    <input type="text"
                        class="block w-[500px] rounded-md border-gray-300 pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-3"
                        placeholder="Tìm kiếm...">
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <select
                    class="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-3">
                    <option value="">Tất cả danh mục</option>
                    <option value="electronics">Điện tử</option>
                    <option value="clothing">Quần áo</option>
                    <option value="books">Sách</option>
                </select>
            </div>
        </div> -->

        <!-- Table Component -->
        <CategoriesTable :products="products" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoriesTable from './CategoriesTable.vue'

// Sample data
const products = ref([
    {
        id: 1,
        name: 'iPhone 13 Pro',
        description: 'Apple iPhone 13 Pro 256GB',
        category: 'Điện tử',
        price: 27990000,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1632661674596-79bd3e16c2bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80'
    },
    {
        id: 2,
        name: 'MacBook Pro M1',
        description: 'Apple MacBook Pro 13" M1',
        category: 'Điện tử',
        price: 32990000,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80'
    },
    {
        id: 3,
        name: 'AirPods Pro',
        description: 'Apple AirPods Pro',
        category: 'Điện tử',
        price: 5990000,
        status: 'inactive',
        image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80'
    }
])
</script>
