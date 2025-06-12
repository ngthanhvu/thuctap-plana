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

export const useOrders = () => {
    const orders = ref([])
    const loading = ref(false)
    const error = ref(null)

    // Lấy danh sách đơn hàng
    const getOrderList = async () => {
        loading.value = true
        error.value = null
        try {
            const response = await axios.get('/api/orders')
            orders.value = response.data
            return response.data
        } catch (err) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', err)
            error.value = err.message || 'Đã xảy ra lỗi khi lấy danh sách đơn hàng'
            notyf.error(error.value)
            return []
        } finally {
            loading.value = false
        }
    }

    // Lấy chi tiết đơn hàng theo ID
    const getOrderById = async (id) => {
        loading.value = true
        error.value = null
        try {
            const response = await axios.get(`/api/orders/${id}`)
            return response.data
        } catch (err) {
            console.error(`Lỗi khi lấy thông tin đơn hàng #${id}:`, err)
            error.value = err.message || 'Đã xảy ra lỗi khi lấy thông tin đơn hàng'
            notyf.error(error.value)
            return null
        } finally {
            loading.value = false
        }
    }

    // Cập nhật trạng thái đơn hàng
    const updateOrderStatus = async (orderId, status) => {
        loading.value = true
        error.value = null
        try {
            const response = await axios.put(`/api/orders/${orderId}/status`, { status })
            notyf.success('Cập nhật trạng thái đơn hàng thành công')
            await getOrderList() // Cập nhật lại danh sách đơn hàng
            return response.data
        } catch (err) {
            console.error('Lỗi khi cập nhật trạng thái đơn hàng:', err)
            error.value = err.message || 'Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng'
            notyf.error(error.value)
            return null
        } finally {
            loading.value = false
        }
    }

    // Xóa đơn hàng
    const deleteOrder = async (orderId) => {
        loading.value = true
        error.value = null
        try {
            const response = await axios.delete(`/api/orders/${orderId}`)
            notyf.success('Xóa đơn hàng thành công')
            await getOrderList() // Cập nhật lại danh sách đơn hàng
            return response.data
        } catch (err) {
            console.error('Lỗi khi xóa đơn hàng:', err)
            error.value = err.message || 'Đã xảy ra lỗi khi xóa đơn hàng'
            notyf.error(error.value)
            return null
        } finally {
            loading.value = false
        }
    }

    // Lấy chữ cái đầu của tên nhân viên
    const getStaffInitials = (name) => {
        if (!name) return '?'
        return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }

    return {
        orders,
        loading,
        error,
        getOrderList,
        getOrderById,
        updateOrderStatus,
        deleteOrder,
        getStaffInitials
    }
}