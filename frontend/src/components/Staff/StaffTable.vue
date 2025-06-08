<template>
    <!-- Loading State -->
    <div v-if="loading && !staffList.length" class="flex justify-center items-center py-12">
        <div class="flex flex-col items-center">
            <svg class="animate-spin h-8 w-8 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
            <p class="text-gray-600">Đang tải danh sách nhân viên...</p>
        </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="flex items-center">
            <svg class="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-red-700">{{ error }}</p>
            <button @click="fetchStaffList"
                class="ml-auto px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                Thử lại
            </button>
        </div>
    </div>

    <!-- Staff Table -->
    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            #
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Thông tin
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Số điện thoại
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Vai trò
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Trạng thái
                        </th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="staff in filteredStaff" :key="staff.id"
                        class="hover:bg-gray-50 transition-colors duration-150">
                        <td class="px-6 py-4">
                            <div class="text-sm font-semibold text-gray-900">#{{ staff.id }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="ml-4">
                                    <div class="text-sm font-semibold text-gray-900">{{ staff.name }}</div>
                                    <div class="text-sm text-gray-500">{{ staff.email }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <div class="font-medium">{{ staff.phone }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="[
                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                staff.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                    staff.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                            ]">
                                <span :class="[
                                    'w-1.5 h-1.5 mr-1.5 rounded-full',
                                    staff.role === 'admin' ? 'bg-purple-400' :
                                        staff.role === 'manager' ? 'bg-blue-400' :
                                            'bg-gray-400'
                                ]"></span>
                                {{ staff.role }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="[
                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                staff.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            ]">
                                <span :class="[
                                    'w-1.5 h-1.5 mr-1.5 rounded-full',
                                    staff.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                                ]"></span>
                                {{ staff.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div class="flex items-center space-x-3">
                                <button @click="handleEdit(staff)"
                                    class="inline-flex items-center p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                                    title="Edit Staff">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                        </path>
                                    </svg>
                                </button>
                                <button @click="handleDelete(staff.id)"
                                    class="inline-flex items-center p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors duration-150"
                                    title="Delete Staff">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="filteredStaff.length == 0 && !loading">
                        <td colspan="5" class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {{ searchQuery || filterRole ? 'Không tìm thấy nhân viên phù hợp' : 'Không có nhân viên' }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAuth } from '../../composables/useAuth'

const router = useRouter()
const { getListInfo, loading, error } = useAuth()

// Props for search and filter from parent
const props = defineProps({
    searchQuery: {
        type: String,
        default: ''
    },
    filterRole: {
        type: String,
        default: ''
    }
})

// Local state
const staffList = ref([])

// Computed filtered staff based on props
const filteredStaff = computed(() => {
    return staffList.value.filter(staff => {
        const matchesSearch = staff.name.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
            staff.email.toLowerCase().includes(props.searchQuery.toLowerCase())
        const matchesRole = !props.filterRole || staff.role === props.filterRole
        return matchesSearch && matchesRole
    })
})

// Methods
const fetchStaffList = async () => {
    try {
        const data = await getListInfo()
        staffList.value = data || []
    } catch (err) {
        console.error('Error fetching staff list:', err)
        staffList.value = []
    }
}

const handleEdit = (staff) => {
    router.push(`/staff/${staff.id}/edit`)
}

const handleDelete = async (id) => {
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
            // Refresh the list after deletion
            await fetchStaffList()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: error.response?.data?.message || 'Không thể xóa nhân viên'
            })
        }
    }
}

// Expose refresh method to parent
defineExpose({
    refreshList: fetchStaffList
})

// Fetch staff list when component is mounted
onMounted(() => {
    fetchStaffList()
})
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
    height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>