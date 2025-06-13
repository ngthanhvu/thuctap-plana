import { ref } from 'vue'
import axios from 'axios'

export default function useDashboard() {
  const dashboardData = ref({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    recentOrders: [],
    chartData: {
      revenue: [],
      orders: []
    }
  })

  const loading = ref(false)
  const error = ref(null)

  const fetchDashboardData = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get('http://localhost:3000/api/dashboard')
      dashboardData.value = response.data
    } catch (err) {
      error.value = err.message || 'Có lỗi xảy ra khi tải dữ liệu'
    } finally {
      loading.value = false
    }
  }

  return {
    dashboardData,
    loading,
    error,
    fetchDashboardData
  }
}