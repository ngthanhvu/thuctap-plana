<template>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Quản lý đơn hàng</h1>
            <p class="text-gray-600">Quản lý đơn hàng của bạn và theo dõi trạng thái</p>
        </div>
    </div>

    <!-- Modern Search and Filter Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-3 mb-3">
        <div class="flex flex-col lg:flex-row gap-4">
            <!-- Search Input with Icon -->
            <div class="flex-1 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input type="text" v-model="searchQuery" placeholder="Tìm kiếm đơn hàng..."
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
            </div>

            <!-- Filter Controls -->
            <div class="flex flex-col sm:flex-row gap-3">
                <select v-model="dateFilter"
                    class="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                    <option value="today">Hôm nay</option>
                    <option value="yesterday">Hôm qua</option>
                    <option value="week">Tuần này</option>
                    <option value="month">Tháng này</option>
                    <option value="all">Tất cả</option>
                </select>
                <select v-model="filterStatus"
                    class="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                    <option value="">Tất cả trạng thái</option>
                    <option value="pending">Chờ xử lý</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Loading Indicator -->
    <div v-if="loading" class="flex justify-center my-8">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
    </div>

    <!-- Order Table -->
    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Mã đơn
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Thời gian
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Nhân viên
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Khách hàng
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Phương thức
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Tổng tiền
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Trạng thái
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="order in filteredOrders" :key="order.id"
                        class="hover:bg-gray-50 transition-colors duration-150">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="text-sm font-medium text-gray-900">#{{ order.id }}</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ formatDateTime(order.created_at) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="h-8 w-8 flex-shrink-0">
                                    <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span class="text-sm font-medium text-blue-600">
                                            {{ getStaffInitials(order.staff?.name) }}
                                        </span>
                                    </div>
                                </div>
                                <div class="ml-3">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ order.staff?.name || 'Không xác định' }}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ order.customer?.name || 'Khách lẻ' }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="[
                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                order.payment_method === 'cash' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            ]">
                                {{ getPaymentMethodText(order.payment_method) }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ formatPrice(order.total) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="[
                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                getStatusClass(order.status)
                            ]">
                                {{ getStatusText(order.status) }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div class="flex items-center space-x-3">
                                <button @click="viewOrderDetails(order)"
                                    class="inline-flex items-center p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                                    title="Xem chi tiết">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                        </path>
                                    </svg>
                                </button>
                                <button @click="editOrder(order)"
                                    class="inline-flex items-center p-1.5 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors duration-150"
                                    title="Chỉnh sửa">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                        </path>
                                    </svg>
                                </button>
                                <button @click="deleteOrder(order.id)"
                                    class="inline-flex items-center p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors duration-150"
                                    title="Xóa">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="orders.length === 0">
                        <td colspan="8" class="text-center px-6 py-4 whitespace-nowrap">
                            <div class="flex justify-center text-center">
                                <span class="text-sm font-medium text-gray-500">Không có dữ liệu</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal Chi tiết đơn hàng -->
    <div v-if="showOrderDetails" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg w-96 max-w-md max-h-96 overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold">Chi tiết đơn hàng</h3>
                <button @click="showOrderDetails = false" class="text-gray-500 hover:text-gray-700">
                    ✕
                </button>
            </div>
            <div v-if="selectedOrder">
                <div class="mb-4">
                    <p><strong>Mã đơn:</strong> #{{ selectedOrder.id }}</p>
                    <p><strong>Nhân viên:</strong> {{ order.staff?.name || 'Không xác định' }}</p>
                    <p><strong>Khách hàng:</strong> {{ selectedOrder.customer?.name || 'Khách lẻ' }}</p>
                    <p><strong>Thời gian:</strong> {{ formatDateTime(selectedOrder.created_at) }}</p>
                    <p><strong>Phương thức:</strong> {{ getPaymentMethodText(selectedOrder.payment_method) }}</p>
                    <p><strong>Trạng thái:</strong> {{ getStatusText(selectedOrder.status) }}</p>
                </div>
                <div class="mb-4">
                    <h4 class="font-semibold mb-2">Sản phẩm:</h4>
                    <div v-for="item in selectedOrder.items" :key="item.id" class="flex justify-between text-sm mb-1">
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOrders } from '../../composables/useOrders'

const { orders, loading, error, getOrderList, deleteOrder: removeOrder, getStaffInitials } = useOrders()

const searchQuery = ref('')
const filterStatus = ref('')
const dateFilter = ref('today')
const showOrderDetails = ref(false)
const selectedOrder = ref(null)

onMounted(async () => {
    await getOrderList()
})

const filteredOrders = computed(() => {
    return orders.value.filter(order => {
        const matchesSearch = order.id.toString().includes(searchQuery.value) ||
            (order.customer?.name || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            (order.staff?.name || '').toLowerCase().includes(searchQuery.value.toLowerCase())

        const matchesStatus = !filterStatus.value || order.status === filterStatus.value

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

        return matchesSearch && matchesStatus && matchesDate
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

const editOrder = (order) => {
    console.log('Edit order:', order)
}

const deleteOrder = async (id) => {
    try {
        await removeOrder(id)
        console.log('Order deleted successfully:', id)
    } catch (error) {
        console.error('Error deleting order:', error)
    }
}
</script>

<style scoped>
/* Custom Scrollbar */
.scrollbar-thin::-webkit-scrollbar {
    height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>