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
                <input type="text" v-model="searchQuery" placeholder="Tìm kiém đơn hàng..."
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
            </div>

            <!-- Filter Controls -->
            <div class="flex flex-col sm:flex-row gap-3">
                <select v-model="filterStatus"
                    class="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                    <option value="">Tất cả trạng thái</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <input type="date" v-model="filterDate"
                    class="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
            </div>
        </div>
    </div>

    <!-- Order Table -->
    <OrderTable :orders="filteredOrders" @view-order="viewOrder" @edit-order="editOrder" @delete-order="deleteOrder" />
</template>

<script setup>
import { ref, computed } from 'vue'
import OrderTable from './OrderTable.vue'

// State
const searchQuery = ref('')
const filterStatus = ref('')
const filterDate = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const formData = ref({
    customerId: '',
    status: 'pending',
    items: [{ productId: '', quantity: 1 }]
})

// Mock data - Replace with actual API calls
const orders = ref([
    {
        id: 1,
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        date: new Date(),
        items: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 }
        ],
        total: 299.99,
        status: 'processing'
    },
    // Add more mock data as needed
])

const customers = ref([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
])

const products = ref([
    { id: 1, name: 'Product 1', price: 99.99 },
    { id: 2, name: 'Product 2', price: 149.99 }
])

// Computed
const filteredOrders = computed(() => {
    return orders.value.filter(order => {
        const matchesSearch = order.id.toString().includes(searchQuery.value) ||
            order.customerName.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesStatus = !filterStatus.value || order.status === filterStatus.value
        const matchesDate = !filterDate.value || formatDate(order.date) === filterDate.value
        return matchesSearch && matchesStatus && matchesDate
    })
})

// Methods
const formatDate = (date) => {
    return date.toLocaleDateString()
}

const openAddOrderModal = () => {
    isEditing.value = false
    formData.value = {
        customerId: '',
        status: 'pending',
        items: [{ productId: '', quantity: 1 }]
    }
    showModal.value = true
}

const editOrder = (order) => {
    isEditing.value = true
    formData.value = { ...order }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
}

const addItem = () => {
    formData.value.items.push({ productId: '', quantity: 1 })
}

const removeItem = (index) => {
    formData.value.items.splice(index, 1)
}

const submitForm = () => {
    // Implement form submission logic here
    console.log('Form submitted:', formData.value)
    closeModal()
}

const deleteOrder = (id) => {
    // Implement delete logic here
    console.log('Delete order:', id)
}

const viewOrder = (id) => {
    // Implement view order details logic here
    console.log('View order:', id)
}
</script>

<style scoped>
/* Theme shadows */
.shadow-theme-xs {
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

/* Focus ring styles */
.focus\:ring-3:focus {
    box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
}

.focus\:outline-hidden:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
</style>