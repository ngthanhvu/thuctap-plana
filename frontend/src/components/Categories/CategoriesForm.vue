<template>
    <div class="max-w-2xl mx-auto p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Thêm Danh Mục Mới</h1>
        <div v-if="loading" class="text-center py-4">
            <p class="text-gray-600">Đang xử lý...</p>
        </div>
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {{ error }}
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-6" :disabled="loading">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Tên danh mục</label>
                <input type="text" id="name" v-model="formData.name" :disabled="loading"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder="Nhập tên danh mục">
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
            </div>
            <div>
                <label for="parentCategory" class="block text-sm font-medium text-gray-700 mb-1">Danh mục cha</label>
                <select id="parentCategory" v-model="formData.parentCategory" :disabled="loading"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100">
                    <option value="">Không có danh mục cha</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
            <div class="flex items-center justify-between">
                <label for="status" class="text-sm font-medium text-gray-700">Trạng thái</label>
                <button type="button" @click="formData.status = !formData.status" :disabled="loading"
                    class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    :class="formData.status ? 'bg-blue-600' : 'bg-gray-200'">
                    <span
                        class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        :class="formData.status ? 'translate-x-5' : 'translate-x-0'"></span>
                </button>
            </div>
            <div class="flex justify-end space-x-3">
                <button type="button" @click="resetForm" :disabled="loading"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                    Hủy
                </button>
                <button type="submit" :disabled="loading"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                    {{ loading ? 'Đang thêm...' : 'Thêm danh mục' }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCategory } from '../../composables/useCategory'

const router = useRouter()

const {
    categories,
    loading,
    error,
    getCategories,
    createCategory
} = useCategory()

const formData = ref({
    name: '',
    parentCategory: '',
    status: true
})

const errors = ref({
    name: ''
})

onMounted(async () => {
    await getCategories()
})

function validateForm() {
    let isValid = true
    errors.value.name = ''
    if (formData.value.name.trim() === '') {
        errors.value.name = 'Danh mục không được để trống'
        isValid = false
    } else if (formData.value.name.trim().length < 3) {
        errors.value.name = 'Danh mục phải có ít nhất 3 ký tự'
        isValid = false
    }
    return isValid
}

const handleSubmit = async () => {
    if (!validateForm()) return
    try {
        const categoryData = {
            name: formData.value.name,
            parent_id: formData.value.parentCategory || null,
            description: formData.value.description || '',
            status: formData.value.status ? 'active' : 'inactive'
        }
        await createCategory(categoryData)
        // resetForm()
    } catch (err) {
        console.error('Error creating category:', err)
    }
}

const resetForm = () => {
    formData.value = {
        name: '',
        parentCategory: '',
        status: true
    }
    errors.value = {
        name: ''
    }
}
</script>
