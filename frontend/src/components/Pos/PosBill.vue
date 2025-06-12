<template>
    <div class="w-full h-full">
        <div class="bg-white rounded-xl shadow-lg p-4 h-full flex flex-col">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-bold">Hóa đơn</h2>
                <span class="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {{ currentOrderNumber }}
                </span>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-2">Khách hàng:</label>
                <div class="relative">
                    <input v-model="customerSearch" @input="handleCustomerSearch" @focus="showCustomerDropdown = true"
                        @blur="handleBlur" type="text" placeholder="Tìm khách hàng hoặc nhập tên mới..."
                        class="w-full px-4 py-2 border focus:ring-gray-400 focus:border-gray-500 border-gray-300 rounded-lg outline-none text-sm">
                    <div v-if="showCustomerDropdown && (searchResults.length > 0 || customerSearch.length > 0)"
                        class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                        <div v-for="customer in searchResults" :key="customer.id" @mousedown="selectCustomer(customer)"
                            class="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b">
                            <div class="font-medium">{{ customer.name }}</div>
                            <div class="text-xs text-gray-500">{{ customer.phone }} • {{ customer.points || 0 }} điểm
                            </div>
                        </div>
                        <div v-if="customerSearch.length > 2 && !searchResults.find(c => c.name.toLowerCase() === customerSearch.toLowerCase())"
                            @mousedown="showQuickCreateForm = true; showCustomerDropdown = false"
                            class="px-3 py-3 hover:bg-blue-50 cursor-pointer text-sm text-blue-600 border-b bg-blue-25">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                Tạo khách hàng: "{{ customerSearch }}"
                            </div>
                        </div>
                        <div @mousedown="showNewCustomerForm = true; showCustomerDropdown = false"
                            class="px-3 py-2 hover:bg-green-50 cursor-pointer text-sm text-green-600 bg-green-25">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                Thêm khách hàng với đầy đủ thông tin
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="selectedCustomer" class="mt-2 p-2 bg-green-50 rounded-lg">
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="text-sm font-medium text-green-800">{{ selectedCustomer.name }}</div>
                            <div class="text-xs text-green-600">{{ selectedCustomer.phone }} • {{
                                selectedCustomer.points || 0 }} điểm</div>
                        </div>
                        <button @click="clearCustomer" class="text-red-500 hover:text-red-700">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="space-y-3 mb-4 max-h-96 overflow-y-auto">
                <div v-for="item in cart" :key="item.id" class="flex items-start pb-3 space-x-2">
                    <div
                        class="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img :src="`http://localhost:3000/${item.image}`" :alt="item.image"
                            class="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-medium text-sm truncate">{{ item.name }}</h3>
                        <div class="flex items-center justify-between mt-1">
                            <div class="flex items-center">
                                <button @click="updateQuantity(item.id, item.quantity - 1)"
                                    class="w-7 h-7 rounded-full bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white flex items-center justify-center text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95">-</button>
                                <span class="mx-3 text-sm font-semibold min-w-[20px] text-center">{{ item.quantity
                                    }}</span>
                                <button @click="updateQuantity(item.id, item.quantity + 1)"
                                    class="w-7 h-7 rounded-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white flex items-center justify-center text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95">+</button>
                            </div>
                            <div class="text-xs font-semibold">{{ formatPrice(item.price * item.quantity) }}</div>
                        </div>
                        <div class="text-xs text-gray-600">{{ formatPrice(item.price) }}</div>
                    </div>
                </div>
            </div>
            <div class="pt-3 mt-auto">
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
                    <button @click="handlePayment('cash')" :disabled="cart.length === 0 || !currentSession"
                        class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-bold text-sm">
                        <i class="fa-solid fa-money-bill"></i> Tiền mặt
                    </button>
                    <button @click="handlePayment('card')" :disabled="cart.length === 0 || !currentSession"
                        class="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-bold text-sm">
                        <i class="fa-regular fa-credit-card"></i> Thẻ / QR
                    </button>
                    <button @click="handleSave" :disabled="cart.length === 0 || !currentSession"
                        class="w-full border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 py-2 rounded-lg font-medium text-sm">
                        <i class="fa-solid fa-floppy-disk"></i> Lưu tạm
                    </button>
                    <button @click="handleCancel" :disabled="cart.length === 0"
                        class="w-full border border-red-300 hover:bg-red-50 disabled:bg-gray-100 text-red-600 py-2 rounded-lg font-medium text-sm">
                        <i class="fa-solid fa-xmark"></i> Hủy
                    </button>
                </div>
            </div>
        </div>

        <div v-if="showQuickCreateForm"
            class="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg w-96 max-w-md">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Tạo khách hàng nhanh</h3>
                <form @submit.prevent="handleQuickCreateCustomer">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Tên khách hàng *</label>
                        <input v-model="quickCustomer.name" type="text" required
                            class="w-full px-3 py-2 border rounded-lg text-gray-800" placeholder="Nhập tên khách hàng">
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                        <input v-model="quickCustomer.phone" type="tel"
                            class="w-full px-3 py-2 border rounded-lg text-gray-800" placeholder="Nhập số điện thoại">
                    </div>
                    <div class="flex space-x-3">
                        <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                            Tạo & Chọn
                        </button>
                        <button type="button" @click="showQuickCreateForm = false; resetQuickCustomerForm()"
                            class="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg">
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div v-if="showNewCustomerForm"
            class="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg w-96 max-w-md">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Thêm khách hàng mới</h3>
                <form @submit.prevent="handleCreateCustomer">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Tên khách hàng *</label>
                        <input v-model="newCustomer.name" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-gray-300"
                            placeholder="Nhập tên khách hàng">
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                        <input v-model="newCustomer.phone" type="tel"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-gray-300"
                            placeholder="Nhập số điện thoại">
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input v-model="newCustomer.email" type="email"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-gray-300"
                            placeholder="Nhập email">
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                        <textarea v-model="newCustomer.address" rows="2"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-gray-300"
                            placeholder="Nhập địa chỉ"></textarea>
                    </div>
                    <div class="flex space-x-3">
                        <button type="submit"
                            class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg">
                            Thêm
                        </button>
                        <button type="button" @click="showNewCustomerForm = false; resetNewCustomerForm()"
                            class="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg">
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- QR Payment Modal -->
        <div v-if="showQRModal"
            class="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg w-96 max-w-md text-center">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Thanh toán QR Code</h3>
                <div class="mb-4">
                    <div class="text-2xl font-bold text-green-600 mb-2">{{ formatPrice(cartFinalTotal) }}</div>
                    <div class="text-sm text-gray-600 mb-4">Quét mã QR để thanh toán</div>
                    <div v-if="paymentQR" class="flex justify-center mb-4">
                        <img :src="paymentQR.qr_url" alt="QR Code" class="w-48 h-48">
                    </div>
                    <div class="text-xs text-gray-500">Mã QR sẽ hết hạn sau {{ qrCountdown }} giây</div>
                </div>
                <div class="flex space-x-3">
                    <button @click="confirmQRPayment"
                        class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                        Xác nhận thanh toán
                    </button>
                    <button @click="showQRModal = false"
                        class="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg">
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { usePosStore } from '../../composables/usePos'
import Swal from 'sweetalert2'

const {
    cart,
    cartTotal,
    cartDiscount,
    cartTax,
    cartFinalTotal,
    updateQuantity,
    clearCart,
    selectedCustomer,
    setSelectedCustomer,
    searchCustomers,
    currentSession,
    processPayment,
    saveDraftOrder,
    generatePaymentQR,
    createCustomer,
    paymentQR
} = usePosStore()

const customerSearch = ref('')
const showCustomerDropdown = ref(false)
const searchResults = ref([])
const showNewCustomerForm = ref(false)
const showQuickCreateForm = ref(false)
const showQRModal = ref(false)
const qrCountdown = ref(300)
const qrTimer = ref(null)

const newCustomer = ref({
    name: '',
    phone: '',
    email: '',
    address: ''
})

const quickCustomer = ref({
    name: '',
    phone: ''
})

const currentOrderNumber = computed(() => {
    return `#HD${Date.now().toString().slice(-6)}`
})

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price)
}

async function handleCustomerSearch() {
    if (customerSearch.value.length > 2) {
        try {
            searchResults.value = await searchCustomers(customerSearch.value)
        } catch (error) {
            console.error('Lỗi tìm kiếm khách hàng:', error)
        }
    } else {
        searchResults.value = []
    }
}

function handleBlur() {
    setTimeout(() => {
        showCustomerDropdown.value = false
    }, 200)
}

function selectCustomer(customer) {
    setSelectedCustomer(customer)
    customerSearch.value = customer.name
    showCustomerDropdown.value = false
    searchResults.value = []
}

function clearCustomer() {
    setSelectedCustomer(null)
    customerSearch.value = ''
}

async function handleQuickCreateCustomer() {
    try {
        quickCustomer.value.name = quickCustomer.value.name || customerSearch.value
        const customer = await createCustomer(quickCustomer.value)
        selectCustomer(customer)
        showQuickCreateForm.value = false
        resetQuickCustomerForm()
        Swal.fire({ title: "Thành công", text: "Khách hàng mới đã được tạo thành công", icon: "success" })
    } catch (error) {
        console.log(`Lỗi tạo khách hàng: ${error.message}`)
    }
}

async function handleCreateCustomer() {
    try {
        const customer = await createCustomer(newCustomer.value)
        selectCustomer(customer)
        showNewCustomerForm.value = false
        resetNewCustomerForm()
        Swal.fire({ title: "Thành công", text: "Khách hàng mới đã được tạo thành công", icon: "success" })
    } catch (error) {
        console.log(`Lỗi tạo khách hàng: ${error.message}`)
    }
}

function resetQuickCustomerForm() {
    quickCustomer.value = {
        name: '',
        phone: ''
    }
}

function resetNewCustomerForm() {
    newCustomer.value = {
        name: '',
        phone: '',
        email: '',
        address: ''
    }
}

async function handlePayment(method) {
    try {
        if (!currentSession.value) {
            Swal.fire({ title: "Lỗi", text: "Vui lòng khởi tạo phiên POS trước khi thanh toán", icon: "error" })
            return
        }

        if (method === 'card') {
            await generatePaymentQR(cartFinalTotal.value, currentOrderNumber.value)
            showQRModal.value = true
            startQRCountdown()
        } else {
            const order = await processPayment(method)
            Swal.fire({ title: "Thành công", text: `Thanh toán thành công!\nMã đơn hàng: ${order.order_number}\nTổng tiền: ${formatPrice(order.total)}`, icon: "success" })
        }
    } catch (error) {
        console.log(`Lỗi thanh toán: ${error.message}`)
    }
}

async function confirmQRPayment() {
    try {
        const order = await processPayment('card')
        showQRModal.value = false
        clearQRTimer()
        Swal.fire({ title: "Thành công", text: `Thanh toán QR thành công!\nMã đơn hàng: ${order.order_number}\nTổng tiền: ${formatPrice(order.total)}`, icon: "success" })
    } catch (error) {
        console.log(`Lỗi thanh toán QR: ${error.message}`)
    }
}

function startQRCountdown() {
    qrCountdown.value = 300
    qrTimer.value = setInterval(() => {
        qrCountdown.value--
        if (qrCountdown.value <= 0) {
            showQRModal.value = false
            clearQRTimer()
            Swal.fire({ title: "Lỗi", text: "Mã QR đã hết hạn", icon: "error" })
        }
    }, 1000)
}

function clearQRTimer() {
    if (qrTimer.value) {
        clearInterval(qrTimer.value)
        qrTimer.value = null
    }
}

async function handleSave() {
    try {
        if (!currentSession.value) {
            Swal.fire({ title: "Lỗi", text: "Vui lòng khởi tạo phiên POS trước khi lưu đơn hàng", icon: "error" })
            return
        }

        const order = await saveDraftOrder()
        Swal.fire({ title: "Thành công", text: `Đã lưu đơn hàng tạm: ${order.order.order_number}`, icon: "success" })
    } catch (error) {
        console.log(`Lỗi lưu đơn hàng: ${error.message}`)
    }
}

async function handleCancel() {
    const result = await Swal.fire({
        title: 'Xác nhận hủy đơn?',
        text: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có, hủy đơn!',
        cancelButtonText: 'Không',
        reverseButtons: true
    })

    if (result.isConfirmed) {
        clearCart()
        clearCustomer()
        Swal.fire({
            icon: 'success',
            title: 'Đã hủy đơn hàng',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

onUnmounted(() => {
    clearQRTimer()
})
</script>