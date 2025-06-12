<template>
    <div class="w-64 bg-white shadow-lg h-screen flex flex-col">
        <div class="p-4">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    POS
                </div>
                <div>
                    <div class="font-medium text-gray-900">Bán hàng ( POS )</div>
                    <div class="text-sm text-gray-500">Trang bán hàng</div>
                </div>
                <button class="ml-auto text-gray-400 hover:text-gray-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>
        </div>

        <nav class="flex-1 p-4">
            <div class="space-y-2">
                <router-link to="/pos/sell" :class="[
                    'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors',
                    $route.path === '/pos/sell' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                ]">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z">
                        </path>
                    </svg>
                    <span>Bán hàng (POS)</span>
                </router-link>

                <router-link to="/pos/report" :class="[
                    'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors',
                    $route.path === '/pos/report' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                ]">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 00-2 2h-2a2 2 0 01-2-2z">
                        </path>
                    </svg>
                    <span>Báo cáo</span>
                </router-link>
            </div>
        </nav>
        <div class="p-4">
        </div>
    </div>
</template>

<script setup>
import { usePosStore } from '../../composables/usePos'

const { currentUser } = usePosStore()
</script>