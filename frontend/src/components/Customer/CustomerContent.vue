<template>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Quản lý khách hàng</h1>
            <p class="text-gray-600">Quản lý cơ sở dữ liệu khách hàng</p>
        </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-3 mb-3">
        <div class="flex flex-col lg:flex-row gap-4">
            <div class="flex-1 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input type="text" v-model="searchQuery" placeholder="Tìm kiếm khách hàng..."
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
                <select v-model="filterType"
                    class="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                    <option value="">Tất cả</option>
                    <!-- <option value="regular">Regular</option> -->
                    <!-- <option value="vip">VIP</option> -->
                    <!-- <option value="wholesale">Wholesale</option> -->
                </select>
            </div>
        </div>
    </div>

    <CustomerTable :customers="filteredCustomers" @delete-customer="handleDeleteCustomer" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CustomerTable from './CustomerTable.vue'
import { useCustomer } from '../../composables/useCustomer'

const { getCustomerList, loading, errors, deleteCustomer } = useCustomer()

const searchQuery = ref('')
const filterType = ref('')
const customerList = ref([])

const loadCustomers = async () => {
    try {
        const data = await getCustomerList()
        customerList.value = data
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu khách hàng:', error)
    }
}

onMounted(async () => {
    await loadCustomers()
})

const filteredCustomers = computed(() => {
    return customerList.value.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesType = !filterType.value || customer.type === filterType.value
        return matchesSearch && matchesType
    })
})

const handleDeleteCustomer = async (id) => {
    try {
        await deleteCustomer(id)
        await loadCustomers() // Gọi hàm loadCustomers để cập nhật lại danh sách
    } catch (error) {
        console.error('Lỗi khi xóa khách hàng:', error)
    }
}

</script>

<style scoped></style>