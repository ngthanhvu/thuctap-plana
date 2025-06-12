import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const notyf = new Notyf({
    duration: 3000,
    position: {
        x: 'center',
        y: 'top'
    }
});
export const useProduct = () => {
    const router = useRouter()
    const error = ref(null)
    const loading = ref(false)
    const products = ref([])

    const getProducts = async () => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.get('/api/products')
            products.value = response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Lấy danh sách sản phẩm thất bại'
            throw err
        } finally {
            loading.value = false
        }
    }
    const getProductById = async (id) => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.get(`/api/products/${id}`)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Lấy sản phẩm thất bại'
            throw err
        } finally {
            loading.value = false
        }
    }
    const createProduct = async (data) => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.post('/api/products', data)
            notyf.success('Thêm sản phẩm thành công')
            router.push('/products/list')
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Thêm sản phẩm thất bại'
            throw err
        } finally {
            loading.value = false
        }
    }

    const updateProduct = async (id, data) => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.put(`/api/products/${id}`, data)
            notyf.success('Cập nhật sản phẩm thành công')
            router.push('/products/list')
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Cập nhật sản phẩm thất bại'
            throw err
        } finally {
            loading.value = false
        }
    }

    const deleteProduct = async (id) => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.delete(`/api/products/${id}`)
            notyf.success('Xóa sản phẩm thành công')
            return response.data
        }
        catch (err) {
            error.value = err.response?.data?.message || 'Xóa sản phẩm thất bại'
            throw err
        } finally {
            loading.value = false
        }
    }
    return {
        products,
        getProducts,
        createProduct,
        deleteProduct,
        updateProduct,
        getProductById,
        error,
        loading
    }
}