<template>
    <div>
        <!-- Header Section -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Quản lý nhân viên</h1>
                <p class="text-gray-600">Quản lý nhân viên có trong hệ thống</p>
            </div>
            <button @click="navigateToCreate"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Thêm nhân viên mới
            </button>
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
                    <input type="text" v-model="searchQuery" placeholder="Tìm kiếm nhân viên..."
                        class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-200 focus:border-gray-200 transition-colors duration-200">
                </div>

                <!-- Filter Controls -->
                <div class="flex flex-col sm:flex-row gap-3">
                    <select v-model="filterRole"
                        class="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 transition-colors duration-200">
                        <option value="">Tất cả</option>
                        <option value="admin">Quản lý</option>
                        <option value="staff">Nhân viên</option>
                    </select>
                    <button @click="refreshStaffTable"
                        class="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                        Làm mới
                    </button>
                </div>
            </div>
        </div>

        <!-- Staff Table Component -->
        <StaffTable ref="staffTableRef" :search-query="searchQuery" :filter-role="filterRole" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import StaffTable from './StaffTable.vue'

const router = useRouter()
const staffTableRef = ref(null)

// Search and filter state
const searchQuery = ref('')
const filterRole = ref('')

// Methods
const navigateToCreate = () => {
    router.push('/staff/create')
}

const refreshStaffTable = () => {
    if (staffTableRef.value) {
        staffTableRef.value.refreshList()
    }
}
</script>

<style scoped></style>