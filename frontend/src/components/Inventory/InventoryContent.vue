<template>
    <div>
        <!-- Header Section -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
                <p class="text-gray-600">Manage your product inventory and stock levels</p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
                <button @click="openAddProductModal"
                    class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Add New Product
                </button>
                <button @click="openImportModal"
                    class="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                    </svg>
                    Import Products
                </button>
            </div>
        </div>

        <!-- Modern Search and Filter Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div class="flex flex-col lg:flex-row gap-4">
                <!-- Search Input with Icon -->
                <div class="flex-1 relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input type="text" v-model="searchQuery" placeholder="Search products..."
                        class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                </div>

                <!-- Filter Controls -->
                <div class="flex flex-col sm:flex-row gap-3">
                    <select v-model="filterCategory"
                        class="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="food">Food</option>
                    </select>
                    <select v-model="filterStock"
                        class="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                        <option value="">All Stock</option>
                        <option value="in-stock">In Stock</option>
                        <option value="low-stock">Low Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Inventory Table Component -->
        <InventoryTable 
            :filtered-products="filteredProducts"
            @edit-product="editProduct"
            @adjust-stock="adjustStock"
            @delete-product="deleteProduct"
        />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import InventoryTable from './InventoryTable.vue'

// State
const searchQuery = ref('')
const filterCategory = ref('')
const filterStock = ref('')
const showModal = ref(false)
const showStockModal = ref(false)
const isEditing = ref(false)
const selectedProduct = ref(null)
const stockAdjustment = ref(0)

const formData = ref({
    name: '',
    description: '',
    sku: '',
    category: '',
    price: 0,
    stock: 0,
    image: ''
})

// Mock data - Replace with actual API calls
const products = ref([
    {
        id: 1,
        name: 'Product 1',
        description: 'Description for product 1',
        sku: 'SKU001',
        category: 'electronics',
        price: 99.99,
        stock: 15,
        image: 'https://via.placeholder.com/40'
    },
    // Add more mock data as needed
])

// Computed
const filteredProducts = computed(() => {
    return products.value.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesCategory = !filterCategory.value || product.category === filterCategory.value
        const matchesStock = !filterStock.value ||
            (filterStock.value === 'in-stock' && product.stock > 10) ||
            (filterStock.value === 'low-stock' && product.stock > 0 && product.stock <= 10) ||
            (filterStock.value === 'out-of-stock' && product.stock === 0)
        return matchesSearch && matchesCategory && matchesStock
    })
})

// Methods
const openAddProductModal = () => {
    isEditing.value = false
    formData.value = {
        name: '',
        description: '',
        sku: '',
        category: '',
        price: 0,
        stock: 0,
        image: ''
    }
    showModal.value = true
}

const editProduct = (product) => {
    isEditing.value = true
    formData.value = { ...product }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
}

const submitForm = () => {
    // Implement form submission logic here
    console.log('Form submitted:', formData.value)
    closeModal()
}

const deleteProduct = (id) => {
    // Implement delete logic here
    console.log('Delete product:', id)
}

const adjustStock = (product) => {
    selectedProduct.value = product
    stockAdjustment.value = 0
    showStockModal.value = true
}

const closeStockModal = () => {
    showStockModal.value = false
    selectedProduct.value = null
    stockAdjustment.value = 0
}

const submitStockAdjustment = () => {
    // Implement stock adjustment logic here
    console.log('Stock adjustment:', {
        productId: selectedProduct.value.id,
        adjustment: stockAdjustment.value
    })
    closeStockModal()
}

const openImportModal = () => {
    // Implement import modal logic here
    console.log('Open import modal')
}
</script>

<style scoped>
/* Add any custom styles here */
</style>