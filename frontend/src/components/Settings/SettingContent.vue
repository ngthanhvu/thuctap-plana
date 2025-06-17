<template>
    <div class="p-6">
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Cài đặt tài khoản ngân hàng</h1>
            <p class="mt-2 text-sm text-gray-600">Quản lý thông tin tài khoản ngân hàng của cửa hàng</p>
        </div>

        <!-- Form tài khoản -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Thông tin tài khoản ngân hàng</h2>
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tên ngân hàng</label>
                        <select v-model="formData.bankName" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="">Chọn ngân hàng</option>
                            <option v-for="(name, code) in bankCodeToName" :key="code" :value="code">{{ name }}</option>
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
                <div class="flex justify-end space-x-3">
                    <button type="button" @click="deleteAccount"
                        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                        Xóa tài khoản
                    </button>
                    <button type="submit"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Lưu thông tin
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { usePayment } from '../../composables/usePayment'

const { loading, error, getQRInfo, createBankAccount, updateBankAccount, deleteBankAccount } = usePayment()

const bankCodeToName = {
    '970436': 'Vietcombank',
    '970407': 'Techcombank',
    '970422': 'MB Bank',
    '970416': 'ACB',
    '970441': 'VIB',
    '970418': 'BIDV',
    '970432': 'VPBank',
    '970429': 'SCB',
    '970437': 'HDBank',
    '970426': 'MSB',
    '970423': 'TPBank',
    '970443': 'SHB',
    '970448': 'OCB',
    '970425': 'VietABank',
    '970419': 'NCB',
    '970400': 'SGB',
    '970409': 'BacABank',
    '970430': 'PGBank',
    '970408': 'GPBank',
    '970405': 'Agribank',
    '970403': 'Sacombank',
    '970431': 'Eximbank',
    '970449': 'LienVietPostBank',
    '970438': 'BaoVietBank',
    '970454': 'VietCapitalBank',
    '970452': 'KienLongBank',
    '970428': 'Nam A Bank',
    '970412': 'PVcomBank',
    '970458': 'UOB',
    '970427': 'VietinBank',
    '970415': 'VietBank'
};

const numericToLetterCode = {
    '970436': 'VCB',
    '970407': 'TCB',
    '970422': 'MB',
    '970416': 'ACB',
    '970441': 'VIB',
    '970418': 'BIDV',
    '970432': 'VPB',
    '970429': 'SCB',
    '970437': 'HDB',
    '970426': 'MSB',
    '970423': 'TPB',
    '970443': 'SHB',
    '970448': 'OCB',
    '970425': 'VAB',
    '970419': 'NCB',
    '970400': 'SGB',
    '970409': 'BAB',
    '970430': 'PGB',
    '970408': 'GPB',
    '970405': 'AGB',
    '970403': 'SAC',
    '970431': 'EIB',
    '970449': 'LPB',
    '970438': 'BVB',
    '970454': 'VCCB',
    '970452': 'KLB',
    '970428': 'NAB',
    '970412': 'PVB',
    '970458': 'UOB',
    '970427': 'VNM',
    '970415': 'VTB'
};

const letterToNumericCode = {
    'VCB': '970436',
    'TCB': '970407',
    'MB': '970422',
    'ACB': '970416',
    'VIB': '970441',
    'BIDV': '970418',
    'VPB': '970432',
    'SCB': '970429',
    'HDB': '970437',
    'MSB': '970426',
    'TPB': '970423',
    'SHB': '970443',
    'OCB': '970448',
    'VAB': '970425',
    'NCB': '970419',
    'SGB': '970400',
    'BAB': '970409',
    'PGB': '970430',
    'GPB': '970408',
    'AGB': '970405',
    'SAC': '970403',
    'EIB': '970431',
    'LPB': '970449',
    'BVB': '970438',
    'VCCB': '970454',
    'KLB': '970452',
    'NAB': '970428',
    'PVB': '970412',
    'UOB': '970458',
    'VNM': '970427',
    'VTB': '970415'
};

const formData = ref({
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    branch: '',
    note: ''
})

const handleSubmit = async () => {
    try {
        const letterCode = numericToLetterCode[formData.value.bankName] || formData.value.bankName;

        const settings = [
            { key: 'bank_name', value: letterCode },
            { key: 'bank_account_no', value: formData.value.accountNumber },
            { key: 'bank_account_name', value: formData.value.accountHolder },
            { key: 'bank_branch', value: formData.value.branch },
            { key: 'bank_note', value: formData.value.note }
        ];

        if (formData.value.bankName && formData.value.accountNumber && formData.value.accountHolder) {
            await updateBankAccount(settings);
        } else {
            await createBankAccount(settings);
        }

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Lưu thông tin thành công!',
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

const deleteAccount = async () => {
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

onMounted(async () => {
    try {
        const settings = await getQRInfo();
        if (settings.bank_code && settings.bank_account_no && settings.bank_account_name) {
            const numericCode = letterToNumericCode[settings.bank_code] || settings.bank_code;

            formData.value = {
                bankName: numericCode,
                accountNumber: settings.bank_account_no,
                accountHolder: settings.bank_account_name,
                branch: settings.bank_branch,
                note: settings.bank_note
            };
        } else {
            console.log('Missing bank account info from API:', settings);
        }
    } catch (error) {
        console.error('Lỗi khi lấy thông tin tài khoản:', error);
    }
});
</script>

<style lang="scss" scoped></style>