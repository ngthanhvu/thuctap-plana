<template>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Quản lý sản phẩm</h1>
            <p class="text-gray-600">Quản lý hàng tồn kho và thông tin chi tiết về sản phẩm của bạn</p>
        </div>
        <router-link to="/products/create"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Thêm sản phẩm mới
        </router-link>
    </div>

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
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-200 focus:border-gray-200 transition-colors duration-200">
            </div>
            <!-- Category Filter -->
            <div class="w-full lg:w-64">
                <select v-model="categoryFilter"
                    class="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 rounded-lg leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-200 transition-colors duration-200">
                    <option value="">Tất cả danh mục</option>
                    <option v-for="category in uniqueCategories" :key="category" :value="category">{{ category }}
                    </option>
                </select>
            </div>
        </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-2 text-gray-600">Đang tải dữ liệu...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-white rounded-xl shadow-sm border border-red-200 p-8 text-center">
        <div class="text-red-600 mb-2">
            <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        </div>
        <p class="text-red-600">{{ error }}</p>
        <button @click="loadProducts" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Thử lại
        </button>
    </div>

    <!-- Modern Table Container -->
    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                        <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            #
                        </th>
                        <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Sản phẩm
                        </th>
                        <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            SKU
                        </th>
                        <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Mã vạch
                        </th>
                        <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Giá bán
                        </th>
                        <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Giá vốn
                        </th>
                        <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Danh mục
                        </th>
                        <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Thương hiệu
                        </th>
                        <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Trạng thái
                        </th>
                        <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 text-center">
                    <tr v-if="filteredProducts.length === 0">
                        <td colspan="9" class="px-6 py-8 text-center text-gray-500">
                            Không có sản phẩm nào
                        </td>
                    </tr>
                    <tr v-for="(product, index) in filteredProducts" :key="product.id"
                        class="hover:bg-gray-50 transition-colors duration-150">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 font-semibold">#{{ index + 1 }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center gap-3">
                                <div class="h-10 w-10 flex-shrink-0">
                                    <img class="h-10 w-10 rounded-lg object-cover border border-gray-200"
                                        :src="product.image_url || '/placeholder-image.png'" :alt="product.name"
                                        @error="handleImageError">
                                </div>
                                <div>
                                    <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                                    <div class="text-sm text-gray-500">{{ product.description }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ product.sku }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                                <Barcode :value="product.barcode" :id="product.id" />
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ formatPrice(product.price) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">{{ formatPrice(product.cost) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ getCategoryName(product.category_id) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ getBrandName(product.brand_id) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="[
                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                product.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                            ]">
                                <span :class="[
                                    'w-1.5 h-1.5 mr-1.5 rounded-full',
                                    product.status === 'active'
                                        ? 'bg-green-400'
                                        : 'bg-yellow-400'
                                ]"></span>
                                {{ product.status === 'active' ? 'Hoạt động' : 'Không hoạt động' }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div class="flex items-center space-x-3">
                                <button @click="editProduct(product)"
                                    class="inline-flex items-center p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                                    title="Chỉnh sửa sản phẩm">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                        </path>
                                    </svg>
                                </button>
                                <button @click="confirmDeleteProduct(product.id)"
                                    class="inline-flex items-center p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors duration-150"
                                    title="Xóa sản phẩm">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useProduct } from '../../composables/useProduct'
import { useRouter } from 'vue-router'
import Barcode from './Barcode.vue'
import { useBrand } from '../../composables/useBrand'
import { useCategory } from '../../composables/useCategory'
import Swal from 'sweetalert2'

const router = useRouter()
const { products, getProducts, deleteProduct, loading, error } = useProduct()
const { brands, getBrands } = useBrand()
const { categories, getCategories } = useCategory()

const searchQuery = ref('')
const categoryFilter = ref('')

const uniqueCategories = computed(() => {
    const categories = products.value.map(product => product.category_name || 'Chưa phân loại')
    return [...new Set(categories)]
})

const filteredProducts = computed(() => {
    let filtered = products.value

    if (searchQuery.value) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            product.barcode.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    }

    if (categoryFilter.value) {
        filtered = filtered.filter(product =>
            (product.category_name || 'Chưa phân loại') === categoryFilter.value
        )
    }

    return filtered
})

const loadProducts = async () => {
    try {
        await getProducts()
    } catch (err) {
        console.error('Error loading products:', err)
    }
}

const editProduct = (product) => {
    router.push(`/products/edit/${product.id}`)
}

const confirmDeleteProduct = async (productId) => {
    const result = await Swal.fire({
        title: 'Xoá sản phẩm?',
        text: 'Hành động này không thể hoàn tác!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Xoá',
        cancelButtonText: 'Huỷ'
    })

    if (result.isConfirmed) {
        try {
            await deleteProduct(productId)
            await loadProducts()
            Swal.fire('Đã xoá!', 'Sản phẩm đã được xoá thành công.', 'success')
        } catch (err) {
            console.error('Error deleting product:', err)
            Swal.fire('Lỗi', 'Không thể xoá sản phẩm.', 'error')
        }
    }
}

const handleImageError = (event) => {
    if (!event.target.src.includes('/placeholder-image.png')) {
        event.target.src = '/placeholder-image.png'
    }
}

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(parseFloat(price))
}

const getBrandName = (id) => {
    const brand = brands.value.find(b => b.id === id)
    return brand ? brand.name : 'Chưa có thương hiệu'
}

const getCategoryName = (id) => {
    const category = categories.value.find(c => c.id === id)
    return category ? category.name : 'Chưa phân loại'
}

onMounted(() => {
    loadProducts()
    getBrands()
    getCategories()
})
</script>

<style scoped>
/* Custom Scrollbar */
.scrollbar-thin::-webkit-scrollbar {
    height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

/* Theme shadows */
.shadow-theme-xs {
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

/* Focus ring styles */
.focus\:ring-3:focus {
    box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
}

.focus\:outline-hidden:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
}

/* Barcode styles */
.barcode {
    max-width: 100%;
    height: auto;
}
</style>
