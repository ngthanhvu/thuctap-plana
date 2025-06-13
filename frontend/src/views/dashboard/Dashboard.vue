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
            <p class="text-2xl font-semibold text-gray-900">${{ dashboardData.totalRevenue.toLocaleString() }}</p>
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
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã Đơn Hàng</th>
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
              ${{ order.total_amount?.toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
              ]">
                {{ order.status === 'completed' ? 'Hoàn thành' :
                  order.status === 'processing' ? 'Đang xử lý' :
                    order.status === 'cancelled' ? 'Đã hủy' : 'Chờ xử lý' }}
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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Biểu Đồ Doanh Thu</h3>
        <div class="h-80">
          <canvas ref="revenueChart"></canvas>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Biểu Đồ Đơn Hàng</h3>
        <div class="h-80">
          <canvas ref="ordersChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import useDashboard from '../../composables/useDashboard'
import Chart from 'chart.js/auto'

const { dashboardData, fetchDashboardData } = useDashboard()
const loading = ref(false)
const error = ref('')

const revenueChart = ref<HTMLCanvasElement | null>(null)
const ordersChart = ref<HTMLCanvasElement | null>(null)

const formatDate = (date: Date) => {
  return date.toLocaleDateString()
}

const initRevenueChart = () => {
  if (revenueChart.value) {
    new Chart(revenueChart.value, {
      type: 'line',
      data: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [{
          label: 'Doanh Thu',
          data: dashboardData.value.chartData?.revenue || [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })
  }
}

const initOrdersChart = () => {
  if (ordersChart.value) {
    new Chart(ordersChart.value, {
      type: 'bar',
      data: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [{
          label: 'Số Đơn Hàng',
          data: dashboardData.value.chartData?.orders || [],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })
  }
}

onMounted(async () => {
  try {
    loading.value = true
    await fetchDashboardData()
    // Khởi tạo biểu đồ sau khi có dữ liệu
    initRevenueChart()
    initOrdersChart()
  } catch (err) {
    error.value = 'Có lỗi xảy ra khi tải dữ liệu'
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
})





const setupCharts = () => {
  const revenueCtx = document.getElementById('revenueChart');
  const orderCtx = document.getElementById('orderChart');

  if (revenueCtx && orderCtx && dashboardData.value.chartData) {
    const months = [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];

    new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Doanh thu theo tháng',
          data: dashboardData.value.chartData.revenue,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Biểu đồ doanh thu theo tháng'
          }
        }
      }
    });

    new Chart(orderCtx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Số đơn hàng theo tháng',
          data: dashboardData.value.chartData.orders,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Biểu đồ số đơn hàng theo tháng'
          }
        }
      }
    });
  }
};

onMounted(async () => {
  try {
    loading.value = true;
    await fetchDashboardData();
    setupCharts(); // Gọi hàm thiết lập biểu đồ sau khi có dữ liệu
  } catch (err) {
    error.value = 'Có lỗi xảy ra khi tải dữ liệu';
    console.error('Error:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Thêm các kiểu tùy chỉnh tại đây */
</style>