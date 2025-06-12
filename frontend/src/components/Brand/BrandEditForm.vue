<template>
    <div class="max-w-2xl mx-auto p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Chỉnh Sửa Thương Hiệu</h1>

        <!-- Loading state -->
        <div v-if="isLoading" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span class="ml-2 text-gray-600">Đang tải dữ liệu...</span>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="space-y-6">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Tên thương hiệu *</label>
                <input type="text" id="name" v-model="formData.name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên thương hiệu" required>
            </div>
            <div>
                <label for="image" class="block text-sm font-medium text-gray-700 mb-1">Logo thương hiệu</label>
                <div v-if="currentImage && !imagePreview" class="mb-4">
                    <p class="text-sm text-gray-600 mb-2">Logo hiện tại:</p>
                    <div class="relative inline-block">
                        <img :src="currentImage" :alt="formData.name || 'Current logo'"
                            class="h-32 w-auto object-contain border rounded shadow-sm" @error="handleImageError"
                            @load="handleImageLoad">
                        <button type="button" @click="removeCurrentImage"
                            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
                            ×
                        </button>
                    </div>
                </div>
                <div v-else-if="!currentImage && !imagePreview && !isLoading" class="mb-4">
                    <p class="text-sm text-gray-500 italic">Thương hiệu này chưa có logo</p>
                </div>

                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                    <div class="text-center">
                        <FileImage class="mx-auto h-12 w-auto text-gray-400" />
                        <div class="mt-4 flex text-sm text-gray-600">
                            <label for="image-upload"
                                class="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                                <span>{{ currentImage || imagePreview ? 'Thay đổi logo' : 'Tải lên logo' }}</span>
                                <input id="image-upload" name="image" type="file" class="sr-only"
                                    @change="handleImageChange" accept="image/*" />
                            </label>
                            <p class="pl-1">hoặc kéo thả</p>
                        </div>
                        <p class="text-xs text-gray-600">PNG, JPG, GIF tối đa 5MB</p>
                    </div>
                </div>
                <div v-if="imagePreview" class="mt-4">
                    <p class="text-sm text-gray-600 mb-2">Logo mới:</p>
                    <div class="relative inline-block">
                        <img :src="imagePreview" alt="Image preview"
                            class="h-32 w-auto object-contain border rounded shadow-sm">
                        <button type="button" @click="removeImagePreview"
                            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
                            ×
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea id="description" v-model="formData.description" rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập mô tả cho thương hiệu (tùy chọn)"></textarea>
            </div>
            <div class="flex justify-end space-x-3">
                <button type="button" @click="cancelEdit"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Hủy
                </button>
                <button type="submit" :disabled="isSubmitting"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                    {{ isSubmitting ? 'Đang xử lý...' : 'Cập nhật thương hiệu' }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { FileImage } from 'lucide-vue-next'
import { useBrand } from '../../composables/useBrand'

const { getBrandById, updateBrand } = useBrand()
const router = useRouter()
const route = useRoute()

const formData = ref({
    name: '',
    description: '',
    image: null
})

const currentImage = ref(null)
const imagePreview = ref(null)
const isSubmitting = ref(false)
const isLoading = ref(true)
const brandId = ref(route.params.id)
const removeCurrentImageFlag = ref(false)

onMounted(async () => {
    console.log('Loading brand with ID:', brandId.value)
    try {
        isLoading.value = true
        const brand = await getBrandById(brandId.value)
        console.log('Brand data received:', brand)

        formData.value.name = brand.name || ''
        formData.value.description = brand.description || ''
        currentImage.value = brand.image_url || null

        console.log('Current image set to:', currentImage.value)
    } catch (error) {
        console.error('Error loading brand:', error)
        alert('Không thể tải thông tin thương hiệu!')
        router.push('/products/brands')
    } finally {
        isLoading.value = false
    }
})

const handleImageError = (event) => {
    console.error('Image failed to load:', event.target.src)
}

const handleImageLoad = () => {
    console.log('Image loaded successfully')
}

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

const removeCurrentImage = () => {
    currentImage.value = null
    removeCurrentImageFlag.value = true
}

const removeImagePreview = () => {
    imagePreview.value = null
    formData.value.image = null
    const fileInput = document.getElementById('image-upload')
    if (fileInput) {
        fileInput.value = ''
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

        if (removeCurrentImageFlag.value && !formData.value.image) {
            formDataToSend.append('removeImage', 'true')
        }

        await updateBrand(brandId.value, formDataToSend)
        router.push('/products/brands')
    } catch (error) {
        console.error('Error updating brand:', error)
        alert('Có lỗi xảy ra khi cập nhật thương hiệu!')
    } finally {
        isSubmitting.value = false
    }
}

const cancelEdit = () => {
    router.push('/products/brands')
}
</script>

<style scoped></style>