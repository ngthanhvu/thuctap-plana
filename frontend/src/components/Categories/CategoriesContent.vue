<template>
    <CategoriesTable :products="products" />
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
