<template>
    <div class="p-6">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Staff Management</h1>
            <button @click="openAddStaffModal" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Add New Staff
            </button>
        </div>

        <!-- Search and Filter Section -->
        <div class="mb-6 flex gap-4">
            <div class="flex-1">
                <input type="text" v-model="searchQuery" placeholder="Search staff..."
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <select v-model="filterDepartment"
                class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Departments</option>
                <option value="sales">Sales</option>
                <option value="support">Support</option>
                <option value="management">Management</option>
            </select>
        </div>

        <!-- Staff Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Position</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="staff in filteredStaff" :key="staff.id" class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="h-10 w-10 flex-shrink-0">
                                    <img class="h-10 w-10 rounded-full" :src="staff.avatar" alt="">
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">{{ staff.name }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ staff.position }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ staff.department }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ staff.email }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="[
                                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                staff.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            ]">
                                {{ staff.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button @click="editStaff(staff)"
                                class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                            <button @click="deleteStaff(staff.id)"
                                class="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add/Edit Staff Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">
                        {{ isEditing ? 'Edit Staff' : 'Add New Staff' }}
                    </h3>
                    <form @submit.prevent="submitForm" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" v-model="formData.name"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Position</label>
                            <input type="text" v-model="formData.position"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Department</label>
                            <select v-model="formData.department"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                <option value="sales">Sales</option>
                                <option value="support">Support</option>
                                <option value="management">Management</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" v-model="formData.email"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
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
const filterDepartment = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const formData = ref({
    name: '',
    position: '',
    department: '',
    email: '',
    status: 'active'
})

// Mock data - Replace with actual API calls
const staffList = ref([
    {
        id: 1,
        name: 'John Doe',
        position: 'Sales Manager',
        department: 'sales',
        email: 'john@example.com',
        status: 'active',
        avatar: 'https://via.placeholder.com/40'
    },
    // Add more mock data as needed
])

// Computed
const filteredStaff = computed(() => {
    return staffList.value.filter(staff => {
        const matchesSearch = staff.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            staff.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesDepartment = !filterDepartment.value || staff.department === filterDepartment.value
        return matchesSearch && matchesDepartment
    })
})

// Methods
const openAddStaffModal = () => {
    isEditing.value = false
    formData.value = {
        name: '',
        position: '',
        department: '',
        email: '',
        status: 'active'
    }
    showModal.value = true
}

const editStaff = (staff: any) => {
    isEditing.value = true
    formData.value = { ...staff }
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

const deleteStaff = (id: number) => {
    // Implement delete logic here
    console.log('Delete staff:', id)
}
</script>

<style scoped>
/* Add any custom styles here */
</style>