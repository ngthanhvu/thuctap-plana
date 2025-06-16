import { ref } from 'vue'
import axios from 'axios'
import { Notyf } from 'notyf'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const notyf = new Notyf({
    duration: 3000,
    position: {
        x: 'center',
        y: 'top'
    }
})

export const usePayment = () => {
    const loading = ref(false)
    const error = ref(null)
    const paymentQR = ref(null)
    const bankInfo = ref(null)

    // Lấy thông tin QR code
    const getQRInfo = async () => {
        try {
            loading.value = true
            const response = await axios.get('/api/settings/qr-info')
            bankInfo.value = response.data
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Lỗi khi lấy thông tin QR'
            notyf.error(error.value)
            throw error.value
        } finally {
            loading.value = false
        }
    }

    // Tạo QR code thanh toán
    const generateQRCode = async (amount, addInfo) => {
        try {
            loading.value = true
            console.log('Sending QR request with:', { amount, addInfo });

            const response = await axios.post('/api/payment/payment-qr', {
                amount,
                addInfo
            })

            console.log('QR Response:', response.data);
            console.log('QR Response data:', JSON.stringify(response.data.data, null, 2));

            if (response.data.code === '00' && response.data.data) {
                if (!response.data.data.qrDataURL) {
                    console.error('Missing qrDataURL in response:', response.data.data);
                    throw new Error('Thiếu dữ liệu QR code');
                }

                console.log('Setting QR data:', {
                    qrData: response.data.data.qrCode,
                    image: response.data.data.qrDataURL.substring(0, 100) + '...' // Log first 100 chars of base64
                });

                paymentQR.value = {
                    qrData: response.data.data.qrCode,
                    image: response.data.data.qrDataURL
                }
                return paymentQR.value
            } else {
                console.error('Invalid QR data structure:', response.data);
                throw new Error('Không thể tạo mã QR')
            }
        } catch (err) {
            error.value = err.response?.data?.message || 'Lỗi khi tạo mã QR'
            notyf.error(error.value)
            throw error.value
        } finally {
            loading.value = false
        }
    }

    // Cập nhật thông tin tài khoản ngân hàng
    const updateBankAccount = async (settings) => {
        try {
            loading.value = true
            const response = await axios.put('/api/settings', settings)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Lỗi khi cập nhật tài khoản'
            notyf.error(error.value)
            throw error.value
        } finally {
            loading.value = false
        }
    }

    // Thêm tài khoản ngân hàng mới
    const createBankAccount = async (settings) => {
        try {
            loading.value = true
            const response = await axios.post('/api/settings', settings)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Lỗi khi thêm tài khoản'
            notyf.error(error.value)
            throw error.value
        } finally {
            loading.value = false
        }
    }

    // Xóa tài khoản ngân hàng
    const deleteBankAccount = async (settings) => {
        try {
            loading.value = true
            const response = await axios.put('/api/settings', settings)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Lỗi khi xóa tài khoản'
            notyf.error(error.value)
            throw error.value
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        error,
        paymentQR,
        bankInfo,
        getQRInfo,
        generateQRCode,
        updateBankAccount,
        createBankAccount,
        deleteBankAccount
    }
}