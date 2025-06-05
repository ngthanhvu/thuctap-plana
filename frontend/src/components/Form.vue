<template>
    <div class="max-w-2xl mx-auto p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Thêm Sản Phẩm Mới</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Tên sản phẩm -->
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                <input type="text" id="name" v-model="formData.name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên sản phẩm" required>
            </div>

            <!-- Giá sản phẩm -->
            <div>
                <label for="price" class="block text-sm font-medium text-gray-700 mb-1">Giá</label>
                <div class="relative">
                    <span class="absolute left-3 top-2 text-gray-500">₫</span>
                    <input type="number" id="price" v-model="formData.price"
                        class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0" required>
                </div>
            </div>

            <!-- Mô tả -->
            <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea id="description" v-model="formData.description" rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập mô tả sản phẩm"></textarea>
            </div>

            <!-- Danh mục -->
            <div>
                <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                <select id="category" v-model="formData.category"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Chọn danh mục</option>
                    <option value="electronics">Điện tử</option>
                    <option value="clothing">Quần áo</option>
                    <option value="books">Sách</option>
                    <option value="other">Khác</option>
                </select>
            </div>

            <!-- Hình ảnh -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Hình ảnh sản phẩm</label>
                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                            viewBox="0 0 48 48">
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                            <label for="file-upload"
                                class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                <span>Tải ảnh lên</span>
                                <input id="file-upload" name="file-upload" type="file" class="sr-only"
                                    @change="handleFileUpload">
                            </label>
                            <p class="pl-1">hoặc kéo thả</p>
                        </div>
                        <p class="text-xs text-gray-500">PNG, JPG, GIF tối đa 10MB</p>
                    </div>
                </div>
            </div>

            <!-- Nút submit -->
            <div class="flex justify-end space-x-3">
                <button type="button" @click="resetForm"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Hủy
                </button>
                <button type="submit"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Thêm sản phẩm
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null
})

const handleSubmit = () => {
    // Xử lý submit form ở đây
    console.log('Form data:', formData.value)
}

const resetForm = () => {
    formData.value = {
        name: '',
        price: '',
        description: '',
        category: '',
        image: null
    }
}

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        formData.value.image = file
    }
}
</script>
