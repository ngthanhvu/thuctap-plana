<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
            <label class="block text-sm font-medium text-gray-700">Họ và tên</label>
            <input type="text" v-model="formData.name" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Nhập tên">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" v-model="formData.email" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Nhập email">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input type="tel" v-model="formData.phone" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Nhập số điện thoại">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input type="password" v-model="formData.password" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Nhập mật khẩu">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">Vai trò</label>
            <select v-model="formData.role" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="">
                <option value="admin">Quản trị viên</option>
                <option value="staff">Nhân viên</option>
            </select>
        </div>
        <div class="flex justify-end space-x-3 mt-5">
            <button type="button" @click="$emit('cancel')"
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                Hủy
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                {{ isEditing ? 'Cập nhật' : 'Thêm mới' }}
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
    isEditing: {
        type: Boolean,
        default: false
    },
    initialData: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['submit', 'cancel'])

const formData = ref({
    name: props.initialData.name || '',
    email: props.initialData.email || '',
    phone: props.initialData.phone || '',
    password: props.initialData.password || '',
    role: props.initialData.role || 'staff'
})

const handleSubmit = () => {
    emit('submit', { ...formData.value })
}
</script>