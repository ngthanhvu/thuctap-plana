import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const notyf = new Notyf({
    duration: 3000,
    position: {
        x: 'center',
        y: 'top',
    },
})

export const useCategory = () => {
    const categories = ref([])
    const category = ref(null)
    const loading = ref(false)
    const error = ref(null)
    const router = useRouter()

    const getCategories = async () => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.get('/api/categories')
            categories.value = response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Lấy danh sách danh mục thất bại'
            notyf.error(error.value)
        } finally {
            loading.value = false
        }
    }

    const getCategoryById = async (id) => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.get(`/api/categories/${id}`)
            category.value = response.data
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Lấy danh mục thất bại'
            notyf.error(error.value)
            throw err
        } finally {
            loading.value = false
        }
    }

    const createCategory = async (data) => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.post('/api/categories', data)
            notyf.success('Tạo danh mục thành công')
            router.push('/products/categories')
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Tạo danh mục thất bại'
            notyf.error(error.value)
            throw err
        } finally {
            loading.value = false
        }
    }

    const updateCategory = async (id, data) => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.put(`/api/categories/${id}`, data)
            notyf.success('Cập nhật danh mục thành công')
            router.push('/products/categories')
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Cập nhật danh mục thất bại'
            notyf.error(error.value)
            throw err
        } finally {
            loading.value = false
        }
    }

    const deleteCategory = async (id) => {
        try {
            loading.value = true
            error.value = null

            await axios.delete(`/api/categories/${id}`)
            categories.value = categories.value.filter(category => category.id !== id)
            notyf.success('Xóa danh mục thành công')
        } catch (err) {
            error.value = err.response?.data?.message || 'Xóa danh mục thất bại'
            notyf.error(error.value)
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        categories,
        category,
        loading,
        error,
        getCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory
    }
}