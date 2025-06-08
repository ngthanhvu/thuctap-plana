<template>
    <BrandTable :brands="brands" />
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