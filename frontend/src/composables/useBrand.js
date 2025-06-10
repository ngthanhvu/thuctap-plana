import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf';

const notyf = new Notyf({
    duration: 3000,
    position: {
        x: 'center',
        y: 'top'
    }
});

export const useBrand = () => {
    const router = useRouter()
    const error = ref(null)
    const loading = ref(false)
    const brands = ref([])

    const getBrands = async () => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.get('/api/brands')
            brands.value = response.data
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Lấy danh sách thương hiệu thất bại'
            throw err
        }
    }

    const getBrandById = async (id) => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.get(`/api/brands/${id}`)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Lấy thương hiệu thất bại'
            throw err
        }
    }

    const createBrand = async (data) => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.post('/api/brands', data)
            notyf.success('Thêm thương hiệu thành công')
            router.push('/products/brands')
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Thêm thương hiệu thất bại'
            throw err
        }
    }

    const updateBrand = async (id, data) => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.put(`/api/brands/${id}`, data)
            notyf.success('Cập nhật thương hiệu thành công')
            router.push('/products/brands')
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Cập nhật thương hiệu thất bại'
            throw err
        }
    }

    const deleteBrand = async (id) => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.delete(`/api/brands/${id}`)
            notyf.success('Xóa thương hiệu thành công')
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Xóa thương hiệu thất bại'
            throw err
        }
    }


    return {
        brands,
        getBrands,
        createBrand,
        deleteBrand,
        updateBrand,
        getBrandById,
        error,
        loading,
    }
}