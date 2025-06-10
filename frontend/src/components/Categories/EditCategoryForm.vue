<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Cập Nhật Danh Mục</h1>

    <!-- Loading indicator -->
    <div v-if="loading" class="text-center py-4">
      <p class="text-gray-600">Đang tải...</p>
    </div>

    <!-- Error message -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <form @submit.prevent="handleUpdate" class="space-y-6" :disabled="loading">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Tên danh mục</label>
        <input type="text" id="name" v-model="formData.name" :disabled="loading"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
      </div>

      <div>
        <label for="parentCategory" class="block text-sm font-medium text-gray-700 mb-1">Danh mục cha</label>
        <select id="parentCategory" v-model="formData.parentCategory" :disabled="loading"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100">
          <option value="">Không có danh mục cha</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id" :disabled="cat.id === Number(categoryId)">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <div class="flex items-center justify-between">
        <label for="status" class="text-sm font-medium text-gray-700">Trạng thái</label>
        <button type="button" @click="formData.status = !formData.status" :disabled="loading"
          class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          :class="formData.status ? 'bg-blue-600' : 'bg-gray-200'">
          <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out"
            :class="formData.status ? 'translate-x-5' : 'translate-x-0'"></span>
        </button>
      </div>

      <div class="flex justify-end space-x-3">
        <button @click="cancelEdit" type="button" :disabled="loading"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">
          Hủy
        </button>
        <button type="submit" :disabled="loading"
          class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
          {{ loading ? 'Đang cập nhật...' : 'Cập nhật danh mục' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCategory } from '../../composables/useCategory'

const route = useRoute()
const router = useRouter()
const categoryId = route.params.id

const {
  categories,
  category,
  loading,
  error,
  getCategories,
  getCategoryById,
  updateCategory
} = useCategory()

const formData = ref({
  name: '',
  parentCategory: '',
  description: '',
  status: true
})

const errors = ref({
  name: ''
})

onMounted(async () => {
  try {
    await getCategories()
    await getCategoryById(categoryId)
    if (category.value) {
      formData.value = {
        name: category.value.name,
        parentCategory: category.value.parent_id || '',
        description: category.value.description || '',
        status: category.value.status === 'active'
      }
    }
  } catch (err) {
    console.error('Error loading data:', err)
  }
})

const validateForm = () => {
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

const handleUpdate = async () => {
  if (!validateForm()) return
  try {
    const categoryData = {
      name: formData.value.name,
      parent_id: formData.value.parentCategory || null,
      description: formData.value.description,
      status: formData.value.status ? 'active' : 'inactive'
    }
    await updateCategory(categoryId, categoryData)
  } catch (err) {
    console.error('Error updating category:', err)
  }
}

const cancelEdit = () => {
  router.push('/products/categories')
}
</script>
