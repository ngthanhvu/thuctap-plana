<template>
    <div class="p-6">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Inventory Management</h1>
            <div class="flex gap-4">
                <button @click="openAddProductModal"
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Add New Product
                </button>
                <button @click="openImportModal"
                    class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Import Products
                </button>
            </div>
        </div>

        <!-- Search and Filter Section -->
        <div class="mb-6 flex gap-4">
            <div class="flex-1">
                <input type="text" v-model="searchQuery" placeholder="Search products..."
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <select v-model="filterCategory"
                class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="food">Food</option>
            </select>
            <select v-model="filterStock"
                class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Stock</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
            </select>
        </div>

        <!-- Inventory Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="h-10 w-10 flex-shrink-0">
                                    <img class="h-10 w-10 rounded-md object-cover" :src="product.image" alt="">
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                                    <div class="text-sm text-gray-500">{{ product.description }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ product.category }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ product.sku }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${{ product.price.toFixed(2) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ product.stock }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="[
                                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                product.stock > 10 ? 'bg-green-100 text-green-800' :
                                    product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                            ]">
                                {{ product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock' }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button @click="editProduct(product)"
                                class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                            <button @click="adjustStock(product)"
                                class="text-green-600 hover:text-green-900 mr-3">Stock</button>
                            <button @click="deleteProduct(product.id)"
                                class="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add/Edit Product Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div class="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">
                        {{ isEditing ? 'Edit Product' : 'Add New Product' }}
                    </h3>
                    <form @submit.prevent="submitForm" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" v-model="formData.name"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">SKU</label>
                                <input type="text" v-model="formData.sku"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Description</label>
                            <textarea v-model="formData.description" rows="3"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                        </div>

                        <div class="grid grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Category</label>
                                <select v-model="formData.category"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    <option value="electronics">Electronics</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="food">Food</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Price</label>
                                <input type="number" v-model="formData.price" step="0.01"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Stock</label>
                                <input type="number" v-model="formData.stock" min="0"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Image URL</label>
                            <input type="text" v-model="formData.image"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>

                        <div class="flex justify-end space-x-3 mt-5">
                            <button type="button" @click="closeModal"
                                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                                Cancel
                            </button>
                            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                {{ isEditing ? 'Update' : 'Add' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Adjust Stock Modal -->
        <div v-if="showStockModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">
                        Adjust Stock
                    </h3>
                    <form @submit.prevent="submitStockAdjustment" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Current Stock</label>
                            <div class="mt-1 text-lg font-medium">{{ selectedProduct?.stock }}</div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Adjustment</label>
                            <input type="number" v-model="stockAdjustment"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <p class="mt-1 text-sm text-gray-500">Enter positive number to add stock, negative to remove
                            </p>
                        </div>
                        <div class="flex justify-end space-x-3 mt-5">
                            <button type="button" @click="closeStockModal"
                                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                                Cancel
                            </button>
                            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                Update Stock
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

// State
const searchQuery = ref('')
const filterCategory = ref('')
const filterStock = ref('')
const showModal = ref(false)
const showStockModal = ref(false)
const isEditing = ref(false)
const selectedProduct = ref<any>(null)
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

const editProduct = (product: any) => {
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

const deleteProduct = (id: number) => {
    // Implement delete logic here
    console.log('Delete product:', id)
}

const adjustStock = (product: any) => {
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