<template>
    <header class="bg-white border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <button class="p-2 hover:bg-gray-100 rounded-lg">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>

                <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7V3a4 4 0 118 0v4m-4 12v-6m0 0V7a4 4 0 00-4-4H7a4 4 0 00-4 4v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4h-1">
                        </path>
                    </svg>
                    <span class="text-sm text-gray-600">{{ formatDate(new Date()) }}</span>
                </div>

                <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-sm text-gray-600">{{ currentTime }}</span>
                </div>
            </div>

            <div class="flex items-center space-x-4">
                <div v-if="currentSession" class="flex items-center space-x-2 text-green-600">
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span class="text-sm font-medium">Ca đang mở</span>
                    <span class="text-xs text-gray-500">{{ formatDateTime(currentSession.start_time) }}</span>
                    <span class="text-xs text-gray-500">({{ sessionDuration }})</span>
                </div>
                <div v-else class="flex items-center space-x-2 text-red-600">
                    <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span class="text-sm font-medium">Ca đã đóng</span>
                </div>
                <div class="flex space-x-2">
                    <button v-if="!currentSession" @click="showSessionModal = true"
                        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <span>Bắt đầu ca</span>
                    </button>

                    <button v-if="currentSession" @click="showEndSessionModal = true"
                        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <span>Kết thúc ca</span>
                    </button>

                    <button v-if="currentSession" @click="showReportModal = true"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 00-2 2h-2a2 2 0 01-2-2z">
                            </path>
                        </svg>
                        <span>Thống kê</span>
                    </button>
                </div>

                <div v-if="salesReport && currentSession" class="text-right">
                    <div class="text-sm font-medium text-gray-900">{{ formatPrice(salesReport.total_sales) }}</div>
                    <div class="text-xs text-gray-500">Doanh thu ca</div>
                </div>

                <div class="flex items-center space-x-2">
                    <div
                        class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                        {{ currentUser?.name?.charAt(0) || currentUser.name.charAt(0) }}
                    </div>
                    <div class="text-sm">
                        <div class="font-medium text-gray-900">{{ currentUser?.name || currentUser.name }}</div>
                        <div class="flex items-center text-xs text-gray-500">
                            <span class="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full mr-1">{{ currentUser?.role
                                ||
                                currentUser.role }}</span>
                            <span v-if="currentUser?.email" class="truncate max-w-[120px]">{{ currentUser.email
                                }}</span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center space-x-2">
                    <router-link v-if="currentUser.role === 'admin'" to="/" class="p-2 hover:bg-gray-100 rounded-lg"
                        title="Cài đặt">

                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                            </path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </router-link>
                    <button class="p-2 hover:bg-gray-100 rounded-lg text-red-600" title="Đăng xuất"
                        @click="handleLogout">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div v-if="showSessionModal"
            class="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg w-96">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Bắt đầu ca làm việc</h3>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tiền mặt đầu ca:</label>
                    <input v-model.number="openingCash" type="number"
                        class="w-full px-3 py-2 border border-gray-300 focus:outline-gray-300 rounded-lg text-gray-800"
                        placeholder="0">
                </div>
                <div class="flex space-x-3">
                    <button @click="handleStartSession"
                        class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                        Bắt đầu
                    </button>
                    <button @click="showSessionModal = false"
                        class="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg">
                        Hủy
                    </button>
                </div>
            </div>
        </div>

        <div v-if="showEndSessionModal"
            class="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg w-96">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Kết thúc ca làm việc</h3>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tiền mặt cuối ca:</label>
                    <input v-model.number="closingCash" type="number"
                        class="w-full px-3 py-2 border rounded-lg text-gray-800" placeholder="0">
                </div>
                <div v-if="salesReport" class="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div class="text-sm text-gray-600 mb-2">Tóm tắt ca làm việc:</div>
                    <div class="space-y-1 text-sm">
                        <div class="flex justify-between">
                            <span>Tổng doanh thu:</span>
                            <span class="font-medium">{{ formatPrice(salesReport.total_sales) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Số đơn hàng:</span>
                            <span class="font-medium">{{ salesReport.total_orders }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Tiền mặt:</span>
                            <span class="font-medium">{{ formatPrice(salesReport.total_cash_sales) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Thẻ/QR:</span>
                            <span class="font-medium">{{ formatPrice(salesReport.total_card_sales) }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex space-x-3">
                    <button @click="handleEndSession"
                        class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">
                        Kết thúc ca
                    </button>
                    <button @click="showEndSessionModal = false"
                        class="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg">
                        Hủy
                    </button>
                </div>
            </div>
        </div>

        <div v-if="showReportModal"
            class="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg w-[800px] max-w-4xl">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold text-gray-800">Thống kê doanh thu ca làm việc</h3>
                    <button @click="showReportModal = false" class="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>
                <PosSalesReport />
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePosStore } from '../../composables/usePos'
import { useAuth } from '../../composables/useAuth'
import PosSalesReport from './PosSalesReport.vue'
import Swal from 'sweetalert2'

const {
    currentUser,
    currentSession,
    salesReport,
    startPosSession,
    endPosSession,
    fetchSalesReport
} = usePosStore()

const { logout } = useAuth()

const currentTime = ref('')
const sessionDuration = ref('')
const showSessionModal = ref(false)
const showEndSessionModal = ref(false)
const showReportModal = ref(false)
const openingCash = ref(0)
const closingCash = ref(0)

const handleLogout = async () => {
    try {
        await logout()
    } catch (error) {
        alert(`Lỗi: ${error.response?.data?.message || error.message}`)
    }

}

function updateTime() {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Ho_Chi_Minh'
    })

    if (currentSession.value) {
        const startTime = new Date(currentSession.value.start_time)
        const duration = now - startTime
        const hours = Math.floor(duration / (1000 * 60 * 60))
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((duration % (1000 * 60)) / 1000)
        sessionDuration.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
}

function formatDate(date) {
    return date.toLocaleDateString('vi-VN', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'Asia/Ho_Chi_Minh'
    })
}

function formatDateTime(dateTime) {
    return new Date(dateTime).toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh'
    })
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price || 0)
}

async function handleStartSession() {
    try {
        await startPosSession(openingCash.value)
        showSessionModal.value = false
        openingCash.value = 0
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đã bắt đầu ca làm việc thành công!',
            showConfirmButton: true,
            timer: 1500
        })
        if (currentSession.value) {
            await fetchSalesReport(currentSession.value.id)
        }
    } catch (error) {
        alert(`Lỗi: ${error.response?.data?.message || error.message}`)
    }
}

async function handleEndSession() {
    try {
        await endPosSession(closingCash.value)
        showEndSessionModal.value = false
        closingCash.value = 0
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đã kết thúc ca làm việc thành công!',
            showConfirmButton: true,
            timer: 1500
        })
    } catch (error) {
        alert(`Lỗi: ${error.response?.data?.message || error.message}`)
    }
}

let timeInterval

onMounted(() => {
    updateTime()
    timeInterval = setInterval(updateTime, 1000)

    if (currentSession.value) {
        fetchSalesReport(currentSession.value.id)
    }
})

onUnmounted(() => {
    if (timeInterval) {
        clearInterval(timeInterval)
    }
})
</script>