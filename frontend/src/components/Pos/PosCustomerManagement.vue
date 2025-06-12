<template>
    <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold">Quản lý khách hàng</h2>
            <button @click="showAddCustomerForm = true"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
                + Thêm khách hàng
            </button>
        </div>

        <div class="mb-4">
            <input v-model="searchQuery" type="text" placeholder="Tìm kiếm khách hàng..."
                class="w-full px-4 py-2 border rounded-lg text-sm">
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="customer in filteredCustomers" :key="customer.id"
                class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-semibold text-lg">{{ customer.name }}</h3>
                    <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {{ customer.points || 0 }} điểm
                    </span>
                </div>
                <div class="text-sm text-gray-600 space-y-1">
                    <p v-if="customer.phone">📞 {{ customer.phone }}</p>
                    <p v-if="customer.email">✉️ {{ customer.email }}</p>
                    <p>📅 Tham gia: {{ formatDate(customer.created_at) }}</p>
                </div>
                <div class="mt-3 flex space-x-2">
                    <button @click="editCustomer(customer)" class="text-blue-600 hover:text-blue-800 text-sm">
                        Sửa
                    </button>
                    <button @click="viewCustomerHistory(customer)" class="text-green-600 hover:text-green-800 text-sm">
                        Lịch sử
                    </button>
                </div>
            </div>
        </div>

        <!-- Add/Edit Customer Modal -->
        <div v-if="showAddCustomerForm"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg w-96 max-w-md">
                <h3 class="text-lg font-bold text-gray-800 mb-4">
                    {{ editingCustomer ? 'Sửa khách hàng' : 'Thêm khách hàng mới' }}
                </h3>
                <form @submit.prevent="handleSubmitCustomer">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Tên khách hàng *</label>
                        <input v-model="customerForm.name" type="text" required
                            class="w-full px-3 py-2 border rounded-lg text-gray-800" placeholder="Nhập tên khách hàng">
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                        <input v-model="customerForm.phone" type="tel"
                            class="w-full px-3 py-2 border rounded-lg text-gray-800" placeholder="Nhập số điện thoại">
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input v-model="customerForm.email" type="email"
                            class="w-full px-3 py-2 border rounded-lg text-gray-800" placeholder="Nhập email">
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                        <textarea v-model="customerForm.address"
                            class="w-full px-3 py-2 border rounded-lg text-gray-800" placeholder="Nhập địa chỉ"
                            rows="2"></textarea>
                    </div>
                    <div class="flex space-x-3">
                        <button type="submit"
                            class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg">
                            {{ editingCustomer ? 'Cập nhật' : 'Thêm' }}
                        </button>
                        <button type="button" @click="closeCustomerForm"
                            class="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg">
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePosStore } from '../../composables/usePos'

const { customers, fetchCustomers, createCustomer } = usePosStore()

const searchQuery = ref('')
const showAddCustomerForm = ref(false)
const editingCustomer = ref(null)
const customerForm = ref({
    name: '',
    phone: '',
    email: '',
    address: ''
})

const filteredCustomers = computed(() => {
    if (!searchQuery.value) return customers.value
    return customers.value.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (customer.phone && customer.phone.includes(searchQuery.value)) ||
        (customer.email && customer.email.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
})

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('vi-VN')
}

function editCustomer(customer) {
    editingCustomer.value = customer
    customerForm.value = { ...customer }
    showAddCustomerForm.value = true
}

function viewCustomerHistory(customer) {
    // TODO: Implement customer history view
    alert(`Lịch sử mua hàng của ${customer.name} đang được phát triển`)
}

async function handleSubmitCustomer() {
    try {
        if (editingCustomer.value) {
            // TODO: Implement update customer API
            alert('Tính năng sửa khách hàng đang được phát triển')
        } else {
            await createCustomer(customerForm.value)
            alert('Đã thêm khách hàng mới thành công!')
        }
        closeCustomerForm()
    } catch (error) {
        alert(`Lỗi: ${error.message}`)
    }
}

function closeCustomerForm() {
    showAddCustomerForm.value = false
    editingCustomer.value = null
    customerForm.value = {
        name: '',
        phone: '',
        email: '',
        address: ''
    }
}

onMounted(() => {
    fetchCustomers()
})
</script>