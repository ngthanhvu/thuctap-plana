<template>
    <div class="max-w-2xl mx-auto p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Thêm Danh Mục Mới</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Tên danh mục -->
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Tên danh mục</label>
                <input type="text" id="name" v-model="formData.name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên danh mục" required>
            </div>

            <!-- Danh mục cha -->
            <div>
                <label for="parentCategory" class="block text-sm font-medium text-gray-700 mb-1">Danh mục cha</label>
                <select id="parentCategory" v-model="formData.parentCategory"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Không có danh mục cha</option>
                    <option value="electronics">Điện tử</option>
                    <option value="clothing">Quần áo</option>
                    <option value="books">Sách</option>
                </select>
            </div>

            <!-- Mô tả -->
            <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea id="description" v-model="formData.description" rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập mô tả cho danh mục"></textarea>
            </div>

            <!-- Trạng thái -->
            <div class="flex items-center justify-between">
                <label for="status" class="text-sm font-medium text-gray-700">Trạng thái</label>
                <button type="button" @click="formData.status = !formData.status"
                    class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    :class="formData.status ? 'bg-blue-600' : 'bg-gray-200'">
                    <span
                        class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        :class="formData.status ? 'translate-x-5' : 'translate-x-0'"></span>
                </button>
            </div>

            <!-- Nút submit -->
            <div class="flex justify-end space-x-3">
                <button type="button" @click="resetForm"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Hủy
                </button>
                <button type="submit"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Thêm danh mục
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const formData = ref({
    name: '',
    parentCategory: '',
    description: '',
    status: true
})

const handleSubmit = () => {
    // Xử lý submit form ở đây
    console.log('Form data:', formData.value)
}

const resetForm = () => {
    formData.value = {
        name: '',
        parentCategory: '',
        description: '',
        status: true
    }
    router.push('/products/categories')
}
</script>
