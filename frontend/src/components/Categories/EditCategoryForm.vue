<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Cập Nhật Danh Mục</h1>

    <form @submit.prevent="handleUpdate" class="space-y-6">
      <!-- Tên danh mục -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Tên danh mục</label>
        <input type="text" id="name" v-model="formData.name"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required />
      </div>

      <!-- Danh mục cha -->
      <div>
        <label for="parentCategory" class="block text-sm font-medium text-gray-700 mb-1">Danh mục cha</label>
        <select id="parentCategory" v-model="formData.parentCategory"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Không có danh mục cha</option>
         <option v-for="category in categories" :key="category.id" :value="category.id" :disabled="category.id === Number(categoryId)"  >
            {{ category.name }}
         </option>
        </select>
      </div>

      <!-- Mô tả -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
        <textarea id="description" v-model="formData.description" rows="4"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </textarea>
      </div>

      <!-- Trạng thái -->
      <div class="flex items-center justify-between">
        <label for="status" class="text-sm font-medium text-gray-700">Trạng thái</label>
        <button type="button" @click="formData.status = !formData.status"
          class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          :class="formData.status ? 'bg-blue-600' : 'bg-gray-200'">
          <span
            class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out"
            :class="formData.status ? 'translate-x-5' : 'translate-x-0'"></span>
        </button>
      </div>

      <!-- Nút hành động -->
      <div class="flex justify-end space-x-3">
        <button @click="cancelEdit" type="button"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
          Hủy
        </button>
        <button type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
          Cập nhật danh mục
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const categoryId = route.params.id

const formData = ref({
  name: '',
  parentCategory: '',
  description: '',
  status: true
});

// lấy api list danh mục để chọn danh mục cha
const categories = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/categories')
    const data = await res.json()
    categories.value = data
  } catch (err) {
    console.error('Lỗi khi tải danh mục:', err)
    alert('Không thể tải dữ liệu danh mục')
  }
})

// Lấy dữ liệu cũ để đổ vào form
onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/categories/${categoryId}`)
    const data = await res.json()
    formData.value = {
      name: data.name,
      parentCategory: data.parent_id,
      description: data.description || '',
      status: data.status === 'active'
    }
  } catch (err) {
    console.error('Lỗi khi tải danh mục:', err)
    alert('Không thể tải dữ liệu danh mục')
  }
})

// Gửi API cập nhật
const handleUpdate = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/categories/${categoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.value.name,
        parent_id: formData.value.parentCategory || null,
        description: formData.value.description,
        status: formData.value.status ? 'active' : 'inactive'
      })
    })

    if (!res.ok) throw new Error('Cập nhật thất bại')
    alert('Cập nhật danh mục thành công')
    router.push('/products/categories')
  } catch (err) {
    console.error(err)
    alert('Có lỗi xảy ra khi cập nhật danh mục')
  }
}

const cancelEdit = () => {
  router.push('/products/categories')
}
</script>
