<template>
    <div class="bg-gray-50">
        <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div class="max-w-[480px] w-full">
                <div class="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
                    <h1 class="text-slate-900 text-center text-3xl font-semibold">Đăng nhập</h1>

                    <!-- Hiển thị lỗi -->
                    <div v-if="error" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {{ error }}
                    </div>

                    <form class="mt-12 space-y-6" @submit.prevent="handleLogin">
                        <div>
                            <label class="text-slate-900 text-sm font-medium mb-2 block">Email đăng nhập</label>
                            <div class="relative flex items-center">
                                <input v-model="email" name="email" type="email"
                                    class="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                                    placeholder="Nhập email đăng nhập" required />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                                    class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                    <path
                                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                        data-original="#000000"></path>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <label class="text-slate-900 text-sm font-medium mb-2 block">Mật khẩu</label>
                            <div class="relative flex items-center">
                                <input v-model="password" name="password" type="password"
                                    class="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                                    placeholder="Nhập mật khẩu" required />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                                    class="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                    <path
                                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                        data-original="#000000"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="flex flex-wrap items-center justify-between gap-4">
                            <div class="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox"
                                    class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" />
                                <label for="remember-me" class="ml-2 block text-sm text-slate-900">
                                    Ghi nhớ
                                </label>
                            </div>
                            <div class="text-sm">
                                <a href="javascript:void(0);" class="text-blue-600 hover:underline font-semibold">
                                    Quên mật khẩu?
                                </a>
                            </div>
                        </div>
                        <div class="!mt-5">
                            <button type="submit" :disabled="loading" :class="[
                                'w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white focus:outline-none transition-all duration-200 flex items-center justify-center gap-2',
                                loading
                                    ? 'bg-blue-400 cursor-not-allowed loading-pulse'
                                    : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                            ]">
                                <div v-if="loading" class="flex space-x-1">
                                    <div class="w-2 h-2 bg-white rounded-full animate-bounce"
                                        style="animation-delay: 0ms"></div>
                                    <div class="w-2 h-2 bg-white rounded-full animate-bounce"
                                        style="animation-delay: 150ms"></div>
                                    <div class="w-2 h-2 bg-white rounded-full animate-bounce"
                                        style="animation-delay: 300ms"></div>
                                </div>

                                <span>{{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';

const email = ref('');
const password = ref('');

const { login, error, loading } = useAuth();

const handleLogin = async () => {
    try {
        await login(email.value, password.value);
    } catch (error) {
        console.log('Login error:', error);
    }
}
</script>

<style scoped>
@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

.loading-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: .8;
    }
}
</style>