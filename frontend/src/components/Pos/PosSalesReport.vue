<template>
    <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Thống kê doanh thu</h2>
            <div class="flex space-x-2">
                <select v-model="reportPeriod" @change="refreshReport" class="px-3 py-2 border rounded-lg text-sm">
                    <option value="today">Hôm nay</option>
                    <option value="week">Tuần này</option>
                    <option value="month">Tháng này</option>
                    <option value="custom">Tùy chọn</option>
                </select>
                <button @click="refreshReport"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
                    Làm mới
                </button>
            </div>
        </div>

        <div v-if="salesReport" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-blue-50 p-4 rounded-lg">
                <div class="text-sm text-blue-600 font-medium">Tiền mặt</div>
                <div class="text-2xl font-bold text-blue-700">{{ formatPrice(salesReport.total_cash_sales) }}</div>
                <div class="text-xs text-blue-500 mt-1">{{ salesReport.cash_orders || 0 }} đơn hàng</div>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
                <div class="text-sm text-green-600 font-medium">Thẻ/QR</div>
                <div class="text-2xl font-bold text-green-700">{{ formatPrice(salesReport.total_card_sales) }}</div>
                <div class="text-xs text-green-500 mt-1">{{ salesReport.card_orders || 0 }} đơn hàng</div>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
                <div class="text-sm text-purple-600 font-medium">Tổng doanh thu</div>
                <div class="text-2xl font-bold text-purple-700">{{ formatPrice(salesReport.total_sales) }}</div>
                <div class="text-xs text-purple-500 mt-1">{{ salesReport.total_orders }} đơn hàng</div>
            </div>
            <div class="bg-orange-50 p-4 rounded-lg">
                <div class="text-sm text-orange-600 font-medium">Trung bình/đơn</div>
                <div class="text-2xl font-bold text-orange-700">{{ formatPrice(averageOrderValue) }}</div>
                <div class="text-xs text-orange-500 mt-1">Giá trị TB</div>
            </div>
        </div>

        <!-- Top Products -->
        <div v-if="salesReport && salesReport.top_products" class="mb-6">
            <h3 class="text-lg font-semibold mb-3">Sản phẩm bán chạy</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-for="product in salesReport.top_products" :key="product.id" class="bg-gray-50 p-3 rounded-lg">
                    <div class="font-medium text-sm">{{ product.name }}</div>
                    <div class="text-xs text-gray-600">Đã bán: {{ product.total_quantity }} sản phẩm</div>
                    <div class="text-xs text-green-600 font-semibold">{{ formatPrice(product.total_revenue) }}</div>
                </div>
            </div>
        </div>

        <div class="flex space-x-4">
            <button @click="refreshReport" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
                Làm mới
            </button>
            <button v-if="currentUser.role === 'admin'" @click="exportReport"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                Xuất báo cáo
            </button>
            <button @click="printReport" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                In báo cáo
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePosStore } from '../../composables/usePos'

const { salesReport, currentSession, currentUser, fetchSalesReport } = usePosStore()

const reportPeriod = ref('today')

const averageOrderValue = computed(() => {
    if (!salesReport.value || !salesReport.value.total_orders) return 0
    return salesReport.value.total_sales / salesReport.value.total_orders
})

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price || 0)
}

async function refreshReport() {
    try {
        const params = reportPeriod.value !== 'today' ? { period: reportPeriod.value } : {}
        await fetchSalesReport(currentSession.value?.id, params)
    } catch (error) {
        alert('Lỗi khi tải báo cáo')
    }
}

function exportReport() {
    // Logic xuất báo cáo (CSV, PDF, etc.)
    if (salesReport.value) {
        const csvContent = generateCSVReport()
        downloadCSV(csvContent, `bao-cao-doanh-thu-${new Date().toISOString().split('T')[0]}.csv`)
    }
}

function generateCSVReport() {
    const headers = ['Loại', 'Số đơn hàng', 'Doanh thu']
    const rows = [
        ['Tiền mặt', salesReport.value.cash_orders || 0, salesReport.value.total_cash_sales || 0],
        ['Thẻ/QR', salesReport.value.card_orders || 0, salesReport.value.total_card_sales || 0],
        ['Tổng cộng', salesReport.value.total_orders || 0, salesReport.value.total_sales || 0]
    ]

    return [headers, ...rows].map(row => row.join(',')).join('\n')
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
}

function printReport() {
    window.print()
}

onMounted(() => {
    refreshReport()
})
</script>