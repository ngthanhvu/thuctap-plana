import { ref } from 'vue'
import axios from 'axios'
import { Notyf } from 'notyf'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const notyf = new Notyf({
    duration: 3000,
    position: {
        x: 'center',
        y: 'top'
    }
})

export const useCustomer = () => {
    const errors = ref(null)
    const loading = ref(false)
    const customerList = ref([])

    const getCustomerList = async () => {
        try {
            loading.value = true
            errors.value = null

            const response = await axios.get('/api/customers')
            customerList.value = response.data
            return response.data
        } catch (err) {
            errors.value = err.response?.data?.message || 'Lấy danh sách khách hàng thất bại'
            throw err
        } finally {
            loading.value = false
        }
    }

    const deleteCustomer = async (id) => {
        try {
            loading.value = true
            errors.value = null

            const response = await axios.delete(`/api/customers/${id}`)
            notyf.success('Xóa khách hàng thành công')
            return response.data
        } catch (err) {
            errors.value = err.response?.data?.message || 'Xóa khách hàng thất bại'
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        errors,
        loading,
        customerList,
        getCustomerList,
        deleteCustomer
    }
}