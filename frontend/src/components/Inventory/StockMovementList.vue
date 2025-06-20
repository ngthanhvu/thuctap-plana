<template>
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Danh sách phiếu nhập/xuất</h1>
        <p class="text-gray-600">Quản lý và theo dõi các phiếu nhập/xuất kho</p>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span class="ml-2 text-gray-600">Đang tải dữ liệu...</span>
    </div>

    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Mã phiếu
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Loại
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Người tạo
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Ngày tạo
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Số sản phẩm
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Ghi chú
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Thao tác
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(movement, index) in stockMovements" :key="movement.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="text-sm font-medium text-gray-900">#{{ index + 1 }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span :class="[
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                            movement.type === 'import'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        ]">
                            {{ movement.type === 'import' ? 'Nhập kho' : 'Xuất kho' }}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="text-sm text-gray-900">{{ movement.creator?.name || 'N/A' }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="text-sm text-gray-900">{{ formatDate(movement.created_at) }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="text-sm text-gray-900">{{ movement.items?.length || 0 }} sản phẩm</span>
                    </td>
                    <td class="px-6 py-4">
                        <span class="text-sm text-gray-900">{{ movement.note || '-' }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button @click="viewDetails(movement)" class="text-blue-600 hover:text-blue-900 mr-3">
                            Xem chi tiết
                        </button>
                        <button @click="printReceipt(movement)" class="text-green-600 hover:text-green-900">
                            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z">
                                </path>
                            </svg>
                            In phiếu
                        </button>
                    </td>
                </tr>
                <tr v-if="stockMovements.length === 0">
                    <td colspan="8" class="text-center px-6 py-4 whitespace-nowrap">
                        <div class="flex justify-center text-center">
                            <span class="text-sm font-medium text-gray-500">Không có dữ liệu</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Movement Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 backdrop-blur-sm bg-black/30 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 w-3/4 max-w-4xl shadow-lg rounded-md bg-white">
            <div class="mt-3">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">
                        Chi tiết phiếu #{{ selectedMovement?.id }}
                    </h3>
                    <button @click="closeDetailsModal" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div v-if="selectedMovement" class="mb-6">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Loại giao dịch</label>
                            <span :class="[
                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1',
                                selectedMovement.type === 'import'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            ]">
                                {{ selectedMovement.type === 'import' ? 'Nhập kho' : 'Xuất kho' }}
                            </span>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Người tạo</label>
                            <p class="mt-1 text-sm text-gray-900">{{ selectedMovement.creator?.name || 'N/A' }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Ngày tạo</label>
                            <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedMovement.created_at) }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Ghi chú</label>
                            <p class="mt-1 text-sm text-gray-900">{{ selectedMovement.note || '-' }}</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-md font-medium text-gray-900 mb-3">Danh sách sản phẩm</h4>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Sản phẩm</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            SKU</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Số lượng</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Đơn giá</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="item in selectedMovement.items" :key="item.id">
                                        <td class="px-4 py-2 text-sm text-gray-900">{{ item.product?.name }}</td>
                                        <td class="px-4 py-2 text-sm text-gray-500">{{ item.product?.sku }}</td>
                                        <td class="px-4 py-2 text-sm text-gray-900">{{ item.quantity }}</td>
                                        <td class="px-4 py-2 text-sm text-gray-900">{{
                                            formatCurrency(item.unit_price) }}</td>
                                        <td class="px-4 py-2 text-sm text-gray-900">{{ formatCurrency(item.quantity
                                            * item.unit_price) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end">
                    <button @click="closeDetailsModal"
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Print Receipt Modal -->
    <div v-if="showPrintModal" class="fixed inset-0 backdrop-blur-sm bg-black/30 overflow-y-auto h-full w-full z-50">
        <div class="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div class="mt-3">
                <div class="no-print flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">
                        In phiếu #{{ selectedMovement?.id }}
                    </h3>
                    <div class="flex space-x-2">
                        <button @click="printDocument"
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z">
                                </path>
                            </svg>
                            In phiếu
                        </button>
                        <button @click="closePrintModal"
                            class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                            Đóng
                        </button>
                    </div>
                </div>

                <div class="receipt-content bg-white p-8" ref="receiptContent">
                    <div class="text-center mb-8">
                        <h1 class="text-2xl font-bold mb-2">
                            {{ selectedMovement?.type === 'import' ? 'PHIẾU NHẬP KHO' : 'PHIẾU XUẤT KHO' }}
                        </h1>
                        <p class="text-lg">Số phiếu: <strong>#{{ selectedMovement?.id }}</strong></p>
                        <p class="text-sm text-gray-600">Ngày: {{ formatDate(selectedMovement?.created_at) }}</p>
                    </div>

                    <div class="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 class="font-semibold mb-2">Thông tin phiếu:</h3>
                            <p><strong>Loại:</strong>
                                {{ selectedMovement?.type === 'import' ? 'Nhập kho' : 'Xuấtkho' }}</p>
                            <p><strong>Người tạo:</strong> {{ selectedMovement?.creator?.name || 'N/A' }}</p>
                            <p><strong>Ngày tạo:</strong> {{ formatDate(selectedMovement?.created_at) }}</p>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-2">Ghi chú:</h3>
                            <p>{{ selectedMovement?.note || 'Không có ghi chú' }}</p>
                        </div>
                    </div>

                    <div class="mb-8">
                        <h3 class="font-semibold mb-4">Danh sách sản phẩm:</h3>
                        <table class="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr class="bg-gray-50">
                                    <th class="border border-gray-300 px-4 py-2 text-left">STT</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left">Tên sản phẩm</th>
                                    <th class="border border-gray-300 px-4 py-2 text-left">SKU</th>
                                    <th class="border border-gray-300 px-4 py-2 text-center">Số lượng</th>
                                    <th class="border border-gray-300 px-4 py-2 text-right">Đơn giá</th>
                                    <th class="border border-gray-300 px-4 py-2 text-right">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in selectedMovement?.items" :key="item.id">
                                    <td class="border border-gray-300 px-4 py-2 text-center">{{ index + 1 }}</td>
                                    <td class="border border-gray-300 px-4 py-2">{{ item.product?.name }}</td>
                                    <td class="border border-gray-300 px-4 py-2">{{ item.product?.sku }}</td>
                                    <td class="border border-gray-300 px-4 py-2 text-center">{{ item.quantity }}
                                    </td>
                                    <td class="border border-gray-300 px-4 py-2 text-right">{{
                                        formatCurrency(item.unit_price) }}</td>
                                    <td class="border border-gray-300 px-4 py-2 text-right">{{
                                        formatCurrency(item.quantity * item.unit_price) }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="bg-gray-50 font-semibold">
                                    <td colspan="3" class="border border-gray-300 px-4 py-2 text-right">Tổng cộng:
                                    </td>
                                    <td class="border border-gray-300 px-4 py-2 text-center">{{ totalQuantity }}
                                    </td>
                                    <td class="border border-gray-300 px-4 py-2 text-right">-</td>
                                    <td class="border border-gray-300 px-4 py-2 text-right">{{
                                        formatCurrency(totalAmount) }}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div class="grid grid-cols-3 gap-8 mt-16">
                        <div class="text-center">
                            <p class="font-semibold mb-16">Người lập phiếu</p>
                            <p class="border-t border-gray-400 pt-2">{{ selectedMovement?.creator?.name || 'N/A' }}
                            </p>
                        </div>
                        <div class="text-center">
                            <p class="font-semibold mb-16">Thủ kho</p>
                            <p class="border-t border-gray-400 pt-2">_________________</p>
                        </div>
                        <div class="text-center">
                            <p class="font-semibold mb-16">Giám đốc</p>
                            <p class="border-t border-gray-400 pt-2">_________________</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useInventory } from '../../composables/useInventory'

const { stockMovements, getStockMovements, loading, error } = useInventory()

const showDetailsModal = ref(false)
const showPrintModal = ref(false)
const selectedMovement = ref(null)

const totalQuantity = computed(() => {
    return selectedMovement.value?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
})

const totalAmount = computed(() => {
    return selectedMovement.value?.items?.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0) || 0
})

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN')
}

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount || 0)
}

const viewDetails = (movement) => {
    selectedMovement.value = movement
    showDetailsModal.value = true
}

const closeDetailsModal = () => {
    showDetailsModal.value = false
    selectedMovement.value = null
}

const printReceipt = (movement) => {
    selectedMovement.value = movement
    showPrintModal.value = true
}

const closePrintModal = () => {
    showPrintModal.value = false
    selectedMovement.value = null
}

const printDocument = () => {
    window.print()
}

// Lifecycle
onMounted(() => {
    getStockMovements()
})
</script>

<style>
/* Print styles */
@media print {
    .no-print {
        display: none !important;
    }

    body * {
        visibility: hidden;
    }

    .receipt-content,
    .receipt-content * {
        visibility: visible;
    }

    .receipt-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        background: white !important;
    }

    .fixed {
        position: static !important;
    }

    .bg-gray-600 {
        background: transparent !important;
    }
}

.receipt-content {
    font-family: 'Times New Roman', serif;
    line-height: 1.4;
}

.receipt-content table {
    page-break-inside: avoid;
}

.receipt-content h1,
.receipt-content h3 {
    color: #000 !important;
}
</style>