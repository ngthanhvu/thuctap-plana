<template>
    <nav class="fixed top-0 right-0 left-0 md:left-64 bg-white shadow-sm z-10">
        <div class="px-4 py-3 flex justify-between items-center">
            <div class="flex items-center space-x-4">
                <button class="p-1 rounded-md text-gray-500 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h2 class="text-xl font-semibold text-gray-800">Bảng điều kiển</h2>
            </div>

            <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-2">
                        <div
                            class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                            {{ userInfo?.name?.charAt(0) }}
                        </div>
                        <div class="text-sm">
                            <div class="font-medium text-gray-900">{{ userInfo?.name }}</div>
                            <div class="flex items-center text-xs text-gray-500">
                                <span class="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full mr-1">
                                    {{ userInfo?.role }}</span>
                                <span v-if="userInfo?.email" class="truncate max-w-[120px]">{{ userInfo.email }}</span>
                            </div>
                        </div>
                    </div>
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
    </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../../composables/useAuth';
const { getUserInfo, logout } = useAuth();

const userInfo = ref(null);

onMounted(async () => {
    userInfo.value = await getUserInfo();
    console.log(userInfo.value);
});

const handleLogout = () => {
    const token = localStorage.getItem('token');
    if (token) {
        localStorage.removeItem('token');
        location.reload();
    }
};
</script>