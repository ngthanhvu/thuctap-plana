<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Bảng Điều Khiển</h1>
      <p class="text-gray-600">Tổng quan về hiệu suất kinh doanh của bạn</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Tổng Doanh Thu</p>
            <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(dashboardData.totalRevenue) }}</p>
            <p class="text-sm text-green-600">+12% so với tháng trước</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Tổng Đơn Hàng</p>
            <p class="text-2xl font-semibold text-gray-900">{{ dashboardData.totalOrders }}</p>
            <p class="text-sm text-green-600">+8% so với tháng trước</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Tổng Khách Hàng</p>
            <p class="text-2xl font-semibold text-gray-900">{{ dashboardData.totalCustomers }}</p>
            <p class="text-sm text-green-600">+15% so với tháng trước</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Tổng Sản Phẩm</p>
            <p class="text-2xl font-semibold text-gray-900">{{ dashboardData.totalProducts }}</p>
            <p class="text-sm text-green-600">+5% so với tháng trước</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Đơn Hàng Gần Đây</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã Đơn Hàng
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách Hàng</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số Tiền</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in dashboardData.recentOrders" :key="order.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{{ order.order_number }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ order.customer?.name || 'Không có' }}</div>
                <div class="text-sm text-gray-500">{{ order.customer?.email || 'Không có' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(new Date(order.createdAt)) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(order.total_amount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                ]">
                  {{ getOrderStatusText(order.status) }}
                </span>
              </td>
            </tr>
            <tr v-if="dashboardData.chartData?.orders">
              <td colspan="5" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                Không có đơn hàng mới
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Biểu Đồ Doanh Thu</h3>
        <div class="h-80">
          <apexchart type="line" height="100%" :options="revenueChartOptions" :series="revenueSeries" />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Biểu Đồ Đơn Hàng</h3>
        <div class="h-80">
          <apexchart type="bar" height="100%" :options="ordersChartOptions" :series="ordersSeries" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import useDashboard from '../../composables/useDashboard'
import VueApexCharts from 'vue3-apexcharts'

const { dashboardData, fetchDashboardData } = useDashboard()
const loading = ref(false)
const error = ref('')

const months = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
]

const revenueChartOptions = computed(() => ({
  chart: {
    type: 'line',
    toolbar: {
      show: false
    }
  },
  xaxis: {
    categories: months,
    labels: {
      style: {
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    labels: {
      formatter: (value) => formatCurrency(value)
    }
  },
  tooltip: {
    y: {
      formatter: (value) => formatCurrency(value)
    }
  },
  colors: ['#4CAF50'],
  stroke: {
    curve: 'smooth',
    width: 2
  },
  markers: {
    size: 4
  }
}))

const ordersChartOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: {
      show: false
    }
  },
  xaxis: {
    categories: months,
    labels: {
      style: {
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    labels: {
      formatter: (value) => Math.round(value)
    }
  },
  colors: ['#2196F3'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '60%'
    }
  }
}))

const revenueSeries = computed(() => [{
  name: 'Doanh Thu',
  data: dashboardData.value.chartData?.revenue || []
}])

const ordersSeries = computed(() => [{
  name: 'Số Đơn Hàng',
  data: dashboardData.value.chartData?.orders || []
}])

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value)
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const getOrderStatusText = (status) => {
  const statusMap = {
    'completed': 'Hoàn thành',
    'processing': 'Đang xử lý',
    'cancelled': 'Đã hủy',
    'pending': 'Chờ xử lý'
  }
  return statusMap[status] || status
}

onMounted(async () => {
  try {
    loading.value = true
    await fetchDashboardData()
  } catch (err) {
    error.value = 'Có lỗi xảy ra khi tải dữ liệu'
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.apexcharts-tooltip {
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>