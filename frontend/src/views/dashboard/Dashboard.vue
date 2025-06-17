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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nhân Viên</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số Tiền</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in paginatedOrders" :key="order.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{{ order.order_number }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ order.customer?.name || 'Không có' }}</div>
                <div class="text-sm text-gray-500">{{ order.customer?.phone || 'Không có' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ order.staff?.name || 'Không có' }}</div>
                <div class="text-sm text-gray-500">{{ order.staff?.email || 'Không có' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(new Date(order.created_at)) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>{{ formatCurrency(order.total_amount) }}</div>
                <div class="text-xs text-gray-500">{{ order.payment_method === 'cash' ? 'Tiền mặt' : 'Thẻ/QR' }}</div>
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
            <tr v-if="!dashboardData.recentOrders?.length">
              <td colspan="6" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                Không có đơn hàng mới
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button @click="currentPage > 1 && (currentPage--)" :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }">
              Trang trước
            </button>
            <button @click="currentPage < totalPages && (currentPage++)" :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }">
              Trang sau
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Hiển thị
                <span class="font-medium">{{ startIndex + 1 }}</span>
                đến
                <span class="font-medium">{{ endIndex }}</span>
                của
                <span class="font-medium">{{ totalOrders }}</span>
                đơn hàng
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button @click="currentPage > 1 && (currentPage--)" :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }">
                  <span class="sr-only">Trang trước</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    aria-hidden="true">
                    <path fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
                <button v-for="page in displayedPages" :key="page" @click="currentPage = page" :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  currentPage === page
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]">
                  {{ page }}
                </button>
                <button @click="currentPage < totalPages && (currentPage++)" :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }">
                  <span class="sr-only">Trang sau</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    aria-hidden="true">
                    <path fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Biểu Đồ Doanh Thu</h3>
        <div ref="revenueChartRef" class="h-80">
          <div v-if="loading" class="flex items-center justify-center h-full">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
          <apexchart v-else-if="isChartDataReady('revenue')" type="line" height="100%" :options="revenueChartOptions"
            :series="revenueSeries" />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Biểu Đồ Đơn Hàng</h3>
        <div ref="ordersChartRef" class="h-80">
          <div v-if="loading" class="flex items-center justify-center h-full">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
          <apexchart v-else-if="isChartDataReady('orders')" type="bar" height="100%" :options="ordersChartOptions"
            :series="ordersSeries" />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Thống Kê Nhập Xuất Kho</h3>
        <div ref="inventoryChartRef" class="h-80">
          <div v-if="loading" class="flex items-center justify-center h-full">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
          <apexchart v-else-if="isChartDataReady('inventory')" type="pie" height="100%" :options="inventoryChartOptions"
            :series="inventorySeries" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import useDashboard from '../../composables/useDashboard'
import { useAuth } from '../../composables/useAuth'
import VueApexCharts from 'vue3-apexcharts'

const { dashboardData, fetchDashboardData } = useDashboard()
const { user } = useAuth()
const loading = ref(true) // Start with loading true to prevent premature rendering
const error = ref('')

// Pagination
const currentPage = ref(1)
const itemsPerPage = 5

const totalOrders = computed(() => dashboardData.value.recentOrders?.length || 0)
const totalPages = computed(() => Math.ceil(totalOrders.value / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalOrders.value))

const paginatedOrders = computed(() => {
  if (!dashboardData.value.recentOrders) return []
  const start = startIndex.value
  const end = endIndex.value
  return dashboardData.value.recentOrders.slice(start, end)
})

const displayedPages = computed(() => {
  const pages = []
  const maxVisiblePages = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2))
  let end = Math.min(totalPages.value, start + maxVisiblePages - 1)

  if (end - start + 1 < maxVisiblePages) {
    start = Math.max(1, end - maxVisiblePages + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const months = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
]

// Chart refs
const revenueChartRef = ref<HTMLElement | null>(null)
const ordersChartRef = ref<HTMLElement | null>(null)
const inventoryChartRef = ref<HTMLElement | null>(null)

// Helper to check if chart data is ready
const isChartDataReady = (type: string) => {
  if (!dashboardData.value.chartData) return false
  switch (type) {
    case 'revenue':
      return Array.isArray(dashboardData.value.chartData.revenue) && dashboardData.value.chartData.revenue.length > 0
    case 'orders':
      return Array.isArray(dashboardData.value.chartData.orders) && dashboardData.value.chartData.orders.length > 0
    case 'inventory':
      return (
        dashboardData.value.chartData.inventory &&
        Array.isArray(dashboardData.value.chartData.inventory.imports) &&
        Array.isArray(dashboardData.value.chartData.inventory.exports)
      )
    default:
      return false
  }
}

const revenueChartOptions = computed(() => ({
  chart: {
    type: 'line',
    toolbar: { show: false },
    animations: { enabled: false }
  },
  xaxis: {
    categories: months,
    labels: { style: { fontSize: '12px' } }
  },
  yaxis: {
    labels: { formatter: (value: number) => formatCurrency(value) }
  },
  tooltip: {
    y: { formatter: (value: number) => formatCurrency(value) }
  },
  colors: ['#4CAF50'],
  stroke: { curve: 'smooth', width: 2 },
  markers: { size: 4 }
}))

const ordersChartOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: { show: false },
    animations: { enabled: false }
  },
  xaxis: {
    categories: months,
    labels: { style: { fontSize: '12px' } }
  },
  yaxis: {
    labels: { formatter: (value: number) => Math.round(value) }
  },
  colors: ['#2196F3'],
  plotOptions: {
    bar: { borderRadius: 4, columnWidth: '60%' }
  }
}))

const inventoryChartOptions = computed(() => ({
  chart: {
    type: 'pie',
    toolbar: { show: false },
    animations: { enabled: false }
  },
  labels: ['Nhập kho', 'Xuất kho'],
  colors: ['#4CAF50', '#F44336'],
  legend: {
    position: 'bottom',
    fontSize: '14px'
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => `${val.toFixed(1)}%`
  },
  plotOptions: {
    pie: {
      donut: {
        size: '0%'
      }
    }
  },
  tooltip: {
    y: {
      formatter: (value: number) => `${value} sản phẩm`
    }
  }
}))

const inventorySeries = computed(() => {
  const imports = dashboardData.value.chartData?.inventory?.imports?.reduce((a: number, b: number) => a + b, 0) || 0
  const exports = dashboardData.value.chartData?.inventory?.exports?.reduce((a: number, b: number) => a + b, 0) || 0
  return [imports, exports]
})

const revenueSeries = computed(() => [{
  name: 'Doanh Thu',
  data: dashboardData.value.chartData?.revenue || []
}])

const ordersSeries = computed(() => [{
  name: 'Số Đơn Hàng',
  data: dashboardData.value.chartData?.orders || []
}])

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const getOrderStatusText = (status: string) => {
  const statusMap: { [key: string]: string } = {
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
    // Wait for the next DOM update cycle to ensure refs are set
    await nextTick()
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