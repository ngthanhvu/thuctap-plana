<template>
    <div>
        <!-- Header Section -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Customer Management</h1>
                <p class="text-gray-600">Manage your customer database and relationships</p>
            </div>
            <button @click="navigateToCreate"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Add New Customer
            </button>
        </div>

        <!-- Modern Search and Filter Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div class="flex flex-col lg:flex-row gap-4">
                <!-- Search Input with Icon -->
                <div class="flex-1 relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input type="text" v-model="searchQuery" placeholder="Search customers..."
                        class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                </div>

                <!-- Filter Controls -->
                <div class="flex flex-col sm:flex-row gap-3">
                    <select v-model="filterRole"
                        class="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                        <option value="">All Types</option>
                        <option value="regular">Regular</option>
                        <option value="vip">VIP</option>
                        <option value="wholesale">Wholesale</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Staff Table -->
        <StaffTable :staff-list="filteredStaff" @edit-staff="editStaff" @delete-staff="confirmDelete" />

        <!-- Edit Staff Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div class="relative top-20 mx-auto p-5 border w-[500px] shadow-lg rounded-xl bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-semibold text-gray-900 mb-6">
                        Edit Staff Information
                    </h3>
                    <StaffForm :is-editing="true" :initial-data="formData" @submit="handleSubmit"
                        @cancel="closeModal" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import StaffForm from './StaffForm.vue'
import StaffTable from './StaffTable.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

interface Staff {
    id: number;
    name: string;
    email: string;
    role: string;
    phone: string;
    address: string;
    department: string;
    status: string;
    avatar?: string;
}

const router = useRouter()

// State
const searchQuery = ref('')
const filterRole = ref('')
const showModal = ref(false)
const formData = ref<Staff>({} as Staff)
const staffList = ref<Staff[]>([])

// Computed
const filteredStaff = computed(() => {
    return staffList.value.filter(staff => {
        const matchesSearch = staff.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            staff.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesRole = !filterRole.value || staff.role === filterRole.value
        return matchesSearch && matchesRole
    })
})

// Methods
const fetchStaffList = async () => {
    try {
        const response = await axios.get<Staff[]>('/api/staffs')
        staffList.value = response.data
    } catch (error) {
        console.log(error);
    }
}

const navigateToCreate = () => {
    router.push('/staff/create')
}

const editStaff = (staff: Staff) => {
    formData.value = { ...staff }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
}

const handleSubmit = async (data: Staff) => {
    try {
        await axios.put(`/api/staffs/${formData.value.id}`, data)
        Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            text: 'Cập nhật nhân viên thành công'
        })
        closeModal()
        fetchStaffList()
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: error.response?.data?.message || 'Có lỗi xảy ra'
        })
    }
}

const confirmDelete = async (id: number) => {
    const result = await Swal.fire({
        title: 'Bạn có chắc chắn?',
        text: "Bạn không thể hoàn tác sau khi xóa!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy'
    })

    if (result.isConfirmed) {
        try {
            await axios.delete(`/api/staffs/${id}`)
            Swal.fire({
                icon: 'success',
                title: 'Đã xóa!',
                text: 'Nhân viên đã được xóa thành công'
            })
            fetchStaffList()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: error.response?.data?.message || 'Không thể xóa nhân viên'
            })
        }
    }
}

// Fetch staff list when component is mounted
fetchStaffList()
</script>

<style scoped>
/* Add any custom styles here */
</style>