<template>
    <div class="max-w-2xl mx-auto p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Thêm Thương Hiệu Mới</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Tên thương hiệu -->
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Tên thương hiệu</label>
                <input type="text" id="name" v-model="formData.name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên thương hiệu" required>
            </div>

            <!-- Logo -->
            <div class="col-span-full">
                <label for="logo" class="block text-sm font-medium text-gray-900">Logo thương hiệu</label>
                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div class="text-center">
                        <FileImage class="mx-auto h-12 w-auto text-gray-400" />
                        <div class="mt-4 flex text-sm text-gray-600">
                            <label for="logo-upload"
                                class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>Tải lên logo</span>
                                <input id="logo-upload" name="logo-upload" type="file" class="sr-only"
                                    @change="handleLogoChange" accept="image/*" />
                            </label>
                            <p class="pl-1">hoặc kéo thả</p>
                        </div>
                        <p class="text-xs text-gray-600">PNG, JPG, GIF tối đa 10MB</p>
                    </div>
                </div>
                <div v-if="logoPreview" class="mt-2">
                    <img :src="logoPreview" alt="Logo preview" class="h-20 w-auto object-contain">
                </div>
            </div>

            <!-- Mô tả -->
            <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea id="description" v-model="formData.description" rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập mô tả cho thương hiệu"></textarea>
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
                    Thêm thương hiệu
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FileImage } from 'lucide-vue-next'

const router = useRouter()
const formData = ref({
    name: '',
    description: '',
    status: true,
    logo: null
})

const logoPreview = ref(null)

const handleLogoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        formData.value.logo = file
        const reader = new FileReader()
        reader.onload = (e) => {
            logoPreview.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const handleSubmit = () => {
    // Xử lý submit form ở đây
    console.log('Form data:', formData.value)
}

const resetForm = () => {
    formData.value = {
        name: '',
        description: '',
        status: true,
        logo: null
    }
    logoPreview.value = null
    router.push('/brands')
}
</script>
<style></style>