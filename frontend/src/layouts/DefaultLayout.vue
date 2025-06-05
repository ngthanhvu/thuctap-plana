<template>
    <div class="flex h-screen bg-gray-100">
        <!-- Dark Sidebar -->
        <div class="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white hidden md:block">
            <div class="p-4 border-b border-gray-700">
                <h1 class="text-xl font-semibold">Admin Panel</h1>
            </div>
            <nav class="p-4">
                <ul class="space-y-2">
                    <li>
                        <div class="relative">
                            <button @click="toggleProductsMenu"
                                class="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-700"
                                :class="[isProductsActive ? 'bg-gray-700' : '']">
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                    <span class="ml-3">Sản phẩm</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform"
                                    :class="{ 'rotate-180': isProductsMenuOpen }" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div v-show="isProductsMenuOpen" class="mt-2 ml-4 space-y-2">
                                <router-link to="/products/list"
                                    class="flex items-center p-2 rounded-lg hover:bg-gray-700"
                                    :class="[$route.path === '/products/list' ? 'bg-gray-700' : '']">
                                    <span class="ml-3">Danh sách sản phẩm</span>
                                </router-link>
                                <router-link to="/products/categories"
                                    class="flex items-center p-2 rounded-lg hover:bg-gray-700"
                                    :class="[$route.path === '/products/categories' ? 'bg-gray-700' : '']">
                                    <span class="ml-3">Danh mục sản phẩm</span>
                                </router-link>
                                <router-link to="/products/brands"
                                    class="flex items-center p-2 rounded-lg hover:bg-gray-700"
                                    :class="[$route.path === '/products/brands' ? 'bg-gray-700' : '']">
                                    <span class="ml-3">Thương hiệu sản phẩm</span>
                                </router-link>
                            </div>
                        </div>
                    </li>
                    <li>
                        <router-link to="/orders" class="flex items-center p-2 rounded-lg hover:bg-gray-700"
                            :class="[$route.path === '/orders' ? 'bg-gray-700' : '']">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span class="ml-3">Đơn hàng</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/customers" class="flex items-center p-2 rounded-lg hover:bg-gray-700"
                            :class="[$route.path === '/customers' ? 'bg-gray-700' : '']">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span class="ml-3">Khách hàng</span>
                        </router-link>
                    </li>
                    <li>
                        <div class="relative">
                            <button @click="toggleInventoryMenu"
                                class="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-700"
                                :class="[isInventoryActive ? 'bg-gray-700' : '']">
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span class="ml-3">Kho & tồn kho</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform"
                                    :class="{ 'rotate-180': isInventoryMenuOpen }" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div v-show="isInventoryMenuOpen" class="mt-2 ml-4 space-y-2">
                                <router-link to="/inventory/stock"
                                    class="flex items-center p-2 rounded-lg hover:bg-gray-700"
                                    :class="[$route.path === '/inventory/stock' ? 'bg-gray-700' : '']">
                                    <span class="ml-3">Tồn kho</span>
                                </router-link>
                                <router-link to="/inventory/import"
                                    class="flex items-center p-2 rounded-lg hover:bg-gray-700"
                                    :class="[$route.path === '/inventory/import' ? 'bg-gray-700' : '']">
                                    <span class="ml-3">Nhập hàng</span>
                                </router-link>
                            </div>
                        </div>
                    </li>
                    <li>
                        <router-link to="/staff" class="flex items-center p-2 rounded-lg hover:bg-gray-700"
                            :class="[$route.path === '/staff' ? 'bg-gray-700' : '']">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span class="ml-3">Nhân viên</span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>

        <div class="flex-1 flex flex-col md:ml-64">
            <!-- Navbar -->
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
                        <h2 class="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
                    </div>

                    <div class="flex items-center space-x-4">
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        <div class="relative">
                            <button class="flex items-center space-x-2 focus:outline-none">
                                <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User"
                                    class="w-8 h-8 rounded-full">
                                <span class="text-gray-700">Admin</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Main content -->
            <div class="flex-1 p-6 bg-gray-50 mt-16">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isProductsMenuOpen = ref(false)
const isInventoryMenuOpen = ref(false)

const isProductsActive = computed(() => {
    return route.path.startsWith('/products')
})

const isInventoryActive = computed(() => {
    return route.path.startsWith('/inventory')
})

const toggleProductsMenu = () => {
    isProductsMenuOpen.value = !isProductsMenuOpen.value
}

const toggleInventoryMenu = () => {
    isInventoryMenuOpen.value = !isInventoryMenuOpen.value
}
</script>

<style scoped>
/* Remove the router-link-active style since we're using dynamic classes */
</style>