<template>
    <div class="p-6">
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Cài đặt tài khoản ngân hàng</h1>
            <p class="mt-2 text-sm text-gray-600">Quản lý thông tin tài khoản ngân hàng của cửa hàng</p>
        </div>

        <!-- Form thêm tài khoản -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Thêm tài khoản mới</h2>
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tên ngân hàng</label>
                        <input v-model="formData.bankName" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="VD: Vietcombank">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Số tài khoản</label>
                        <input v-model="formData.accountNumber" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="VD: 1234567890">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Chủ tài khoản</label>
                        <input v-model="formData.accountHolder" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="VD: NGUYEN VAN A">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Chi nhánh</label>
                        <input v-model="formData.branch" type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="VD: Chi nhánh Hà Nội">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                    <textarea v-model="formData.note" rows="3"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Thông tin bổ sung về tài khoản"></textarea>
                </div>
                <div class="flex justify-end">
                    <button type="submit"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Thêm tài khoản
                    </button>
                </div>
            </form>
        </div>

        <!-- Danh sách tài khoản -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Danh sách tài khoản</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngân hàng
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Số tài khoản
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Chủ tài khoản
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Chi nhánh
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ghi chú
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="account in bankAccounts" :key="account.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {{ account.bankName }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ account.accountNumber }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ account.accountHolder }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ account.branch }}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500">
                                {{ account.note }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button @click="editAccount(account)"
                                    class="text-blue-600 hover:text-blue-900 mr-3">Sửa</button>
                                <button @click="deleteAccount(account)"
                                    class="text-red-600 hover:text-red-900">Xóa</button>
                            </td>
                        </tr>
                        <tr v-if="bankAccounts.length === 0">
                            <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                                Chưa có tài khoản ngân hàng nào
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'

const formData = ref({
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    branch: '',
    note: ''
})

const bankAccounts = ref([])

const handleSubmit = async () => {
    try {
        // TODO: Implement API call to save bank account
        const newAccount = { ...formData.value, id: Date.now() }
        bankAccounts.value.push(newAccount)

        // Reset form
        formData.value = {
            bankName: '',
            accountNumber: '',
            accountHolder: '',
            branch: '',
            note: ''
        }

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thêm tài khoản thành công!',
            showConfirmButton: false,
            timer: 1500
        })
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Có lỗi xảy ra!',
            text: error.message,
            showConfirmButton: true
        })
    }
}

const editAccount = (account) => {
    // TODO: Implement edit functionality
    console.log('Edit account:', account)
}

const deleteAccount = async (account) => {
    try {
        const result = await Swal.fire({
            title: 'Xác nhận xóa?',
            text: "Bạn không thể hoàn tác sau khi xóa!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        })

        if (result.isConfirmed) {
            // TODO: Implement API call to delete bank account
            bankAccounts.value = bankAccounts.value.filter(a => a.id !== account.id)

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đã xóa tài khoản!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Có lỗi xảy ra!',
            text: error.message,
            showConfirmButton: true
        })
    }
}
</script>

<style lang="scss" scoped></style>