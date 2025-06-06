<template>
    <div class="p-6">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Customer Management</h1>
            <button @click="openAddCustomerModal" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Add New Customer
            </button>
        </div>

        <!-- Search and Filter Section -->
        <div class="mb-6 flex gap-4">
            <div class="flex-1">
                <input type="text" v-model="searchQuery" placeholder="Search customers..."
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <select v-model="filterType"
                class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Types</option>
                <option value="regular">Regular</option>
                <option value="vip">VIP</option>
                <option value="wholesale">Wholesale</option>
            </select>
        </div>

        <!-- Customer Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total
                            Orders</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="customer in filteredCustomers" :key="customer.id" class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="h-10 w-10 flex-shrink-0">
                                    <img class="h-10 w-10 rounded-full" :src="customer.avatar" alt="">
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">{{ customer.name }}</div>
                                    <div class="text-sm text-gray-500">{{ customer.email }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="[
                                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                customer.type === 'vip' ? 'bg-purple-100 text-purple-800' :
                                    customer.type === 'wholesale' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                            ]">
                                {{ customer.type }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div>{{ customer.phone }}</div>
                            <div>{{ customer.address }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ customer.totalOrders }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="[
                                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            ]">
                                {{ customer.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button @click="editCustomer(customer)"
                                class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                            <button @click="viewOrders(customer.id)"
                                class="text-green-600 hover:text-green-900 mr-3">Orders</button>
                            <button @click="deleteCustomer(customer.id)"
                                class="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add/Edit Customer Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">
                        {{ isEditing ? 'Edit Customer' : 'Add New Customer' }}
                    </h3>
                    <form @submit.prevent="submitForm" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" v-model="formData.name"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" v-model="formData.email"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="tel" v-model="formData.phone"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Address</label>
                            <textarea v-model="formData.address" rows="3"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Type</label>
                            <select v-model="formData.type"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                <option value="regular">Regular</option>
                                <option value="vip">VIP</option>
                                <option value="wholesale">Wholesale</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Status</label>
                            <select v-model="formData.status"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div class="flex justify-end space-x-3 mt-5">
                            <button type="button" @click="closeModal"
                                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                                Cancel
                            </button>
                            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                {{ isEditing ? 'Update' : 'Add' }}
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
const filterType = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const formData = ref({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'regular',
    status: 'active'
})

// Mock data - Replace with actual API calls
const customerList = ref([
    {
        id: 1,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1234567890',
        address: '123 Main St, City',
        type: 'vip',
        status: 'active',
        totalOrders: 15,
        avatar: 'https://via.placeholder.com/40'
    },
    // Add more mock data as needed
])

// Computed
const filteredCustomers = computed(() => {
    return customerList.value.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesType = !filterType.value || customer.type === filterType.value
        return matchesSearch && matchesType
    })
})

// Methods
const openAddCustomerModal = () => {
    isEditing.value = false
    formData.value = {
        name: '',
        email: '',
        phone: '',
        address: '',
        type: 'regular',
        status: 'active'
    }
    showModal.value = true
}

const editCustomer = (customer: any) => {
    isEditing.value = true
    formData.value = { ...customer }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
}

const submitForm = () => {
    // Implement form submission logic here
    console.log('Form submitted:', formData.value)
    closeModal()
}

const deleteCustomer = (id: number) => {
    // Implement delete logic here
    console.log('Delete customer:', id)
}

const viewOrders = (id: number) => {
    // Implement view orders logic here
    console.log('View orders for customer:', id)
}
</script>

<style scoped>
/* Add any custom styles here */
</style>