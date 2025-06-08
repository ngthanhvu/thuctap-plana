import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const user = ref(null)
const token = ref(localStorage.getItem('token'))


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

export const useAuth = () => {
    const router = useRouter()
    const error = ref(null)
    const loading = ref(false)

    const setAuth = (userData, tokenData) => {
        user.value = userData
        token.value = tokenData
        localStorage.setItem('token', tokenData)
        axios.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`
    }

    const clearAuth = () => {
        user.value = null
        token.value = null
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
    }

    const login = async (email, password) => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.post('/api/staffs/login', { email, password })

            setAuth(response.data.staff, response.data.token)
            Swal.fire({
                title: 'Đăng nhập thành công!',
                text: 'Nhấn OK để tiếp tục',
                icon: 'success',
                timer: 3000,
                confirmButtonText: 'OK',
                timerProgressBar: true,
            }).then(() => {
                router.push('/');
            });
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Đăng nhập thất bại'
            throw err
        } finally {
            loading.value = false
        }
    }

    const register = async (userData) => {
        try {
            loading.value = true
            error.value = null

            await axios.post('/api/staffs/create', userData)
            router.push('/login')
            return true
        } catch (err) {
            error.value = err.response?.data?.message || 'Đăng ký thất bại'
            throw err
        } finally {
            loading.value = false
        }
    }

    const logout = async () => {
        clearAuth()
        router.push('/login')
    }

    const getUserInfo = async () => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.get('/api/staffs/getInfo')
            user.value = response.data
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Không thể lấy thông tin người dùng'
            throw err
        } finally {
            loading.value = false
        }
    }

    const getListInfo = async () => {
        try {
            loading.value = true
            error.value = null

            const response = await axios.get('/api/staffs/getListInfo')
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Không thể lấy thông tin người dùng'
            throw err
        } finally {
            loading.value = false
        }
    }

    const isAuthenticated = () => {
        return !!token.value
    }

    const isAdmin = () => {
        return user.value?.role === 'admin'
    }

    if (token.value) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    }

    return {
        user,
        token,
        error,
        loading,
        login,
        register,
        logout,
        getUserInfo,
        getListInfo,
        isAuthenticated,
        isAdmin
    }
}