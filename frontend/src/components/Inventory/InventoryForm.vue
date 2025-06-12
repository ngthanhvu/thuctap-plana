<template>
    <div class="max-w-4xl mx-auto p-6">
        <!-- Header -->
        <div class="mb-8">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Nhập kho sản phẩm</h1>
                    <p class="text-gray-600">Tạo phiếu nhập kho mới cho các sản phẩm</p>
                </div>
                <router-link to="/inventory/stock"
                    class="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Quay lại
                </router-link>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
            <form @submit.prevent="submitForm">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-xl font-semibold text-gray-900">Thông tin phiếu nhập</h2>
                </div>

                <div class="p-6 space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Loại giao dịch</label>
                            <div class="flex space-x-4">
                                <label class="flex items-center">
                                    <input type="radio" v-model="formData.type" value="import"
                                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                                    <span class="ml-2 text-sm text-gray-700">Nhập kho</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" v-model="formData.type" value="export"
                                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                                    <span class="ml-2 text-sm text-gray-700">Xuất kho</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
                            <input type="text" id="notes" v-model="formData.notes"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nhập ghi chú cho phiếu nhập/xuất">
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-medium text-gray-900">Danh sách sản phẩm</h3>
                            <button type="button" @click="addProductItem"
                                class="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4v16m8-8H4"></path>
                                </svg>
                                Thêm sản phẩm
                            </button>
                        </div>
                        <div class="space-y-4">
                            <div v-for="(item, index) in formData.items" :key="index"
                                class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <div class="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                                    <div class="md:col-span-2">
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Sản phẩm</label>
                                        <select v-model="item.product_id" @change="updateProductInfo(index)"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required>
                                            <option value="">Chọn sản phẩm</option>
                                            <option v-for="product in products" :key="product.id" :value="product.id">
                                                {{ product.name }} ({{ product.sku }})
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Số lượng</label>
                                        <input type="number" v-model.number="item.quantity" min="1"
                                            :max="formData.type === 'export' ? getProductStock(item.product_id) : undefined"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Số lượng" required>
                                        <p v-if="formData.type === 'export' && item.product_id"
                                            class="text-xs text-gray-500 mt-1">
                                            Tồn kho: {{ getProductStock(item.product_id) }}
                                        </p>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            {{ formData.type === 'import' ? 'Giá nhập' : 'Giá xuất' }} (VNĐ)
                                        </label>
                                        <input type="number" v-model.number="item.unit_price" min="0" step="0.01"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Giá" required>
                                    </div>
                                    <div>
                                        <button type="button" @click="removeProductItem(index)"
                                            class="w-full px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                            <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div v-if="item.product_id" class="mt-4 p-3 bg-white rounded border">
                                    <div class="flex items-center space-x-3">
                                        <img :src="getImageUrl(getProductById(item.product_id)?.image)"
                                            :alt="getProductById(item.product_id)?.name"
                                            class="w-12 h-12 rounded-lg object-cover border border-gray-200">
                                        <div class="flex-1">
                                            <h4 class="font-medium text-gray-900">{{
                                                getProductById(item.product_id)?.name }}</h4>
                                            <p class="text-sm text-gray-500">SKU: {{
                                                getProductById(item.product_id)?.sku }}</p>
                                            <p class="text-sm text-gray-600">Giá bán: {{
                                                formatCurrency(getProductById(item.product_id)?.price) }}</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-sm text-gray-600">Thành tiền</p>
                                            <p class="font-semibold text-lg">{{ formatCurrency(item.quantity *
                                                item.unit_price) }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="formData.items.length === 0" class="text-center py-8">
                            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                            <h3 class="mt-2 text-sm font-medium text-gray-900">Chưa có sản phẩm nào</h3>
                            <p class="mt-1 text-sm text-gray-500">Bắt đầu bằng cách thêm sản phẩm vào phiếu nhập/xuất
                            </p>
                            <div class="mt-6">
                                <button type="button" @click="addProductItem"
                                    class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    Thêm sản phẩm đầu tiên
                                </button>
                            </div>
                        </div>
                    </div>

                    <div v-if="formData.items.length > 0" class="bg-blue-50 rounded-lg p-6">
                        <h3 class="text-lg font-medium text-blue-900 mb-4">Tổng kết phiếu {{ formData.type === 'import'
                            ? 'nhập' : 'xuất' }}</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="text-center">
                                <p class="text-sm text-blue-600">Tổng số sản phẩm</p>
                                <p class="text-2xl font-bold text-blue-900">{{ formData.items.length }}</p>
                            </div>
                            <div class="text-center">
                                <p class="text-sm text-blue-600">Tổng số lượng</p>
                                <p class="text-2xl font-bold text-blue-900">{{ totalQuantity }}</p>
                            </div>
                            <div class="text-center">
                                <p class="text-sm text-blue-600">Tổng giá trị</p>
                                <p class="text-2xl font-bold text-blue-900">{{ formatCurrency(totalValue) }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                    <div class="flex justify-end space-x-3">
                        <router-link to="/inventory/stock"
                            class="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            Hủy
                        </router-link>
                        <button type="submit" :disabled="!isFormValid || loading" :class="[
                            'px-6 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2',
                            formData.type === 'import'
                                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                                : 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
                            (!isFormValid || loading) ? 'opacity-50 cursor-not-allowed' : ''
                        ]">
                            <span v-if="loading" class="inline-flex items-center">
                                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                Đang xử lý...
                            </span>
                            <span v-else>
                                {{ formData.type === 'import' ? 'Tạo phiếu nhập' : 'Tạo phiếu xuất' }}
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProduct } from '../../composables/useProduct'
import { useInventory } from '../../composables/useInventory'

const router = useRouter()

const { products, getProducts, error: productError, loading: productLoading } = useProduct()
const {
    inventories,
    getInventories,
    createStockMovement,
    error: inventoryError,
    loading: inventoryLoading
} = useInventory()

const loading = computed(() => productLoading.value || inventoryLoading.value)
const formData = ref({
    type: 'import',
    notes: '',
    items: []
})

const isFormValid = computed(() => {
    if (formData.value.items.length === 0) return false

    return formData.value.items.every(item => {
        if (!item.product_id || !item.quantity || item.quantity <= 0 || !item.unit_price || item.unit_price <= 0) {
            return false
        }

        if (formData.value.type === 'export') {
            const stock = getProductStock(item.product_id)
            if (item.quantity > stock) return false
        }

        return true
    })
})

const totalQuantity = computed(() => {
    return formData.value.items.reduce((sum, item) => sum + (item.quantity || 0), 0)
})

const totalValue = computed(() => {
    return formData.value.items.reduce((sum, item) => sum + ((item.quantity || 0) * (item.unit_price || 0)), 0)
})

const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/40'
    if (imagePath.startsWith('http')) return imagePath
    return `${import.meta.env.VITE_API_URL}/${imagePath}`
}

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount || 0)
}

const getProductById = (productId) => {
    return products.value?.find(p => p.id === productId)
}

const getProductStock = (productId) => {
    const inventory = inventories.value?.find(inv => inv.product_id === productId)
    return inventory?.quantity || 0
}

const addProductItem = () => {
    formData.value.items.push({
        product_id: '',
        quantity: 1,
        unit_price: 0
    })
}

const removeProductItem = (index) => {
    formData.value.items.splice(index, 1)
}

const updateProductInfo = (index) => {
    const item = formData.value.items[index]
    const product = getProductById(item.product_id)

    if (product) {
        if (formData.value.type === 'export') {
            item.unit_price = product.price
        } else {
            item.unit_price = product.cost || product.price
        }
    }
}

const submitForm = async () => {
    if (!isFormValid.value) return

    try {
        await createStockMovement(formData.value)
        router.push('/inventory/stock')
    } catch (error) {
        console.error('Error creating stock movement:', error)
        alert('Có lỗi xảy ra khi tạo phiếu. Vui lòng thử lại!')
    }
}

const loadData = async () => {
    try {
        await Promise.all([
            getProducts(),
            getInventories()
        ])
    } catch (error) {
        console.error('Error loading data:', error)
    }
}

onMounted(() => {
    loadData()
    addProductItem()
})
</script>

<style scoped>
/* Custom styles if needed */
</style>