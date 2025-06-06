<template>
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
        <h2 class="text-2xl font-semibold mb-4">Thêm sản phẩm mới</h2>

        <!-- Thông tin chính -->
        <div class="space-y-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                <input v-model="form.name" type="text"
                    placeholder="Nhập tên sản phẩm"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Thương hiệu</label>
                    <select v-model="form.brand_id"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        <option disabled selected>-- Chọn thương hiệu --</option>
                        <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                    <select v-model="form.category_id"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        <option disabled selected>-- Chọn danh mục --</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name
                            }}</option>
                    </select>
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea v-model="form.description" rows="3"
                    placeholder="Nhập mô tả sản phẩm"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"></textarea>
            </div>

            <!-- Ảnh sản phẩm -->
            <div class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ảnh chính</label>
                    <div
                        class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div class="space-y-1 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                                viewBox="0 0 48 48" aria-hidden="true">
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div class="flex text-sm text-gray-600 justify-center">
                                <label for="main-image"
                                    class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>Tải ảnh lên</span>
                                    <input id="main-image" type="file" class="sr-only" @change="handleMainImage">
                                </label>
                                <p class="pl-1">hoặc kéo thả</p>
                            </div>
                            <p class="text-xs text-gray-500">PNG, JPG, GIF tối đa 10MB</p>
                        </div>
                    </div>
                    <div v-if="form.mainImage" class="mt-2">
                        <img :src="URL.createObjectURL(form.mainImage)" alt="Preview"
                            class="h-32 w-32 object-cover rounded-lg">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ảnh phụ</label>
                    <div
                        class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div class="space-y-1 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                                viewBox="0 0 48 48" aria-hidden="true">
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div class="flex text-sm text-gray-600 justify-center">
                                <label for="sub-images"
                                    class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>Tải ảnh lên</span>
                                    <input id="sub-images" type="file" multiple class="sr-only"
                                        @change="handleSubImages">
                                </label>
                                <p class="pl-1">hoặc kéo thả</p>
                            </div>
                            <p class="text-xs text-gray-500">PNG, JPG, GIF tối đa 10MB</p>
                        </div>
                    </div>
                    <div v-if="form.subImages.length > 0" class="mt-2 grid grid-cols-4 gap-4">
                        <div v-for="(image, index) in form.subImages" :key="index" class="relative">
                            <img :src="URL.createObjectURL(image)" alt="Preview"
                                class="h-24 w-24 object-cover rounded-lg">
                            <button @click="removeSubImage(index)"
                                class="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200">
                                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Biến thể sản phẩm -->
            <div class="mt-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-medium text-gray-900">Biến thể sản phẩm</h3>
                    <button @click="addVariant" type="button"
                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg class="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clip-rule="evenodd" />
                        </svg>
                        Thêm biến thể
                    </button>
                </div>

                <div class="space-y-4">
                    <div v-for="(variant, index) in form.variants" :key="index"
                        class="relative p-4 bg-gray-50 rounded-lg">
                        <button @click="removeVariant(index)"
                            class="absolute top-2 right-2 text-gray-400 hover:text-gray-500">
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                        <div class="grid grid-cols-6 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                                <input v-model="variant.sku" type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Màu</label>
                                <input v-model="variant.color" type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Size</label>
                                <input v-model="variant.size" type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Giá bán</label>
                                <input v-model="variant.price" type="number"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Giá vốn</label>
                                <input v-model="variant.cost" type="number"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                                <input v-model="variant.barcode" type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Submit -->
            <div class="mt-6 flex justify-end space-x-3">
                <button type="button"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Hủy</button>
                <button @click="submitForm" type="submit"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Lưu
                    sản phẩm</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
    name: '',
    description: '',
    brand_id: '',
    category_id: '',
    status: 'active',
    variants: [],
    mainImage: null,
    subImages: []
})

const brands = ref([
    { id: 1, name: 'Nike' },
    { id: 2, name: 'Adidas' }
    // Load từ API thực tế
])

const categories = ref([
    { id: 1, name: 'Áo thun' },
    { id: 2, name: 'Quần jeans' }
    // Load từ API thực tế
])

const addVariant = () => {
    form.value.variants.push({ sku: '', color: '', size: '', price: '', cost: '', barcode: '' })
}

const removeVariant = (index) => {
    form.value.variants.splice(index, 1)
}

const handleMainImage = (e) => {
    form.value.mainImage = e.target.files[0]
}

const handleSubImages = (e) => {
    const files = Array.from(e.target.files)
    form.value.subImages.push(...files)
}

const removeSubImage = (index) => {
    form.value.subImages.splice(index, 1)
}

const submitForm = () => {
    const payload = new FormData()
    payload.append('name', form.value.name)
    payload.append('description', form.value.description)
    payload.append('brand_id', form.value.brand_id)
    payload.append('category_id', form.value.category_id)
    payload.append('status', form.value.status)
    payload.append('main_image', form.value.mainImage)
    form.value.subImages.forEach((img, i) => {
        payload.append(`sub_images[${i}]`, img)
    })
    payload.append('variants', JSON.stringify(form.value.variants))

    // Gửi API
    console.log('Form data:', payload)
}
</script>