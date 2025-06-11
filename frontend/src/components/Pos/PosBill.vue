<template>
    <div class="lg:w-1/6 h-full">
        <div class="bg-white rounded-xl shadow-lg p-4 h-full flex flex-col">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-bold">Hóa đơn</h2>
                <span class="text-xs bg-gray-100 px-2 py-1 rounded-full">#HD{{ Math.floor(Math.random() * 100000)
                    }}</span>
            </div>

            <div class="space-y-3 mb-4 max-h-96 overflow-y-auto">
                <div v-for="item in cart" :key="item.id" class="flex items-start border-b pb-3 space-x-2">
                    <div
                        class="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img :src="`http://localhost:3000/${item.image}`" :alt="(item.image)" alt="Product" class="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-medium text-sm truncate">{{ item.name }}</h3>
                        <div class="flex items-center justify-between mt-1">
                            <div class="flex items-center">
                                <button @click="updateQuantity(item.id, item.quantity - 1)"
                                    class="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs">-</button>
                                <span class="mx-1 text-xs">{{ item.quantity }}</span>
                                <button @click="updateQuantity(item.id, item.quantity + 1)"
                                    class="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs">+</button>
                            </div>
                            <div class="text-xs font-semibold">{{ formatPrice(item.price * item.quantity) }}</div>
                        </div>
                        <div class="text-xs text-gray-600">{{ formatPrice(item.price) }}</div>
                    </div>
                </div>
            </div>

            <div class="border-t pt-3 mt-auto">
                <div class="space-y-1 mb-4 text-sm">
                    <div class="flex justify-between">
                        <span>Tạm tính:</span>
                        <span>{{ formatPrice(cartTotal) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Giảm giá:</span>
                        <span class="text-red-500">-{{ formatPrice(cartDiscount) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Thuế (10%):</span>
                        <span>{{ formatPrice(cartTax) }}</span>
                    </div>
                    <div class="flex justify-between font-bold">
                        <span>Tổng:</span>
                        <span>{{ formatPrice(cartFinalTotal) }}</span>
                    </div>
                </div>

                <div class="space-y-2">
                    <button @click="handlePayment('cash')"
                        class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-bold text-sm">
                        Tiền mặt
                    </button>
                    <button @click="handlePayment('card')"
                        class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold text-sm">
                        Thẻ
                    </button>
                    <button @click="handleSave"
                        class="w-full border border-gray-300 hover:bg-gray-50 py-2 rounded-lg font-medium text-sm">
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { usePosStore } from '../../composables/usePos'

const {
    cart,
    cartTotal,
    cartDiscount,
    cartTax,
    cartFinalTotal,
    updateQuantity,
    clearCart
} = usePosStore()

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price)
}

function handlePayment(method) {
    // TODO: Implement payment logic
    alert(`Thanh toán bằng ${method === 'cash' ? 'tiền mặt' : 'thẻ'}: ${formatPrice(cartFinalTotal.value)}`)
    clearCart()
}

function handleSave() {
    // TODO: Implement save bill logic
    alert('Đã lưu hóa đơn')
}
</script>