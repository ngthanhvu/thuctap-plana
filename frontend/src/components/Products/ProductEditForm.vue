<template>
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
        <h2 class="text-2xl font-semibold mb-4">Sửa sản phẩm</h2>
        <div v-if="loadingProduct" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span class="ml-2 text-gray-600">Đang tải dữ liệu...</span>
        </div>
        <div v-else class="space-y-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                <input v-model="form.name" type="text" placeholder="Nhập tên sản phẩm"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Thương hiệu</label>
                    <select v-model="form.brand_id"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        <option value="" disabled>-- Chọn thương hiệu --</option>
                        <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                    <select v-model="form.category_id"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        <option value="" disabled>-- Chọn danh mục --</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name
                        }}</option>
                    </select>
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea v-model="form.description" rows="3" placeholder="Nhập mô tả sản phẩm"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                    <div class="flex gap-2">
                        <input v-model="form.sku" type="text" placeholder="Nhập mã SKU"
                            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                        <button type="button" @click="generateSKU"
                            class="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                            Random
                        </button>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                    <div class="flex gap-2">
                        <input v-model="form.barcode" type="text" placeholder="Nhập barcode"
                            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                        <button type="button" @click="generateBarcode"
                            class="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
                            Random
                        </button>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Giá bán</label>
                    <input v-model="form.price" type="number" step="0.01" placeholder="0.00"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Giá vốn</label>
                    <input v-model="form.cost" type="number" step="0.01" placeholder="0.00"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                    <select v-model="form.status"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        <option value="active">Hoạt động</option>
                        <option value="inactive">Không hoạt động</option>
                    </select>
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Ảnh sản phẩm</label>
                <div v-if="currentImageUrl && !form.image" class="mb-4">
                    <p class="text-sm text-gray-600 mb-2">Ảnh hiện tại:</p>
                    <div class="relative inline-block">
                        <img :src="currentImageUrl" alt="Current product image"
                            class="h-32 w-32 object-cover rounded-lg border">
                        <button type="button" @click="removeCurrentImage"
                            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
                            ×
                        </button>
                    </div>
                </div>
                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                            viewBox="0 0 48 48" aria-hidden="true">
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="flex text-sm text-gray-600 justify-center">
                            <label for="image"
                                class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>{{ currentImageUrl && !form.image ? 'Thay đổi ảnh' : 'Tải ảnh lên' }}</span>
                                <input id="image" name="image" type="file" class="sr-only" @change="handleImageUpload">
                            </label>
                            <p class="pl-1">hoặc kéo thả</p>
                        </div>
                        <p class="text-xs text-gray-500">PNG, JPG, GIF tối đa 5MB</p>
                    </div>
                </div>
                <div v-if="form.image" class="mt-2">
                    <p class="text-sm text-gray-600 mb-2">Ảnh mới:</p>
                    <div class="relative inline-block">
                        <img :src="imagePreview" alt="New image preview"
                            class="h-32 w-32 object-cover rounded-lg border">
                        <button type="button" @click="removeNewImage"
                            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
                            ×
                        </button>
                    </div>
                </div>
            </div>
            <div class="mt-6 flex justify-end space-x-3">
                <button type="button" @click="$router.go(-1)"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Hủy
                </button>
                <button @click="submitForm" type="submit" :disabled="loading"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                    {{ loading ? 'Đang cập nhật...' : 'Cập nhật sản phẩm' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProduct } from '../../composables/useProduct'
import { useCategory } from '../../composables/useCategory'
import { useBrand } from '../../composables/useBrand'
import Swal from 'sweetalert2';

const route = useRoute()
const router = useRouter()
const { getProductById, updateProduct, loading } = useProduct()
const { getCategories, categories } = useCategory()
const { getBrands, brands } = useBrand()

const loadingProduct = ref(true)
const currentImageUrl = ref(null)
const removeImage = ref(false)

const form = ref({
    name: '',
    description: '',
    brand_id: '',
    category_id: '',
    sku: '',
    barcode: '',
    price: '',
    cost: '',
    status: 'active',
    image: null
})

const imagePreview = computed(() => {
    return form.value.image ? URL.createObjectURL(form.value.image) : null
})

const generateSKU = () => {
    const randomNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    form.value.sku = `SKU-${randomNumber}`
}

const generateBarcode = () => {
    const randomBarcode = Math.floor(Math.random() * 10000000000000).toString().padStart(13, '0')
    form.value.barcode = randomBarcode
}

const loadBrands = async () => {
    try {
        await getBrands()
    } catch (error) {
        console.error('Error loading brands:', error)
    }
}

const loadCategories = async () => {
    try {
        await getCategories()
    } catch (error) {
        console.error('Error loading categories:', error)
    }
}

const loadProduct = async () => {
    try {
        loadingProduct.value = true
        const productId = route.params.id
        const product = await getProductById(productId)

        if (product) {
            form.value = {
                name: product.name || '',
                description: product.description || '',
                brand_id: product.brand_id || '',
                category_id: product.category_id || '',
                sku: product.sku || '',
                barcode: product.barcode || '',
                price: product.price || '',
                cost: product.cost || '',
                status: product.status || 'active',
                image: null
            }

            currentImageUrl.value = product.image_url
        }
    } catch (error) {
        console.error('Error loading product:', error)
        Swal.fire({ title: 'Không thể tải thông tin sản phẩm', icon: 'error', confirmButtonText: 'OK' })
        router.go(-1)
    } finally {
        loadingProduct.value = false
    }
}

const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
        form.value.image = file
        removeImage.value = false
    }
}

const removeCurrentImage = () => {
    currentImageUrl.value = null
    removeImage.value = true
}

const removeNewImage = () => {
    form.value.image = null
    const fileInput = document.getElementById('image')
    if (fileInput) {
        fileInput.value = ''
    }
}

const submitForm = async () => {
    try {
        const formData = new FormData()
        formData.append('name', form.value.name)
        formData.append('description', form.value.description)
        formData.append('brand_id', form.value.brand_id)
        formData.append('category_id', form.value.category_id)
        formData.append('sku', form.value.sku)
        formData.append('barcode', form.value.barcode)
        formData.append('price', form.value.price)
        formData.append('cost', form.value.cost)
        formData.append('status', form.value.status)

        if (form.value.image) {
            formData.append('image', form.value.image)
        } else if (removeImage.value) {
            formData.append('removeImage', 'true')
        }

        const productId = route.params.id
        await updateProduct(productId, formData)
    } catch (error) {
        console.error('Error submitting form:', error)
        alert('Có lỗi xảy ra khi cập nhật sản phẩm')
    }
}

onMounted(async () => {
    await Promise.all([
        loadBrands(),
        loadCategories(),
        loadProduct()
    ])
})
</script>

<style></style>