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
                    <option v-for="category in categories" :key="category.id" :value="category.id" >
                        {{ category.name }}
                    </option>
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
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const formData = ref({
    name: '',
    parentCategory: '',
    description: '',
    status: true
});

const categories = ref([]);

onMounted( async() => {
    try {
        const res = await fetch('http://localhost:3000/api/categories');
        if(!res.ok){
            throw new Error('Network response was not ok');
        } 
        const data = await res.json();
        categories.value = data
    } catch (error) {
        console.error(error);
    }
})

const handleSubmit = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.value.name,
        parent_id: formData.value.parentCategory || null, // tùy API backend
        description: formData.value.description,
        status: formData.value.status ? 'active' : 'inactive'
      })
    });

    if (!response.ok) {
      throw new Error('Thêm danh mục thất bại');
    }

    const result = await response.json();
    console.log('Thêm danh mục thành công:', result);

    // Sau khi thêm thành công:
    resetForm();
    router.push('/products/categories'); // hoặc đóng form, tùy bạn

  } catch (error) {
    console.error(error);
    alert('Có lỗi xảy ra khi thêm danh mục');
  }
};


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
