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

                <div class="relative group">
                    <button class="flex items-center space-x-2 focus:outline-none">
                        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User"
                            class="w-8 h-8 rounded-full">
                        <span class="text-gray-700">Admin</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <!-- Dropdown menu -->
                    <div
                        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out delay-100">
                        <div class="border-t border-gray-100"></div>
                        <button @click="handleLogout"
                            class="block w-full px-4 py-2 text-sm text-red-600 text-start cursor-pointer hover:bg-gray-100">
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
const handleLogout = () => {
    const token = localStorage.getItem('token');
    if (token) {
        localStorage.removeItem('token');
        location.reload();
    }
};
</script>