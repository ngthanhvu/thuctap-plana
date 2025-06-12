<template>
    <div class="max-w-2xl mx-auto p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Thêm Thương Hiệu Mới</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Tên thương hiệu *</label>
                <input type="text" id="name" v-model="formData.name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên thương hiệu" required>
            </div>
            <div>
                <label for="image" class="block text-sm font-medium text-gray-700 mb-1">Logo thương hiệu</label>
                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                    <div class="text-center">
                        <FileImage class="mx-auto h-12 w-auto text-gray-400" />
                        <div class="mt-4 flex text-sm text-gray-600">
                            <label for="image-upload"
                                class="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                                <span>Tải lên logo</span>
                                <input id="image-upload" name="image" type="file" class="sr-only"
                                    @change="handleImageChange" accept="image/*" />
                            </label>
                            <p class="pl-1">hoặc kéo thả</p>
                        </div>
                        <p class="text-xs text-gray-600">PNG, JPG, GIF tối đa 5MB</p>
                    </div>
                </div>
                <div v-if="imagePreview" class="mt-2">
                    <img :src="imagePreview" alt="Image preview" class="h-20 w-auto object-contain border rounded">
                </div>
            </div>
            <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea id="description" v-model="formData.description" rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập mô tả cho thương hiệu (tùy chọn)"></textarea>
            </div>
            <div class="flex justify-end space-x-3">
                <button type="button" @click="resetForm"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Hủy
                </button>
                <button type="submit" :disabled="isSubmitting"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                    {{ isSubmitting ? 'Đang xử lý...' : 'Thêm thương hiệu' }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FileImage } from 'lucide-vue-next'
import { useBrand } from '../../composables/useBrand'

const { createBrand } = useBrand()
const router = useRouter()

const formData = ref({
    name: '',
    description: '',
    image: null
})

const imagePreview = ref(null)
const isSubmitting = ref(false)

const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert('File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.')
            return
        }

        formData.value.image = file
        const reader = new FileReader()
        reader.onload = (e) => {
            imagePreview.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const handleSubmit = async () => {
    if (!formData.value.name.trim()) {
        alert('Vui lòng nhập tên thương hiệu!')
        return
    }

    isSubmitting.value = true

    try {
        const formDataToSend = new FormData()
        formDataToSend.append('name', formData.value.name.trim())

        if (formData.value.description) {
            formDataToSend.append('description', formData.value.description.trim())
        }

        if (formData.value.image) {
            formDataToSend.append('image', formData.value.image)
        }

        await createBrand(formDataToSend)
    } catch (error) {
        console.error('Error creating brand:', error)
        alert('Có lỗi xảy ra khi thêm thương hiệu!')
    } finally {
        isSubmitting.value = false
    }
}

const resetForm = () => {
    formData.value = {
        name: '',
        description: '',
        image: null
    }
    imagePreview.value = null
    router.push('/brands')
}
</script>

<style scoped>
/* Custom styles if needed */
</style>