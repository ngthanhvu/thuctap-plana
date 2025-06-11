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

export const useInventory = () => {
    const error = ref(null)
    const loading = ref(false)
    const inventories = ref([])
    const stockMovements = ref([])

    // Lấy danh sách inventory
    const getInventories = async () => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.get('/api/inventories')
            inventories.value = response.data
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Lấy danh sách tồn kho thất bại'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Lấy inventory theo product ID
    const getInventoryByProduct = async (productId) => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.get(`/api/inventories/product/${productId}`)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Lấy thông tin tồn kho thất bại'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Tạo stock movement (nhập/xuất kho)
    const createStockMovement = async (data) => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.post('/api/stock-movements', data)
            notyf.success(`${data.type === 'import' ? 'Nhập' : 'Xuất'} kho thành công`)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Thao tác kho thất bại'
            notyf.error(error.value)
            throw err
        } finally {
            loading.value = false
        }
    }

    // Lấy lịch sử stock movements
    const getStockMovements = async () => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.get('/api/stock-movements')
            stockMovements.value = response.data
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Lấy lịch sử kho thất bại'
            throw err
        } finally {
            loading.value = false
        }
    }

    const getStockMovementById = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/stock-movements/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            
            if (!response.ok) {
                throw new Error('Không thể tải thông tin phiếu')
            }
            
            return await response.json()
        } catch (error) {
            console.error('Error fetching stock movement:', error)
            throw error
        }
    }

    return {
        inventories,
        stockMovements,
        getInventories,
        getInventoryByProduct,
        createStockMovement,
        getStockMovements,
        error,
        loading,
        getStockMovementById
    }
}