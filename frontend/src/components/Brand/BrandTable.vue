<template>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Quản lý thương hiệu</h1>
            <p class="text-gray-600">Quản lý cơ sở dữ liệu thương hiệu và các mối quan hệ của bạn</p>
        </div>
        <router-link to="brands/create"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Thêm thương hiệu mới
        </router-link>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-3 mb-3">
        <div class="flex flex-col lg:flex-row gap-4">
            <div class="flex-1 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input type="text" v-model="searchQuery" placeholder="Tìm kiếm thương hiệu..."
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
            </div>
        </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            #
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Tên thương hiệu
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Logo
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="brand in filteredBrands" :key="brand.id"
                        class="hover:bg-gray-50 transition-colors duration-150">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="text-sm font-medium text-gray-900">#{{ brand.id }}</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ brand.name }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <img v-if="brand.image_url" :src="brand.image_url" :alt="brand.name"
                                    class="w-10 h-10 rounded-lg object-cover border border-gray-200">
                                <div v-else class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                    <span class="text-sm text-gray-500">No logo</span>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div class="flex items-center space-x-3">
                                <button @click="editBrand(brand)"
                                    class="inline-flex items-center p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                                    title="Edit Brand">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                        </path>
                                    </svg>
                                </button>
                                <button @click="handleDelete(brand.id)"
                                    class="inline-flex items-center p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors duration-150"
                                    title="Delete Brand">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="filteredBrands.length === 0">
                        <td colspan="4" class="px-6 py-4 whitespace-nowrap">
                            <div class="flex justify-center text-center">
                                <span class="text-sm font-medium text-gray-500">Không có thương hiệu nào</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBrand } from '../../composables/useBrand'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const { getBrands, deleteBrand } = useBrand()
const router = useRouter()

const searchQuery = ref('')
const brands = ref([])

const filteredBrands = computed(() => {
    if (!searchQuery.value) return brands.value
    return brands.value.filter(brand =>
        brand.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const fetchBrands = async () => {
    try {
        const response = await getBrands()
        brands.value = response
    } catch (error) {
        console.error('Error fetching brands:', error)
    }
}

const editBrand = (brand) => {
    router.push(`/products/brands/edit/${brand.id}`)
}

const handleDelete = async (brandId) => {
    const result = await Swal.fire({
        title: 'Bạn có chắc muốn xoá?',
        text: 'Thao tác này không thể hoàn tác!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e3342f',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Xoá',
        cancelButtonText: 'Huỷ'
    })

    if (result.isConfirmed) {
        try {
            await deleteBrand(brandId)
            fetchBrands()
        } catch (error) {
            Swal.fire('Lỗi!', 'Không thể xoá thương hiệu.', 'error')
        }
    }
}

onMounted(() => {
    fetchBrands()
})
</script>

<style scoped>
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
</style>