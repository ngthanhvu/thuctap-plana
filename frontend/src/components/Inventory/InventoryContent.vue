<template>
    <div>
        <!-- Header Section -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Quản lý kho</h1>
                <p class="text-gray-600">Quản lý hàng tồn kho và mức tồn kho sản phẩm của bạn</p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
                <button @click="refreshData"
                    class="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                        </path>
                    </svg>
                    Tải lại
                </button>
                <router-link to="/inventory/import"
                    class="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Nhập/Xuất kho
                </router-link>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="productLoading || inventoryLoading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span class="ml-2 text-gray-600">Đang tải dữ liệu...</span>
        </div>

        <!-- Error State -->
        <div v-else-if="productError || inventoryError" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div class="flex">
                <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">Có lỗi xảy ra</h3>
                    <p class="text-sm text-red-700 mt-1">{{ productError || inventoryError }}</p>
                </div>
            </div>
        </div>

        <!-- Content -->
        <template v-else>
            <!-- Modern Search and Filter Section -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-3 mb-3">
                <div class="flex flex-col lg:flex-row gap-4">
                    <!-- Search Input with Icon -->
                    <div class="flex-1 relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input type="text" v-model="searchQuery" placeholder="Tìm kiếm sản phẩm..."
                            class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                    </div>

                    <!-- Filter Controls -->
                    <div class="flex flex-col sm:flex-row gap-3">
                        <select v-model="filterCategory"
                            class="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                            <option value="">Tất cả danh mục</option>
                            <option v-for="category in categories" :key="category.id" :value="category.name">
                                {{ category.name }}
                            </option>
                        </select>
                        <select v-model="filterStock"
                            class="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                            <option value="">Tất cả hàng</option>
                            <option value="in-stock">Còn hàng</option>
                            <option value="low-stock">Còn ít hàng</option>
                            <option value="out-of-stock">Hết hàng</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Inventory Table Component -->
            <InventoryTable :filtered-products="filteredProducts" @edit-product="editProduct"
                @adjust-stock="adjustStock" @delete-product="deleteProduct" />
        </template>

        <!-- Stock Adjustment Modal -->
        <div v-if="showStockModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <!-- Modal Header -->
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">Điều chỉnh tồn kho</h3>
                        <button @click="closeStockModal" class="text-gray-400 hover:text-gray-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12">
                                </path>
                            </svg>
                        </button>
                    </div>

                    <!-- Product Info -->
                    <div v-if="selectedProduct" class="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div class="flex items-center space-x-3">
                            <img :src="getImageUrl(selectedProduct.image)" :alt="selectedProduct.name"
                                class="w-12 h-12 rounded-lg object-cover border border-gray-200">
                            <div>
                                <h4 class="font-medium text-gray-900">{{ selectedProduct.name }}</h4>
                                <p class="text-sm text-gray-500">SKU: {{ selectedProduct.sku }}</p>
                                <p class="text-sm text-gray-600">Tồn kho hiện tại: <span class="font-semibold">{{
                                    selectedProduct.currentStock || 0 }}</span></p>
                            </div>
                        </div>
                    </div>

                    <!-- Stock Adjustment Form -->
                    <form @submit.prevent="submitStockAdjustment">
                        <!-- Movement Type -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Loại giao dịch</label>
                            <div class="flex space-x-4">
                                <label class="flex items-center">
                                    <input type="radio" v-model="movementType" value="import"
                                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                                    <span class="ml-2 text-sm text-gray-700">Nhập kho</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" v-model="movementType" value="export"
                                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                                    <span class="ml-2 text-sm text-gray-700">Xuất kho</span>
                                </label>
                            </div>
                        </div>

                        <!-- Quantity Input -->
                        <div class="mb-4">
                            <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">
                                Số lượng {{ movementType === 'import' ? 'nhập' : 'xuất' }}
                            </label>
                            <input type="number" id="quantity" v-model.number="stockQuantity" min="1"
                                :max="movementType === 'export' ? selectedProduct?.currentStock : undefined"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nhập số lượng" required>
                            <p v-if="movementType === 'export'" class="text-xs text-gray-500 mt-1">
                                Tối đa: {{ selectedProduct?.currentStock || 0 }}
                            </p>
                        </div>

                        <!-- Unit Price (for import) -->
                        <div v-if="movementType === 'import'" class="mb-4">
                            <label for="unitPrice" class="block text-sm font-medium text-gray-700 mb-2">
                                Giá nhập (VNĐ)
                            </label>
                            <input type="number" id="unitPrice" v-model.number="unitPrice" min="0" step="0.01"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nhập giá nhập" required>
                        </div>

                        <!-- Notes -->
                        <div class="mb-6">
                            <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
                                Ghi chú
                            </label>
                            <textarea id="notes" v-model="notes" rows="3"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nhập ghi chú (tùy chọn)"></textarea>
                        </div>

                        <!-- Preview -->
                        <div class="mb-6 p-4 bg-blue-50 rounded-lg">
                            <h5 class="font-medium text-blue-900 mb-2">Xem trước</h5>
                            <div class="text-sm text-blue-800">
                                <p>Tồn kho hiện tại: {{ selectedProduct?.currentStock || 0 }}</p>
                                <p>{{ movementType === 'import' ? 'Nhập' : 'Xuất' }}: {{ stockQuantity || 0 }}</p>
                                <p class="font-semibold">
                                    Tồn kho sau: {{ calculateNewStock() }}
                                </p>
                                <p v-if="movementType === 'import' && unitPrice">
                                    Tổng giá trị: {{ (stockQuantity * unitPrice).toLocaleString() }} VNĐ
                                </p>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex justify-end space-x-3">
                            <button type="button" @click="closeStockModal"
                                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
                                Hủy
                            </button>
                            <button type="submit" :disabled="!isFormValid || inventoryLoading" :class="[
                                'px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2',
                                movementType === 'import'
                                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                                    : 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
                                (!isFormValid || inventoryLoading) ? 'opacity-50 cursor-not-allowed' : ''
                            ]">
                                <span v-if="inventoryLoading" class="inline-flex items-center">
                                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none"
                                        viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    Đang xử lý...
                                </span>
                                <span v-else>
                                    {{ movementType === 'import' ? 'Nhập kho' : 'Xuất kho' }}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProduct } from '../../composables/useProduct'
import { useInventory } from '../../composables/useInventory'
import InventoryTable from './InventoryTable.vue'

// Composables
const { products, getProducts, error: productError, loading: productLoading } = useProduct()
const {
    inventories,
    getInventories,
    createStockMovement,
    error: inventoryError,
    loading: inventoryLoading
} = useInventory()

// State
const searchQuery = ref('')
const filterCategory = ref('')
const filterStock = ref('')
const showStockModal = ref(false)
const selectedProduct = ref(null)
const stockQuantity = ref(0)
const movementType = ref('import')
const unitPrice = ref(0)
const notes = ref('')
const categories = ref([])

// Computed
const filteredProducts = computed(() => {
    if (!products.value || !Array.isArray(products.value)) return []

    return products.value
        .map(product => {
            // Tìm inventory tương ứng
            const inventory = inventories.value.find(inv => inv.product_id === product.id)
            return {
                ...product,
                currentStock: inventory?.quantity || 0
            }
        })
        .filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchQuery.value.toLowerCase())
            const matchesCategory = !filterCategory.value ||
                (product.Category && product.Category.name === filterCategory.value)
            const matchesStock = !filterStock.value ||
                (filterStock.value === 'in-stock' && product.currentStock > 10) ||
                (filterStock.value === 'low-stock' && product.currentStock > 0 && product.currentStock <= 10) ||
                (filterStock.value === 'out-of-stock' && product.currentStock === 0)
            return matchesSearch && matchesCategory && matchesStock
        })
})

const isFormValid = computed(() => {
    if (!stockQuantity.value || stockQuantity.value <= 0) return false
    if (movementType.value === 'export' && stockQuantity.value > (selectedProduct.value?.currentStock || 0)) return false
    if (movementType.value === 'import' && (!unitPrice.value || unitPrice.value <= 0)) return false
    return true
})

// Methods
const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/40'
    if (imagePath.startsWith('http')) return imagePath
    return `${import.meta.env.VITE_API_URL}/${imagePath}`
}

const calculateNewStock = () => {
    const currentStock = selectedProduct.value?.currentStock || 0
    const quantity = stockQuantity.value || 0

    if (movementType.value === 'import') {
        return currentStock + quantity
    } else {
        return Math.max(0, currentStock - quantity)
    }
}

const refreshData = async () => {
    try {
        await Promise.all([
            getProducts(),
            getInventories()
        ])

        // Extract unique categories
        if (products.value) {
            const uniqueCategories = [...new Set(
                products.value
                    .filter(p => p.Category)
                    .map(p => ({ id: p.Category.id, name: p.Category.name }))
            )]
            categories.value = uniqueCategories
        }
    } catch (error) {
        console.error('Error refreshing data:', error)
    }
}

const editProduct = (product) => {
    // Navigate to edit product page
    window.location.href = `/products/edit/${product.id}`
}

const deleteProduct = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        try {
            // TODO: Implement delete product
            console.log('Delete product:', id)
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }
}

const adjustStock = (product) => {
    // Navigate to inventory form with product pre-selected
    window.location.href = `/inventory/form?product=${product.id}`
}

const closeStockModal = () => {
    showStockModal.value = false
    selectedProduct.value = null
    stockQuantity.value = 0
    movementType.value = 'import'
    unitPrice.value = 0
    notes.value = ''
}

const submitStockAdjustment = async () => {
    if (!isFormValid.value) return

    try {
        const stockMovementData = {
            type: movementType.value,
            notes: notes.value,
            items: [{
                product_id: selectedProduct.value.id,
                quantity: stockQuantity.value,
                unit_price: movementType.value === 'import' ? unitPrice.value : selectedProduct.value.price
            }]
        }

        await createStockMovement(stockMovementData)

        // Refresh data after successful operation
        await refreshData()

        closeStockModal()
    } catch (error) {
        console.error('Error adjusting stock:', error)
    }
}

// Lifecycle
onMounted(() => {
    refreshData()
})
</script>

<style scoped>
/* Add any custom styles here */
</style>