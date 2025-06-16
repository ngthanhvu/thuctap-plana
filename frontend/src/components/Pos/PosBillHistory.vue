<template>
    <div class="bg-white rounded-xl shadow-lg p-6 mt-[30px]">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-xl font-semibold text-gray-900">Lịch Sử Hóa Đơn</h1>
                <p class="mt-2 text-sm text-gray-700">Danh sách tất cả các giao dịch trong hệ thống</p>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button @click="exportBillHistory" type="button"
                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto">
                    Xuất CSV
                </button>
            </div>
        </div>

        <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <div class="relative w-full">
                    <input type="text" v-model="searchQuery"
                        class="w-full px-5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Tìm kiếm...">
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <select v-model="dateFilter"
                    class="w-full px-5 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    <option value="today">Hôm nay</option>
                    <option value="yesterday">Hôm qua</option>
                    <option value="week">Tuần này</option>
                    <option value="month">Tháng này</option>
                    <option value="all">Tất cả</option>
                </select>
            </div>
            <button @click="refreshBillHistory"
                class="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Làm mới
            </button>
        </div>

        <!-- Table -->
        <div class="mt-8 flex flex-col">
            <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                    <div class="border border-gray-200 rounded-lg overflow-hidden">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="py-3 ps-4">
                                        <div class="flex items-center h-5">
                                            <input id="hs-table-checkbox-all" type="checkbox"
                                                class="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500">
                                            <label for="hs-table-checkbox-all" class="sr-only">Checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                        Mã đơn
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                        Thời gian
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                        Khách hàng
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                        Phương thức
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                        Tổng tiền
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                        Trạng thái
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
                                    <td class="py-3 ps-4">
                                        <div class="flex items-center h-5">
                                            <input :id="'hs-table-checkbox-' + order.id" type="checkbox"
                                                class="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500">
                                            <label :for="'hs-table-checkbox-' + order.id"
                                                class="sr-only">Checkbox</label>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                        {{ order.order_number || order.id }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        {{ formatDateTime(order.created_at) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        {{ order.customer?.name || 'Khách lẻ' }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span
                                            :class="[order.payment_method === 'cash' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800', 'inline-flex rounded-full px-2 text-xs font-semibold leading-5']">
                                            {{ getPaymentMethodText(order.payment_method) }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        {{ formatPrice(order.total) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span
                                            :class="[getStatusClass(order.status), 'inline-flex rounded-full px-2 text-xs font-semibold leading-5']">
                                            {{ getStatusText(order.status) }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                        <button @click="viewOrderDetails(order)" type="button"
                                            class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">
                                            Chi tiết
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="filteredOrders.length === 0">
                                    <td colspan="9" class="px-6 py-4 text-center text-sm text-gray-500">
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div class="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div class="flex flex-1 justify-between sm:hidden">
                <button
                    class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Trước
                </button>
                <button
                    class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Sau
                </button>
            </div>
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p class="text-sm text-gray-700">
                        Hiển thị <span class="font-medium">1</span> đến <span class="font-medium">{{
                            filteredOrders.length > 10 ? 10 : filteredOrders.length }}</span> của <span
                            class="font-medium">{{ filteredOrders.length }}</span> kết quả
                    </p>
                </div>
                <div>
                    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span class="sr-only">Trước</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                        <button aria-current="page"
                            class="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                            1
                        </button>
                        <button
                            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span class="sr-only">Sau</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>

        <!-- Modal Chi tiết hóa đơn -->
        <div v-if="showOrderDetails"
            class="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg w-96 max-w-md max-h-100 overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold">Chi tiết hóa đơn</h3>
                    <button @click="showOrderDetails = false" class="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>
                <div v-if="selectedOrder">
                    <div class="mb-4">
                        <p><strong>Mã đơn:</strong> {{ selectedOrder.order_number || selectedOrder.id }}</p>
                        <p><strong>Thời gian:</strong> {{ formatDateTime(selectedOrder.created_at) }}</p>
                        <p><strong>Khách hàng:</strong> {{ selectedOrder.customer?.name || 'Khách lẻ' }}</p>
                        <p><strong>Phương thức:</strong> {{ getPaymentMethodText(selectedOrder.payment_method) }}</p>
                        <p><strong>Trạng thái:</strong> {{ getStatusText(selectedOrder.status) }}</p>
                    </div>
                    <div class="mb-4">
                        <h4 class="font-semibold mb-2">Sản phẩm:</h4>
                        <div v-for="item in selectedOrder.items" :key="item.id"
                            class="flex justify-between text-sm mb-1">
                            <span>{{ item.product_name }} x{{ item.quantity }}</span>
                            <span>{{ formatPrice(item.unit_price * item.quantity) }}</span>
                        </div>
                    </div>
                    <div class="border-t pt-2">
                        <div class="flex justify-between text-sm mb-1">
                            <span>Tạm tính:</span>
                            <span>{{ formatPrice(selectedOrder.subtotal) }}</span>
                        </div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Giảm giá:</span>
                            <span class="text-red-500">-{{ formatPrice(selectedOrder.discount) }}</span>
                        </div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Thuế:</span>
                            <span>{{ formatPrice(selectedOrder.tax) }}</span>
                        </div>
                        <div class="flex justify-between font-bold">
                            <span>Tổng:</span>
                            <span>{{ formatPrice(selectedOrder.total) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePosStore } from '../../composables/usePos'

const { orders, fetchOrders } = usePosStore()

const dateFilter = ref('today')
const searchQuery = ref('')
const showOrderDetails = ref(false)
const selectedOrder = ref(null)

const filteredOrders = computed(() => {
    return orders.value.filter(order => {
        let matchesDate = true
        if (dateFilter.value !== 'all') {
            const orderDate = new Date(order.created_at)
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            const yesterday = new Date(today)
            yesterday.setDate(yesterday.getDate() - 1)

            const weekStart = new Date(today)
            weekStart.setDate(weekStart.getDate() - weekStart.getDay())

            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)

            if (dateFilter.value === 'today') {
                matchesDate = orderDate >= today
            } else if (dateFilter.value === 'yesterday') {
                matchesDate = orderDate >= yesterday && orderDate < today
            } else if (dateFilter.value === 'week') {
                matchesDate = orderDate >= weekStart
            } else if (dateFilter.value === 'month') {
                matchesDate = orderDate >= monthStart
            }
        }

        const searchTerm = searchQuery.value.toLowerCase()
        const matchesSearch = !searchTerm ||
            (order.order_number && order.order_number.toLowerCase().includes(searchTerm)) ||
            (order.customer?.name && order.customer.name.toLowerCase().includes(searchTerm))

        return matchesDate && matchesSearch
    })
})

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price || 0)
}

function formatDateTime(dateString) {
    if (!dateString) return ''
    return new Date(dateString).toLocaleString('vi-VN')
}

function getPaymentMethodText(method) {
    const methods = {
        'cash': 'Tiền mặt',
        'card': 'Thẻ',
        'qr': 'QR Code'
    }
    return methods[method] || method
}

function getStatusText(status) {
    const statuses = {
        'pending': 'Chờ xử lý',
        'processing': 'Đang xử lý',
        'completed': 'Hoàn thành',
        'cancelled': 'Đã hủy'
    }
    return statuses[status] || status
}

function getStatusClass(status) {
    const classes = {
        'pending': 'bg-yellow-100 text-yellow-700',
        'processing': 'bg-blue-100 text-blue-700',
        'completed': 'bg-green-100 text-green-700',
        'cancelled': 'bg-red-100 text-red-700'
    }
    return classes[status] || 'bg-gray-100 text-gray-700'
}

function viewOrderDetails(order) {
    selectedOrder.value = order
    showOrderDetails.value = true
}

async function refreshBillHistory() {
    try {
        await fetchOrders()
    } catch (error) {
        alert('Lỗi khi tải lịch sử hóa đơn')
    }
}

function exportBillHistory() {
    const headers = ['Mã đơn', 'Thời gian', 'Khách hàng', 'Phương thức', 'Tổng tiền', 'Trạng thái']

    const rows = filteredOrders.value.map(order => [
        order.order_number || order.id,
        formatDateTime(order.created_at),
        order.customer?.name || 'Khách lẻ',
        getPaymentMethodText(order.payment_method),
        order.total,
        getStatusText(order.status)
    ])

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `lich-su-hoa-don-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
}

onMounted(() => {
    refreshBillHistory()
})
</script>