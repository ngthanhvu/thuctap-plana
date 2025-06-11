<template>
    <div class="print-receipt">
        <!-- Nút in -->
        <div class="no-print mb-4">
            <button @click="printReceipt" class="btn btn-primary">
                <i class="fas fa-print"></i> In phiếu
            </button>
            <button @click="$emit('close')" class="btn btn-secondary ml-2">
                Đóng
            </button>
        </div>

        <!-- Nội dung phiếu -->
        <div class="receipt-content" ref="receiptContent">
            <div class="receipt-header text-center mb-4">
                <h2>{{ movement.type === 'import' ? 'PHIẾU NHẬP KHO' : 'PHIẾU XUẤT KHO' }}</h2>
                <p>Số phiếu: <strong>{{ movement.id }}</strong></p>
                <p>Ngày: <strong>{{ formatDate(movement.created_at) }}</strong></p>
            </div>

            <div class="receipt-info mb-4">
                <div class="row">
                    <div class="col-6">
                        <p><strong>Người tạo:</strong> {{ movement.creator_name || 'N/A' }}</p>
                        <p><strong>Loại:</strong> {{ movement.type === 'import' ? 'Nhập kho' : 'Xuất kho' }}</p>
                    </div>
                    <div class="col-6">
                        <p><strong>Ghi chú:</strong> {{ movement.notes || 'Không có' }}</p>
                        <p><strong>Trạng thái:</strong> {{ movement.status || 'Hoàn thành' }}</p>
                    </div>
                </div>
            </div>

            <div class="receipt-items">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên sản phẩm</th>
                            <th>SKU</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in movement.items" :key="item.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.product_name }}</td>
                            <td>{{ item.product_sku }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ formatCurrency(item.unit_price) }}</td>
                            <td>{{ formatCurrency(item.quantity * item.unit_price) }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="4" class="text-right"><strong>Tổng cộng:</strong></td>
                            <td><strong>{{ totalQuantity }}</strong></td>
                            <td><strong>{{ formatCurrency(totalAmount) }}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="receipt-footer mt-4">
                <div class="row">
                    <div class="col-4 text-center">
                        <p><strong>Người lập phiếu</strong></p>
                        <br><br>
                        <p>{{ movement.creator_name || 'N/A' }}</p>
                    </div>
                    <div class="col-4 text-center">
                        <p><strong>Thủ kho</strong></p>
                        <br><br>
                        <p>_________________</p>
                    </div>
                    <div class="col-4 text-center">
                        <p><strong>Giám đốc</strong></p>
                        <br><br>
                        <p>_________________</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    movement: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['close'])

const totalQuantity = computed(() => {
    return props.movement.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
})

const totalAmount = computed(() => {
    return props.movement.items?.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0) || 0
})

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
}

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount)
}

const printReceipt = () => {
    window.print()
}
</script>

<style scoped>
.receipt-content {
    background: white;
    padding: 20px;
    font-family: 'Times New Roman', serif;
}

.receipt-header h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.table {
    font-size: 14px;
}

.table th {
    background-color: #f8f9fa;
    font-weight: bold;
    text-align: center;
}

.table td {
    vertical-align: middle;
}

.receipt-footer {
    margin-top: 40px;
}

/* CSS cho in ấn */
@media print {
    .no-print {
        display: none !important;
    }

    .receipt-content {
        margin: 0;
        padding: 0;
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
    }
}
</style>