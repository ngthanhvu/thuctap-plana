<template>
    <div class="bg-white">
        <div
            class="overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03] max-w-full mx-4 my-6">
            <div class="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Recent Orders
                    </h3>
                </div>
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div class="relative">
                        <span class="absolute -translate-y-1/2 pointer-events-none top-1/2 left-4">
                            <svg class="fill-gray-500 dark:fill-gray-400" width="20" height="20" viewBox="0 0 20 20"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M3.04199 9.37381C3.04199 5.87712 5.87735 3.04218 9.37533 3.04218C12.8733 3.04218 15.7087 5.87712 15.7087 9.37381C15.7087 12.8705 12.8733 15.7055 9.37533 15.7055C5.87735 15.7055 3.04199 12.8705 3.04199 9.37381ZM9.37533 1.54218C5.04926 1.54218 1.54199 5.04835 1.54199 9.37381C1.54199 13.6993 5.04926 17.2055 9.37533 17.2055C11.2676 17.2055 13.0032 16.5346 14.3572 15.4178L17.1773 18.2381C17.4702 18.531 17.945 18.5311 18.2379 18.2382C18.5308 17.9453 18.5309 17.4704 18.238 17.1775L15.4182 14.3575C16.5367 13.0035 17.2087 11.2671 17.2087 9.37381C17.2087 5.04835 13.7014 1.54218 9.37533 1.54218Z" />
                            </svg>
                        </span>
                        <input v-model="searchQuery" type="text" placeholder="Search..."
                            class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-10 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-[42px] text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
                    </div>
                    <div>
                        <button @click="applyFilter"
                            class="text-theme-sm shadow-theme-xs inline-flex h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                            <svg class="stroke-current fill-white dark:fill-gray-800" width="20" height="20"
                                viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.29004 5.90393H17.7067" stroke="" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M17.7075 14.0961H2.29085" stroke="" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                                    fill="" stroke="" stroke-width="1.5" />
                                <path
                                    d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                                    fill="" stroke="" stroke-width="1.5" />
                            </svg>
                            Filter
                        </button>
                    </div>
                </div>
            </div>
            <div class="max-w-full overflow-x-auto custom-scrollbar">
                <table class="min-w-full">
                    <thead class="border-gray-100 border-y bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                        <tr>
                            <th class="px-6 py-3 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border-[1.25px] bg-white dark:bg-white/0 border-gray-300 dark:border-gray-700">
                                        </div>
                                        <div>
                                            <span
                                                class="block font-medium text-gray-500 text-xs dark:text-gray-400">Deal
                                                ID</span>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th class="px-6 py-3 whitespace-nowrap">
                                <div class="flex items-center">
                                    <p class="font-medium text-gray-500 text-xs dark:text-gray-400">Customer</p>
                                </div>
                            </th>
                            <th class="px-6 py-3 whitespace-nowrap">
                                <div class="flex items-center">
                                    <p class="font-medium text-gray-500 text-xs dark:text-gray-400">Product/Service</p>
                                </div>
                            </th>
                            <th class="px-6 py-3 whitespace-nowrap">
                                <div class="flex items-center">
                                    <p class="font-medium text-gray-500 text-xs dark:text-gray-400">Deal Value</p>
                                </div>
                            </th>
                            <th class="px-6 py-3 whitespace-nowrap">
                                <div class="flex items-center">
                                    <p class="font-medium text-gray-500 text-xs dark:text-gray-400">Close Date</p>
                                </div>
                            </th>
                            <th class="px-6 py-3 whitespace-nowrap">
                                <div class="flex items-center">
                                    <p class="font-medium text-gray-500 text-xs dark:text-gray-400">Status</p>
                                </div>
                            </th>
                            <th class="px-6 py-3 whitespace-nowrap">
                                <div class="flex items-center justify-center">
                                    <p class="font-medium text-gray-500 text-xs dark:text-gray-400">Action</p>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                        <tr v-for="order in filteredOrders" :key="order.id">
                            <td class="px-6 py-3 whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border-[1.25px] bg-white dark:bg-white/0 border-gray-300 dark:border-gray-700">
                                    </div>
                                    <div>
                                        <span class="block font-medium text-gray-700 text-sm dark:text-gray-400">{{
                                            order.id }}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-3 whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    <div :class="order.avatarBg"
                                        class="flex items-center justify-center w-10 h-10 rounded-full">
                                        <span :class="order.avatarText" class="text-xs font-semibold">{{ order.initials
                                        }}</span>
                                    </div>
                                    <div>
                                        <span
                                            class="text-sm mb-0.5 block font-medium text-gray-700 dark:text-gray-400">{{
                                                order.name }}</span>
                                        <span class="text-gray-500 text-sm dark:text-gray-400">{{ order.email }}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-3 whitespace-nowrap">
                                <p class="text-gray-700 text-sm dark:text-gray-400">{{ order.product }}</p>
                            </td>
                            <td class="px-6 py-3 whitespace-nowrap">
                                <p class="text-gray-700 text-sm dark:text-gray-400">{{ order.value }}</p>
                            </td>
                            <td class="px-6 py-3 whitespace-nowrap">
                                <p class="text-gray-700 text-sm dark:text-gray-400">{{ order.closeDate }}</p>
                            </td>
                            <td class="px-6 py-3 whitespace-nowrap">
                                <p
                                    :class="[order.status === 'Complete' ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' : 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400', 'text-xs rounded-full px-2 py-0.5 font-medium']">
                                    {{ order.status }}
                                </p>
                            </td>
                            <td class="px-6 py-3 whitespace-nowrap">
                                <div class="flex items-center justify-center">
                                    <svg @click="deleteOrder(order.id)"
                                        class="cursor-pointer hover:fill-red-600 dark:hover:fill-red-600 fill-gray-700 dark:fill-gray-400"
                                        width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M6.54142 3.7915C6.54142 2.54886 7.54878 1.5415 8.79142 1.5415H11.2081C12.4507 1.5415 13.4581 2.54886 13.4581 3.7915V4.0415H15.6252H16.666C17.0802 4.0415 17.416 4.37729 17.416 4.7915C17.416 5.20572 17.0802 5.5415 16.666 5.5415H16.3752V8.24638V13.2464V16.2082C16.3752 17.4508 15.3678 18.4582 14.1252 18.4582H5.87516C4.63252 18.4582 3.62516 17.4508 3.62516 16.2082V13.2464V8.24638V5.5415H3.3335C2.91928 5.5415 2.5835 5.20572 2.5835 4.7915C2.5835 4.37729 2.91928 4.0415 3.3335 4.0415H4.37516H6.54142V3.7915ZM14.8752 13.2464V8.24638V5.5415H13.4581H12.7081H7.29142H6.54142H5.12516V8.24638V13.2464V16.2082C5.12516 16.6224 5.46095 16.9582 5.87516 16.9582H14.1252C14.5394 16.9582 14.8752 16.6224 14.8752 16.2082V13.2464ZM8.04142 4.0415H11.9581V3.7915C11.9581 3.37729 11.6223 3.0415 11.2081 3.0415H8.79142C8.37721 3.0415 8.04142 3.37729 8.04142 3.7915V4.0415ZM8.3335 7.99984C8.74771 7.99984 9.0835 8.33562 9.0835 8.74984V13.7498C9.0835 14.1641 8.74771 14.4998 8.3335 14.4998C7.91928 14.4998 7.5835 14.1641 7.5835 13.7498V8.74984C7.5835 8.33562 7.91928 7.99984 8.3335 7.99984ZM12.4168 8.74984C12.4168 8.33562 12.081 7.99984 11.6668 7.99984C11.2526 7.99984 10.9168 8.33562 10.9168 8.74984V13.7498C10.9168 14.1641 11.2526 14.4998 11.6668 14.4998C12.081 14.4998 12.4168 14.1641 12.4168 13.7498V8.74984Z" />
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Define reactive data for orders
const orders = ref([
    {
        id: 'DE124321',
        name: 'John Doe',
        email: 'johndeo@gmail.com',
        initials: 'JD',
        avatarBg: 'bg-brand-100',
        avatarText: 'text-brand-500',
        product: 'Software License',
        value: '$18,50.34',
        closeDate: '2024-06-15',
        status: 'Complete'
    },
    {
        id: 'DE124321',
        name: 'Kierra Franci',
        email: 'kierra@gmail.com',
        initials: 'KF',
        avatarBg: 'bg-[#fdf2fa]',
        avatarText: 'text-[#dd2590]',
        product: 'Software License',
        value: '$18,50.34',
        closeDate: '2024-06-15',
        status: 'Complete'
    },
    {
        id: 'DE124321',
        name: 'Emerson Workman',
        email: 'emerson@gmail.com',
        initials: 'EW',
        avatarBg: 'bg-[#f0f9ff]',
        avatarText: 'text-[#0086c9]',
        product: 'Software License',
        value: '$18,50.34',
        closeDate: '2024-06-15',
        status: 'Pending'
    },
    {
        id: 'DE124321',
        name: 'Chance Philips',
        email: 'chance@gmail.com',
        initials: 'CP',
        avatarBg: 'bg-[#fff6ed]',
        avatarText: 'text-[#ec4a0a]',
        product: 'Software License',
        value: '$18,50.34',
        closeDate: '2024-06-15',
        status: 'Complete'
    },
    {
        id: 'DE124321',
        name: 'Terry Geidt',
        email: 'terry@gmail.com',
        initials: 'TG',
        avatarBg: 'bg-success-50',
        avatarText: 'text-success-600',
        product: 'Software License',
        value: '$18,50.34',
        closeDate: '2024-06-15',
        status: 'Complete'
    }
])

// Reactive search query
const searchQuery = ref('')

// Computed property for filtered orders
const filteredOrders = computed(() => {
    if (!searchQuery.value) return orders.value
    return orders.value.filter(order =>
        order.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

// Placeholder for filter functionality
const applyFilter = () => {
    console.log('Filter applied')
    // Implement filter logic here
}

// Placeholder for delete functionality
const deleteOrder = (id) => {
    console.log(`Delete order with ID: ${id}`)
    // Implement delete logic here
}
</script>

<style scoped>
/* Custom theme colors for success and warning */
:root {
    --success-50: #dcfce7;
    --success-600: #22c55e;
    --warning-50: #fff7ed;
    --warning-600: #f97316;
}

.bg-success-50 {
    background-color: var(--success-50);
}

.text-success-600 {
    color: var(--success-600);
}

.bg-warning-50 {
    background-color: var(--warning-50);
}

.text-warning-600 {
    color: var(--warning-600);
}
</style>