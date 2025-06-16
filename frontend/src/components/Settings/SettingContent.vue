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
                        <select v-model="formData.bankName" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="">Chọn ngân hàng</option>
                            <option value="VCB">Vietcombank</option>
                            <option value="TCB">Techcombank</option>
                            <option value="MB">MB Bank</option>
                            <option value="ACB">ACB</option>
                            <option value="VIB">VIB</option>
                            <option value="BIDV">BIDV</option>
                            <option value="VPB">VPBank</option>
                            <option value="SCB">SCB</option>
                            <option value="HDB">HDBank</option>
                            <option value="MSB">MSB</option>
                            <option value="TPB">TPBank</option>
                            <option value="SHB">SHB</option>
                            <option value="OCB">OCB</option>
                            <option value="VAB">VietABank</option>
                            <option value="NCB">NCB</option>
                            <option value="SGB">SGB</option>
                            <option value="BAB">BacABank</option>
                            <option value="PGB">PGBank</option>
                            <option value="GPB">GPBank</option>
                            <option value="AGB">Agribank</option>
                            <option value="SAC">Sacombank</option>
                            <option value="EIB">Eximbank</option>
                            <option value="LPB">LienVietPostBank</option>
                            <option value="ABB">ABBank</option>
                            <option value="BVB">BaoVietBank</option>
                            <option value="VCCB">VietCapitalBank</option>
                            <option value="KLB">KienLongBank</option>
                            <option value="NAB">NamABank</option>
                            <option value="PVB">PVcomBank</option>
                            <option value="UOB">UOB</option>
                            <option value="VNM">VietinBank</option>
                            <option value="VTB">VietBank</option>
                        </select>
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
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { usePayment } from '../../composables/usePayment'

const { loading, error, getQRInfo, createBankAccount, updateBankAccount, deleteBankAccount } = usePayment()

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
        const settings = [
            { key: 'bank_name', value: formData.value.bankName },
            { key: 'bank_account_no', value: formData.value.accountNumber },
            { key: 'bank_account_name', value: formData.value.accountHolder },
            { key: 'bank_branch', value: formData.value.branch },
            { key: 'bank_note', value: formData.value.note }
        ];

        await createBankAccount(settings);

        const newAccount = {
            id: Date.now(),
            bankName: formData.value.bankName,
            accountNumber: formData.value.accountNumber,
            accountHolder: formData.value.accountHolder,
            branch: formData.value.branch,
            note: formData.value.note
        };
        bankAccounts.value.push(newAccount);

        formData.value = {
            bankName: '',
            accountNumber: '',
            accountHolder: '',
            branch: '',
            note: ''
        };

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thêm tài khoản thành công!',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Có lỗi xảy ra!',
            text: error,
            showConfirmButton: true
        });
    }
};

const editAccount = async (account) => {
    try {
        const { value: formValues } = await Swal.fire({
            title: 'Sửa tài khoản',
            html: `
                <select id="bankName" class="swal2-select" required>
                    <option value="">Chọn ngân hàng</option>
                    <option value="VCB" ${account.bankName === 'VCB' ? 'selected' : ''}>Vietcombank</option>
                    <option value="TCB" ${account.bankName === 'TCB' ? 'selected' : ''}>Techcombank</option>
                    <option value="MB" ${account.bankName === 'MB' ? 'selected' : ''}>MB Bank</option>
                    <option value="ACB" ${account.bankName === 'ACB' ? 'selected' : ''}>ACB</option>
                    <option value="VIB" ${account.bankName === 'VIB' ? 'selected' : ''}>VIB</option>
                    <option value="BIDV" ${account.bankName === 'BIDV' ? 'selected' : ''}>BIDV</option>
                    <option value="VPB" ${account.bankName === 'VPB' ? 'selected' : ''}>VPBank</option>
                    <option value="SCB" ${account.bankName === 'SCB' ? 'selected' : ''}>SCB</option>
                    <option value="HDB" ${account.bankName === 'HDB' ? 'selected' : ''}>HDBank</option>
                    <option value="MSB" ${account.bankName === 'MSB' ? 'selected' : ''}>MSB</option>
                    <option value="TPB" ${account.bankName === 'TPB' ? 'selected' : ''}>TPBank</option>
                    <option value="SHB" ${account.bankName === 'SHB' ? 'selected' : ''}>SHB</option>
                    <option value="OCB" ${account.bankName === 'OCB' ? 'selected' : ''}>OCB</option>
                    <option value="VAB" ${account.bankName === 'VAB' ? 'selected' : ''}>VietABank</option>
                    <option value="NCB" ${account.bankName === 'NCB' ? 'selected' : ''}>NCB</option>
                    <option value="SGB" ${account.bankName === 'SGB' ? 'selected' : ''}>SGB</option>
                    <option value="BAB" ${account.bankName === 'BAB' ? 'selected' : ''}>BacABank</option>
                    <option value="PGB" ${account.bankName === 'PGB' ? 'selected' : ''}>PGBank</option>
                    <option value="GPB" ${account.bankName === 'GPB' ? 'selected' : ''}>GPBank</option>
                    <option value="AGB" ${account.bankName === 'AGB' ? 'selected' : ''}>Agribank</option>
                    <option value="SAC" ${account.bankName === 'SAC' ? 'selected' : ''}>Sacombank</option>
                    <option value="EIB" ${account.bankName === 'EIB' ? 'selected' : ''}>Eximbank</option>
                    <option value="LPB" ${account.bankName === 'LPB' ? 'selected' : ''}>LienVietPostBank</option>
                    <option value="ABB" ${account.bankName === 'ABB' ? 'selected' : ''}>ABBank</option>
                    <option value="BVB" ${account.bankName === 'BVB' ? 'selected' : ''}>BaoVietBank</option>
                    <option value="VCCB" ${account.bankName === 'VCCB' ? 'selected' : ''}>VietCapitalBank</option>
                    <option value="KLB" ${account.bankName === 'KLB' ? 'selected' : ''}>KienLongBank</option>
                    <option value="NAB" ${account.bankName === 'NAB' ? 'selected' : ''}>NamABank</option>
                    <option value="PVB" ${account.bankName === 'PVB' ? 'selected' : ''}>PVcomBank</option>
                    <option value="UOB" ${account.bankName === 'UOB' ? 'selected' : ''}>UOB</option>
                    <option value="VNM" ${account.bankName === 'VNM' ? 'selected' : ''}>VietinBank</option>
                    <option value="VTB" ${account.bankName === 'VTB' ? 'selected' : ''}>VietBank</option>
                </select>
                <input id="accountNumber" class="swal2-input" placeholder="Số tài khoản" value="${account.accountNumber}">
                <input id="accountHolder" class="swal2-input" placeholder="Chủ tài khoản" value="${account.accountHolder}">
                <input id="branch" class="swal2-input" placeholder="Chi nhánh" value="${account.branch || ''}">
                <textarea id="note" class="swal2-textarea" placeholder="Ghi chú">${account.note || ''}</textarea>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Lưu',
            cancelButtonText: 'Hủy',
            preConfirm: () => {
                return {
                    bankName: document.getElementById('bankName').value,
                    accountNumber: document.getElementById('accountNumber').value,
                    accountHolder: document.getElementById('accountHolder').value,
                    branch: document.getElementById('branch').value,
                    note: document.getElementById('note').value
                }
            }
        });

        if (formValues) {
            const settings = [
                { key: 'bank_name', value: formValues.bankName },
                { key: 'bank_account_no', value: formValues.accountNumber },
                { key: 'bank_account_name', value: formValues.accountHolder },
                { key: 'bank_branch', value: formValues.branch },
                { key: 'bank_note', value: formValues.note }
            ];

            await updateBankAccount(settings);

            const index = bankAccounts.value.findIndex(a => a.id === account.id);
            if (index !== -1) {
                bankAccounts.value[index] = {
                    ...account,
                    ...formValues
                };
            }

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cập nhật tài khoản thành công!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Có lỗi xảy ra!',
            text: error,
            showConfirmButton: true
        });
    }
};

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
        });

        if (result.isConfirmed) {
            const settings = [
                { key: 'bank_name', value: null },
                { key: 'bank_account_no', value: null },
                { key: 'bank_account_name', value: null },
                { key: 'bank_branch', value: null },
                { key: 'bank_note', value: null }
            ];

            await deleteBankAccount(settings);
            bankAccounts.value = bankAccounts.value.filter(a => a.id !== account.id);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đã xóa tài khoản!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Có lỗi xảy ra!',
            text: error,
            showConfirmButton: true
        });
    }
};

// Add this to fetch bank accounts when component is mounted
onMounted(async () => {
    try {
        const settings = await getQRInfo();
        if (settings.bank_code && settings.bank_account_no && settings.bank_account_name) {
            bankAccounts.value = [{
                id: 1,
                bankName: settings.bank_code,
                accountNumber: settings.bank_account_no,
                accountHolder: settings.bank_account_name,
                branch: settings.bank_branch,
                note: settings.bank_note
            }];
        }
    } catch (error) {
        console.error('Lỗi khi lấy thông tin tài khoản:', error);
    }
});
</script>

<style lang="scss" scoped></style>