<template>
    <form @submit.prevent="handleCreate" class="space-y-4">
        <div>
            <label class="block text-sm font-medium text-gray-700">Họ và tên</label>
            <input type="text" v-model="formData.name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Nhập tên" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" v-model="formData.email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Nhập email" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input type="tel" v-model="formData.phone"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Nhập số điện thoại" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input type="password" v-model="formData.password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Nhập mật khẩu" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">Vai trò</label>
            <select v-model="formData.role"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500">
                <option value="admin">Quản trị viên</option>
                <option value="staff">Nhân viên</option>
            </select>
        </div>
        <div class="flex justify-end mt-5">
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Thêm mới
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

const formData = ref({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'staff'
})
const { register } = useAuth();
const router = useRouter()

const handleCreate = async () => {
    try {
        await register(formData.value)
        alert('Thêm nhân viên thành công')
        router.push('/staff')

        formData.value = {
            name: '',
            email: '',
            phone: '',
            password: '',
            role: 'staff'
        }
    } catch (err) {
        console.error('Lỗi khi thêm nhân viên:', err)
    }
}
</script>