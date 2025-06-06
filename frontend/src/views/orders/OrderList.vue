<template>
    <div class="p-6">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Order Management</h1>
            <button @click="openAddOrderModal" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Create New Order
            </button>
        </div>

        <!-- Search and Filter Section -->
        <div class="mb-6 flex gap-4">
            <div class="flex-1">
                <input type="text" v-model="searchQuery" placeholder="Search orders..."
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <select v-model="filterStatus"
                class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
            </select>
            <input type="date" v-model="filterDate"
                class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <!-- Order Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order
                            ID</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{{ order.id }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ order.customerName }}</div>
                            <div class="text-sm text-gray-500">{{ order.customerEmail }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ formatDate(order.date) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ order.items.length }} items
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${{ order.total.toFixed(2) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="[
                                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                            ]">
                                {{ order.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button @click="viewOrder(order.id)"
                                class="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button @click="editOrder(order)"
                                class="text-green-600 hover:text-green-900 mr-3">Edit</button>
                            <button @click="deleteOrder(order.id)"
                                class="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add/Edit Order Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div class="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">
                        {{ isEditing ? 'Edit Order' : 'Create New Order' }}
                    </h3>
                    <form @submit.prevent="submitForm" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Customer</label>
                                <select v-model="formData.customerId"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                                        {{ customer.name }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Status</label>
                                <select v-model="formData.status"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Items</label>
                            <div class="mt-2 space-y-2">
                                <div v-for="(item, index) in formData.items" :key="index" class="flex gap-2">
                                    <select v-model="item.productId"
                                        class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                        <option v-for="product in products" :key="product.id" :value="product.id">
                                            {{ product.name }} - ${{ product.price }}
                                        </option>
                                    </select>
                                    <input type="number" v-model="item.quantity" min="1"
                                        class="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    <button type="button" @click="removeItem(index)"
                                        class="text-red-600 hover:text-red-900">
                                        Remove
                                    </button>
                                </div>
                                <button type="button" @click="addItem" class="text-blue-600 hover:text-blue-900">
                                    + Add Item
                                </button>
                            </div>
                        </div>

                        <div class="flex justify-end space-x-3 mt-5">
                            <button type="button" @click="closeModal"
                                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                                Cancel
                            </button>
                            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                {{ isEditing ? 'Update' : 'Create' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

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
const formatDate = (date: Date) => {
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

const editOrder = (order: any) => {
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

const removeItem = (index: number) => {
    formData.value.items.splice(index, 1)
}

const submitForm = () => {
    // Implement form submission logic here
    console.log('Form submitted:', formData.value)
    closeModal()
}

const deleteOrder = (id: number) => {
    // Implement delete logic here
    console.log('Delete order:', id)
}

const viewOrder = (id: number) => {
    // Implement view order details logic here
    console.log('View order:', id)
}
</script>

<style scoped>
/* Add any custom styles here */
</style>