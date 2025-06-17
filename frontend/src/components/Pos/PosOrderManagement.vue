<template>
    <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold">Quản lý đơn hàng</h2>
            <div class="flex space-x-2">
                <select v-model="statusFilter" class="px-3 py-2 border rounded-lg text-sm">
                    <option value="">Tất cả trạng thái</option>
                    <option value="pending">Chờ xử lý</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                </select>
                <select v-model="paymentFilter" class="px-3 py-2 border rounded-lg text-sm">
                    <option value="">Tất cả phương thức</option>
                    <option value="cash">Tiền mặt</option>
                    <option value="card">Thẻ/QR</option>
                </select>
                <button @click="refreshOrders"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
                    Làm mới
                </button>
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full table-auto">
                <thead>
                    <tr class="bg-gray-50">
                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Mã đơn</th>
                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Khách hàng</th>
                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Tổng tiền</th>
                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Phương thức</th>
                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Trạng thái</th>
                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Thời gian</th>
                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in filteredOrders" :key="order.id" class="border-b hover:bg-gray-50">
                        <td class="px-4 py-3 text-sm font-medium">{{ order.order_number }}</td>
                        <td class="px-4 py-3 text-sm">{{ order.customer_name || 'Khách lẻ' }}</td>
                        <td class="px-4 py-3 text-sm font-semibold">{{ formatPrice(order.total) }}</td>
                        <td class="px-4 py-3 text-sm">
                            <span class="px-2 py-1 rounded-full text-xs"
                                :class="order.payment_method === 'cash' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'">
                                {{ order.payment_method === 'cash' ? 'Tiền mặt' : 'Thẻ/QR' }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-sm">
                            <select v-model="order.status" @change="handleStatusChange(order.id, order.status)"
                                class="px-2 py-1 border rounded text-xs" :class="getStatusClass(order.status)">
                                <option value="pending">Chờ xử lý</option>
                                <option value="processing">Đang xử lý</option>
                                <option value="completed">Hoàn thành</option>
                                <option value="cancelled">Đã hủy</option>
                            </select>
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-600">{{ formatDateTime(order.created_at) }}</td>
                        <td class="px-4 py-3 text-sm">
                            <div class="flex space-x-2">
                                <button @click="viewOrderDetails(order)"
                                    class="text-blue-600 hover:text-blue-800 text-xs">
                                    Chi tiết
                                </button>
                                <button v-if="order.status !== 'cancelled'" @click="handleCancelOrder(order.id)"
                                    class="text-red-600 hover:text-red-800 text-xs">
                                    Hủy
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Order Details Modal -->
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
                        <p><strong>Mã đơn:</strong> {{ selectedOrder.order_number }}</p>
                        <p><strong>Khách hàng:</strong> {{ selectedOrder.customer_name || 'Khách lẻ' }}</p>
                        <p><strong>Thời gian:</strong> {{ formatDateTime(selectedOrder.created_at) }}</p>
                        <p><strong>Phương thức:</strong> {{ selectedOrder.payment_method === 'cash' ? 'Tiền mặt' :
                            'Thẻ/QR' }}</p>
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

const { orders, fetchOrders, updateOrderStatus, cancelOrder, currentUser } = usePosStore()

const statusFilter = ref('')
const paymentFilter = ref('')
const showOrderDetails = ref(false)
const selectedOrder = ref(null)

const filteredOrders = computed(() => {
    return orders.value.filter(order => {
        const matchesStatus = !statusFilter.value || order.status === statusFilter.value
        const matchesPayment = !paymentFilter.value || order.payment_method === paymentFilter.value
        const matchesUser = order.staff_id === currentUser.value.id
        return matchesStatus && matchesPayment && matchesUser
    })
})

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price || 0)
}

function formatDateTime(dateString) {
    return new Date(dateString).toLocaleString('vi-VN')
}

function getStatusClass(status) {
    const classes = {
        pending: 'bg-yellow-100 text-yellow-700',
        processing: 'bg-blue-100 text-blue-700',
        completed: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700'
    }
    return classes[status] || 'bg-gray-100 text-gray-700'
}

async function handleStatusChange(orderId, newStatus) {
    try {
        await updateOrderStatus(orderId, newStatus)
        alert('Đã cập nhật trạng thái đơn hàng')
    } catch (error) {
        alert('Lỗi khi cập nhật trạng thái')
    }
}

async function handleCancelOrder(orderId) {
    if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
        try {
            await cancelOrder(orderId)
            alert('Đã hủy đơn hàng')
        } catch (error) {
            alert('Lỗi khi hủy đơn hàng')
        }
    }
}

function viewOrderDetails(order) {
    selectedOrder.value = order
    showOrderDetails.value = true
}

async function refreshOrders() {
    try {
        await fetchOrders()
    } catch (error) {
        alert('Lỗi khi tải danh sách đơn hàng')
    }
}

onMounted(() => {
    refreshOrders()
})
</script>