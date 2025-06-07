<template>
    <div class="p-6">
        <div class="max-w-2xl mx-auto">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">Thêm nhân viên mới</h1>
            <StaffForm @submit="handleSubmit" @cancel="goBack" />
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import StaffForm from '../../components/staff/StaffForm.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const router = useRouter()

const handleSubmit = async (data) => {
    try {
        await axios.post('/api/staffs/create', data)
        Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            text: 'Thêm nhân viên mới thành công'
        }).then(() => {
            router.push('/staff')
        })
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: error.response?.data?.message || 'Có lỗi xảy ra'
        })
    }
}

const goBack = () => {
    router.push('/staff')
}
</script>

<style></style>